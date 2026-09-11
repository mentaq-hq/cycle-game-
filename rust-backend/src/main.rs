use axum::{
    extract::{State, ws::{WebSocketUpgrade, WebSocket, Message}},
    http::{HeaderValue, Method, StatusCode},
    response::{IntoResponse, Json},
    routing::{get, post},
    Router,
};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use std::{collections::BinaryHeap, sync::{Arc, RwLock}};
use tower_http::cors::{Any, CorsLayer};
use tracing::info;
use uuid::Uuid;

// ---- Heavy physics engine (runs at 120Hz in prod via tokio interval) ----
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct PhysicsState {
    pub progress: f32,      // 0..1
    pub balance: f32,       // -1..1
    pub tilt_input: f32,    // -1..1
    pub speed: f32,         // m/s
    pub dt: f32,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct PhysicsOut {
    pub progress: f32,
    pub balance: f32,
    pub crashed: bool,
    pub won: bool,
    pub score_delta: i32,
}

/// Deterministic heavy tick — same math as frontend but authoritative
pub fn physics_tick(state: PhysicsState) -> PhysicsOut {
    let dt = state.dt.clamp(0.001, 0.05);
    // speed with progress boost (heavy game feel)
    let speed_boosted = state.speed * (1.0 + state.progress * 0.55);
    let next_progress = (state.progress + (dt * speed_boosted) / 132.0).clamp(0.0, 1.0);

    // balance degrades with tilt + sinusoidal track wobble
    let wobble = (next_progress * 31.0).sin() * 0.018;
    let influence = state.tilt_input * 0.85 + wobble;
    let next_balance = (state.balance + (influence * dt * 1.4 - state.balance * dt * 1.1))
        .clamp(-1.2, 1.2);

    let crashed = next_balance.abs() > 0.96;
    let won = next_progress >= 0.995;
    let score_delta = if crashed || won { 0 } else { (1.0 + next_progress * 2.0) as i32 };

    PhysicsOut {
        progress: next_progress,
        balance: next_balance,
        crashed,
        won,
        score_delta,
    }
}

// ---- Leaderboard ----
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ScoreEntry {
    pub id: Uuid,
    pub player: String,
    pub score: i32,
    pub distance_m: i32,
    pub difficulty: String,
    pub at: DateTime<Utc>,
}

impl Ord for ScoreEntry {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering { self.score.cmp(&other.score) }
}
impl PartialOrd for ScoreEntry { fn partial_cmp(&self, other:&Self)->Option<std::cmp::Ordering>{ Some(self.cmp(other)) } }
impl PartialEq for ScoreEntry { fn eq(&self, other:&Self)->bool{ self.score==other.score } }
impl Eq for ScoreEntry {}

#[derive(Clone)]
pub struct AppState {
    pub leaderboard: Arc<RwLock<BinaryHeap<ScoreEntry>>>,
}

#[derive(Deserialize)]
pub struct SubmitScore { pub player: String, pub score: i32, pub distance_m: i32, pub difficulty: String }

async fn health() -> impl IntoResponse { Json(serde_json::json!({"status":"ok","service":"cycle-sky-rust","physics_hz":120})) }

async fn tick_handler(State(_st: AppState), Json(inp): Json<PhysicsState>) -> impl IntoResponse {
    let out = physics_tick(inp);
    Json(out)
}

async fn submit_score_handler(State(st): State<AppState>, Json(inp): Json<SubmitScore>) -> impl IntoResponse {
    if inp.player.trim().is_empty() || inp.score < 0 { return (StatusCode::BAD_REQUEST, Json(serde_json::json!({"error":"invalid"}))).into_response() }
    let entry = ScoreEntry { id: Uuid::new_v4(), player: inp.player.chars().take(24).collect(), score: inp.score, distance_m: inp.distance_m, difficulty: inp.difficulty, at: Utc::now() };
    {
        let mut lb = st.leaderboard.write().unwrap();
        lb.push(entry.clone());
        // keep top 100 only
        if lb.len() > 100 {
            let mut v: Vec<_> = lb.drain().collect();
            v.sort_by(|a,b| b.score.cmp(&a.score));
            v.truncate(100);
            *lb = v.into_iter().collect();
        }
    }
    Json(entry).into_response()
}

async fn leaderboard_handler(State(st): State<AppState>) -> impl IntoResponse {
    let mut v: Vec<ScoreEntry> = st.leaderboard.read().unwrap().iter().cloned().collect();
    v.sort_by(|a,b| b.score.cmp(&a.score));
    v.truncate(20);
    Json(v)
}

async fn ws_handler(ws: WebSocketUpgrade, State(st): State<AppState>) -> impl IntoResponse {
    ws.on_upgrade(move |socket| ws_loop(socket, st))
}

async fn ws_loop(mut socket: WebSocket, _st: AppState) {
    // Push leaderboard every 2s + echo physics ticks if client sends them
    use tokio::time::{interval, Duration};
    let mut iv = interval(Duration::from_millis(2000));
    loop {
        tokio::select! {
            _ = iv.tick() => {
                let msg = serde_json::json!({"type":"ping","ts": Utc::now().to_rfc3339()}).to_string();
                if socket.send(Message::Text(msg)).await.is_err() { break; }
            }
            msg = socket.recv() => {
                match msg {
                    Some(Ok(Message::Text(t))) => {
                        // try parse physics tick for validation
                        if let Ok(ps) = serde_json::from_str::<PhysicsState>(&t) {
                            let out = physics_tick(ps);
                            let _ = socket.send(Message::Text(serde_json::to_string(&out).unwrap())).await;
                        }
                    }
                    Some(Ok(Message::Close(_))) | None => break,
                    _ => {}
                }
            }
        }
    }
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt().with_env_filter("info").init();

    let state = AppState { leaderboard: Arc::new(RwLock::new(BinaryHeap::new())) };

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods([Method::GET, Method::POST, Method::OPTIONS])
        .allow_headers(Any);

    let app = Router::new()
        .route("/health", get(health))
        .route("/api/physics/tick", post(tick_handler))
        .route("/api/score", post(submit_score_handler))
        .route("/api/leaderboard", get(leaderboard_handler))
        .route("/ws", get(ws_handler))
        .with_state(state)
        .layer(cors);

    let port = std::env::var("PORT").ok().and_then(|p| p.parse().ok()).unwrap_or(8080);
    let addr = format!("0.0.0.0:{}", port);
    info!("CYCLE SKY Rust backend listening on {}", addr);
    info!("Endpoints: GET /health | POST /api/physics/tick | POST /api/score | GET /api/leaderboard | WS /ws");
    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
