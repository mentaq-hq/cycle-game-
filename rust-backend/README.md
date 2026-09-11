# CYCLE SKY — Rust Backend (Heavy)

Axum + Tokio backend for heavy physics simulation.

## Why Rust?

Game heavy hai — 120Hz physics tick, leaderboard validation, anti-cheat. Node/GC pause nahi chahiye. Rust zero-cost + no GC.

## Run

```bash
cargo run --release
# listens on 0.0.0.0:8080  (override with PORT=3001)
```

## Endpoints

- `GET /health` → `{status, service, physics_hz}`
- `POST /api/physics/tick` body `PhysicsState` → `PhysicsOut` (authoritative tick)
- `POST /api/score` → store & return entry
- `GET /api/leaderboard` → top 20
- `WS /ws` → send JSON `PhysicsState` string, get `PhysicsOut` back; server also pings every 2s

### PhysicsState
```json
{ "progress": 0.12, "balance": 0.1, "tilt_input": -0.4, "speed": 7.2, "dt": 0.016 }
```
