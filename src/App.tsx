import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GameCanvas from './game/GameCanvas'
import { useStore } from './store'

function IconMini(){
  return (
    <div className="relative w-[88px] h-[88px] md:w-[108px] md:h-[108px] rounded-[22px] overflow-hidden bg-sky-icon ribbon-glow shrink-0 border-[2px] border-white/30 shadow-[0_8px_28px_rgba(2,132,199,0.35),0_2px_10px_rgba(0,0,0,0.18)]">
      {/* clouds streaks */}
      <div className="absolute inset-0 opacity-50" style={{background:`radial-gradient(300px 120px at 10% 22%, rgba(255,255,255,0.85), transparent 60%), radial-gradient(220px 100px at 78% 32%, rgba(255,255,255,0.45), transparent 60%)`}} />
      {/* bokeh dots */}
      <div className="absolute w-3 h-3 bg-white/55 rounded-full blur-[1px] left-[64%] top-[18%]" />
      <div className="absolute w-2 h-2 bg-white/40 rounded-full blur-[0.5px] left-[22%] top-[52%]" />
      <div className="absolute w-4 h-4 bg-white/30 rounded-full blur-[1.5px] left-[46%] top-[68%]" />
      {/* city blur bottom */}
      <div className="absolute left-0 right-0 bottom-0 h-[36%] bg-gradient-to-t from-sky-200/70 via-sky-100/40 to-transparent blur-[6px]" />
      <div className="absolute left-[-4%] right-[-4%] bottom-[-6%] h-[28%] flex gap-[6px] items-end opacity-60 blur-[0.6px] px-2">
        <div className="flex-1 h-[14px] bg-sky-100 rounded-t-[2px]" />
        <div className="flex-1 h-[22px] bg-sky-50 rounded-t-[2px]" />
        <div className="flex-1 h-[16px] bg-cyan-50 rounded-t-[2px]" />
        <div className="flex-1 h-[20px] bg-sky-100 rounded-t-[2px]" />
      </div>
      {/* ribbon track svg */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        <path d="M 4 78 L 18 64 L 28 52 L 38 38 L 48 22 L 58 18 L 68 28 L 78 46 L 88 60 L 94 68" fill="none" stroke="white" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 4 78 L 18 64 L 28 52 L 38 38 L 48 22 L 58 18 L 68 28 L 78 46 L 88 60 L 94 68" fill="none" stroke="#e2e8f0" strokeWidth="0.7" strokeDasharray="3 3" opacity="0.55" />
        {/* side yellows */}
        <path d="M 4 78 L 18 64 L 28 52 L 38 38 L 48 22 L 58 18 L 68 28" fill="none" stroke="#facc15" strokeWidth="0.9" opacity="0.95" />
      </svg>
      {/* bike+rider */}
      <div className="absolute left-[18%] bottom-[28%] rotate-[-14deg]">
        <div className="relative">
          {/* shadow */}
          <div className="absolute -bottom-1 left-1 right-1 h-[4px] bg-black/20 blur-[2px] rounded-full" />
          {/* bike frame */}
          <div className="w-[34px] h-[18px] relative">
            <div className="absolute left-[5px] right-[5px] top-[7px] h-[3px] bg-red-500 rounded-full rotate-[-8deg]" />
            <div className="absolute left-[6px] top-[4px] w-[3px] h-[10px] bg-red-600 rounded-full rotate-[12deg]" />
            <div className="absolute left-[2px] top-[8px] w-[14px] h-[2px] bg-zinc-800 rounded-full" />
            {/* wheels */}
            <div className="absolute -left-1 bottom-0 w-[12px] h-[12px] rounded-full border-[3px] border-yellow-400 bg-transparent shadow-[inset_0_0_0_2px_#111827] flex items-center justify-center"><div className="w-[2px] h-[2px] bg-zinc-700 rounded-full" /></div>
            <div className="absolute -right-1 bottom-0 w-[12px] h-[12px] rounded-full border-[3px] border-yellow-400 bg-transparent shadow-[inset_0_0_0_2px_#111827]" />
            <div className="absolute left-[9px] -top-[1px] w-[4px] h-[3px] bg-zinc-900 rounded-[1px]" />
            <div className="absolute right-[9px] top-[3px] w-[10px] h-[2px] bg-yellow-400 rounded-full -rotate-6" />
          </div>
          {/* rider */}
          <div className="absolute -top-[16px] left-[9px] flex flex-col items-center">
            <div className="w-[10px] h-[7px] bg-red-500 rounded-t-full relative"><div className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-red-600 rounded-full" /><div className="absolute top-[2px] left-[2px] w-[6px] h-[1px] bg-black/10 rounded-full" /></div>
            <div className="w-[10px] h-[3px] bg-[#fbbf94] rounded-full -mt-[1px]" />
            <div className="w-[12px] h-[8px] bg-white rounded-[3px] relative -mt-[1px] border border-emerald-500/20 flex items-center justify-center overflow-hidden"><div className="absolute top-0 left-0 right-0 h-[3px] bg-emerald-500" /><span className="text-[5px] font-black tracking-tighter leading-none mt-[2px]">00</span></div>
            <div className="w-[10px] h-[4px] bg-[#d6c7a3] rounded-[1px]" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Nav({ onPlay }: { onPlay:()=>void }){
  return (
    <nav className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-sky-100">
      <div className="max-w-[1120px] mx-auto px-4 md:px-6 h-[64px] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center text-white font-black text-[11px] tracking-widest">CS</div>
          <div>
            <div className="display font-black tracking-tight leading-none text-[15px]">CYCLE SKY</div>
            <div className="text-[10px] tracking-[0.16em] font-bold text-sky-600 -mt-[2px]">RIDE THE RIBBON</div>
          </div>
          <span className="hidden md:inline-flex ml-2 px-2 py-1 rounded-full bg-amber-400 text-zinc-900 text-[10px] font-black tracking-widest">RUST BACKEND • HEAVY PHYSICS</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden md:inline text-xs font-bold text-slate-500">v1.0 • 1:1 Copy</span>
          <button onClick={onPlay} className="px-4 md:px-5 py-[9px] rounded-full bg-zinc-900 text-white text-sm font-black tracking-wide hover:bg-black transition">PLAY NOW →</button>
        </div>
      </div>
    </nav>
  )
}

function Hero({ onPlay }: { onPlay:()=>void }){
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-sky-icon" />
      <div className="absolute inset-0" style={{background:`radial-gradient(800px 400px at 20% 10%, rgba(255,255,255,0.55), transparent 60%), radial-gradient(700px 380px at 80% 90%, rgba(255,255,255,0.28), transparent 60%)`}} />
      {/* bokeh */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute w-[120px] h-[120px] bg-white/20 rounded-full blur-[28px] left-[8%] top-[18%]" />
        <div className="absolute w-[90px] h-[90px] bg-white/14 rounded-full blur-[22px] left-[62%] top-[28%]" />
        <div className="absolute w-[160px] h-[160px] bg-white/10 rounded-full blur-[36px] left-[36%] top-[54%]" />
      </div>
      <div className="relative max-w-[1120px] mx-auto px-4 md:px-6 pt-8 md:pt-12 pb-10 md:pb-14">
        <div className="grid md:grid-cols-[1.05fr_0.95fr] gap-6 md:gap-8 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-sky-600 text-[11px] font-black tracking-widest shadow">● 100% ICON CLONE — TEXTURE COPY</div>
            <h1 className="display font-black leading-[0.88] tracking-[-0.03em] mt-4 text-[40px] md:text-[64px]">
              RIDE THE<br />
              <span className="text-white">WHITE</span><br />
              <span className="text-amber-300">RIBBON</span> <span className="text-white">IN THE SKY.</span>
            </h1>
            <p className="mt-4 text-white/90 text-[15px] md:text-[16px] leading-relaxed max-w-[520px] font-medium">
              Icon ka <b>1:1 texture copy</b> — red cap, 00 jersey, red frame yellow rims, narrow white segmented track jo aasman me twist karta hai. Heavy physics Rust pe, ultra-smooth 3D frontend.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={onPlay} className="btn-3d px-7 py-3 rounded-full bg-red-500 hover:bg-red-500 text-white font-black tracking-wide text-[15px] flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-white text-red-500 grid place-items-center text-[12px]">▶</span> PLAY INSTANTLY
              </button>
              <a href="#how" className="px-6 py-3 rounded-full bg-white text-zinc-900 font-black text-sm shadow hover:bg-zinc-50 transition">HOW IT WORKS ↓</a>
            </div>
            <div className="mt-6 flex items-center gap-3 text-xs font-bold">
              <span className="px-2.5 py-1 rounded-full bg-zinc-900 text-white">60 FPS</span>
              <span className="px-2.5 py-1 rounded-full bg-white/15 border border-white/20 backdrop-blur">WebGL 2 • Three.js • R3F</span>
              <span className="hidden md:inline px-2.5 py-1 rounded-full bg-amber-300 text-zinc-900">RUST • AXUM • TOKIO</span>
            </div>
            {/* stats */}
            <div className="mt-7 grid grid-cols-3 gap-3 max-w-[460px]">
              {[
                {k:'TRACK',v:'140m RIBBON'},
                {k:'PHYSICS',v:'RUST 120Hz'},
                {k:'ASSETS',v:'1:1 COPY'},
              ].map(s=>(
                <div key={s.k} className="rounded-2xl bg-white/12 backdrop-blur border border-white/15 p-3">
                  <div className="text-[10px] tracking-widest font-black opacity-70">{s.k}</div>
                  <div className="text-[12px] md:text-[13px] font-black">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex flex-col items-center">
            <div className="relative p-4 md:p-6 rounded-[28px] bg-white/10 backdrop-blur-xl border border-white/15 shadow-[0_20px_60px_rgba(2,6,23,0.35)] w-full max-w-[420px]">
              <div className="flex items-center justify-between text-white/90 text-[11px] font-black tracking-widest">
                <span>APP ICON — 1:1 REPLICA</span>
                <span className="px-2 py-1 rounded-full bg-white text-sky-600">352 × 352</span>
              </div>
              <div className="mt-4 flex justify-center">
                <div className="scale-[1.15] md:scale-[1.28]"><IconMini /></div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  {l:'FRAME',v:'RED #EF4444'},
                  {l:'RIMS',v:'YELLOW #FACC15'},
                  {l:'JERSEY',v:'WHITE + 00'},
                ].map(x=>(
                  <div key={x.l} className="rounded-xl bg-white p-2.5 text-center">
                    <div className="text-[9px] tracking-widest font-black text-slate-500">{x.l}</div>
                    <div className="text-[11px] font-black leading-tight mt-1">{x.v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-xl bg-amber-300 p-3 flex items-center justify-between">
                <div className="text-[11px] font-black leading-tight">BALANCE METER →<br/><span className="text-[10px] font-bold opacity-70">A/D or ◀ ▶ to stay on ribbon</span></div>
                <div className="w-10 h-10 rounded-full bg-zinc-900 text-white grid place-items-center font-black">00</div>
              </div>
            </div>
            <div className="mt-3 text-white/70 text-[11px] font-bold tracking-wide">↓ Scroll — dekho kaise banaya developers ki tarah</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorks(){
  return (
    <section id="how" className="bg-[#f8fafc] py-10 md:py-14 border-t border-slate-200">
      <div className="max-w-[1120px] mx-auto px-4 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[11px] tracking-[0.18em] font-black text-sky-600">ENGINEERING BREAKDOWN</div>
            <h2 className="display font-black text-[28px] md:text-[36px] tracking-tight leading-none mt-1">Kaise kaam karta hai — Dev Team ki tarah</h2>
          </div>
          <div className="text-sm font-medium text-slate-600 max-w-[420px]">Research karke banaya: ribbon spline, heavy physics Rust me, aur frontend WebGL me 1:1 icon texture. No shortcut.</div>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            {n:'01',t:'Ribbon Spline Track',d:'CatmullRom 3D curve • 520 segments • Frenet frames se flat white ribbon + yellow rails + dashed center. Icon jaisa twist & ascent.',c:'bg-sky-500'},
            {n:'02',t:'Heavy Physics — RUST',d:'Axum + Tokio • 120Hz tick • balance / tilt / fall detection • leaderboard & anti-cheat. Heavy load Rust sambhalta hai, JS nahi.',c:'bg-amber-400 text-zinc-900'},
            {n:'03',t:'Ultra Frontend — R3F',d:'React Three Fiber + Three.js • ACES tone mapping • instanced city blur + bokeh • 60fps chase cam with lean/yaw/pitch.',c:'bg-zinc-900 text-white'},
          ].map(card=>(
            <div key={card.n} className={`rounded-[20px] p-[1px] ${card.c.includes('bg-')?'':''} bg-gradient-to-b from-slate-200 to-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]`}>
              <div className="rounded-[19px] bg-white p-5 h-full">
                <div className={`w-9 h-9 rounded-full grid place-items-center font-black text-xs ${card.c} ${card.c.includes('text-')?'':'text-white'}`}>{card.n}</div>
                <div className="font-black tracking-tight mt-3">{card.t}</div>
                <div className="text-[13px] leading-relaxed text-slate-600 mt-2 font-medium">{card.d}</div>
                <div className="mt-4 flex gap-1.5">
                  <span className="h-1 flex-1 rounded-full bg-sky-500" />
                  <span className="h-1 flex-1 rounded-full bg-amber-300" />
                  <span className="h-1 flex-1 rounded-full bg-zinc-900" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid md:grid-cols-[1.2fr_0.8fr] gap-4">
          <div className="rounded-[20px] bg-zinc-900 text-white p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{background:`linear-gradient(90deg, rgba(56,189,248,0.4), transparent 60%)`}} />
            <div className="relative">
              <div className="text-[11px] tracking-[0.18em] font-black text-sky-300">RUST BACKEND — WHY?</div>
              <div className="font-black text-[20px] mt-1">Heavy game = Rust. No lag, no GC pause.</div>
              <div className="mt-3 grid sm:grid-cols-3 gap-3 text-[12px] font-bold">
                <div className="rounded-xl bg-white/10 border border-white/10 p-3"><div className="text-sky-300">AXUM</div><div className="font-medium text-white/80 mt-1 leading-tight">HTTP + WebSocket • ultra fast</div></div>
                <div className="rounded-xl bg-white/10 border border-white/10 p-3"><div className="text-amber-300">PHYSICS</div><div className="font-medium text-white/80 mt-1 leading-tight">Balance integrate 120Hz</div></div>
                <div className="rounded-xl bg-white/10 border border-white/10 p-3"><div className="text-emerald-300">SCORE</div><div className="font-medium text-white/80 mt-1 leading-tight">Leaderboard + validation</div></div>
              </div>
              <div className="mt-4 font-mono text-[11px] bg-black/40 rounded-xl p-3 border border-white/10 overflow-auto">
                <div className="text-sky-300">// rust-backend/src/main.rs</div>
                <div>axum::Router::new()</div>
                <div className="opacity-80">.route("/api/physics/tick", post(physics_tick))</div>
                <div className="opacity-80">.route("/api/score", post(submit_score))</div>
                <div className="opacity-60">.with_state(AppState &#123; leaderboard &#125;)</div>
              </div>
            </div>
          </div>
          <div className="rounded-[20px] bg-white border border-slate-200 p-6">
            <div className="text-[11px] tracking-[0.18em] font-black text-sky-600">TEXTURE COPY CHECK</div>
            <div className="font-black mt-1">Icon se 1:1 match</div>
            <div className="mt-4 space-y-3">
              {[
                {k:'Sky',v:'38bdf8 → 0ea5e9 gradient + cloud streaks + bokeh spheres',dot:'bg-sky-500'},
                {k:'Ribbon',v:'White 1.78m flat + rail yellow #facc15 + segment lines',dot:'bg-white border'},
                {k:'Bike',v:'Red frame #ef4444, yellow handle & rims #facc15, black tires',dot:'bg-red-500'},
                {k:'Rider',v:'Red cap, 00 white+green jersey, khaki shorts #d6c7a3',dot:'bg-emerald-500'},
              ].map(r=>(
                <div key={r.k} className="flex gap-3">
                  <div className={`mt-1 w-3 h-3 rounded-full shrink-0 ${r.dot} border border-slate-200`} />
                  <div><div className="text-xs font-black">{r.k}</div><div className="text-xs text-slate-600 font-medium leading-tight">{r.v}</div></div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs font-bold leading-tight text-amber-900">✓ City blur bottom + floating white bokeh — icon jaisa high-altitude feel.</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TechStrip(){
  return (
    <section className="bg-white border-y border-slate-200 py-6">
      <div className="max-w-[1120px] mx-auto px-4 md:px-6 flex flex-wrap items-center justify-between gap-4">
        <div className="text-[11px] tracking-[0.16em] font-black text-slate-500">LATEST STACK — PRODUCTION READY</div>
        <div className="flex flex-wrap gap-2">
          {['RUST • Axum • Tokio','React 18 • Vite 5','Three.js 0.170 • R3F 8','Zustand 5','Framer Motion 11','Tailwind 3','TypeScript 5.6'].map(t=>(
            <span key={t} className="px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-black tracking-wide">{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

function FooterCTA({ onPlay }: { onPlay:()=>void }){
  return (
    <section className="bg-zinc-950 text-white py-10">
      <div className="max-w-[1120px] mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="display font-black text-[22px] tracking-tight">Ready to ride?</div>
          <div className="text-white/60 text-sm font-medium">Heavy physics • 1:1 asset • 60 FPS • Mobile + Desktop</div>
        </div>
        <button onClick={onPlay} className="px-8 py-4 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-black tracking-wide shadow-[0_10px_30px_rgba(14,165,233,0.35)] transition">START RIDE — FREE →</button>
      </div>
      <div className="max-w-[1120px] mx-auto px-4 md:px-6 mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-3 text-[11px] font-bold text-white/50">
        <span>© 2026 Cycle Sky Clone</span>
        <span>•</span>
        <span>Built as dev-team grade clone — icon texture 1:1</span>
        <span>•</span>
        <span>Rust backend repo: /rust-backend</span>
      </div>
    </section>
  )
}

function HUD(){
  const progress = useStore(s=>s.progress)
  const score = useStore(s=>s.score)
  const best = useStore(s=>s.best)
  const balance = useStore(s=>s.balance)
  const speed = useStore(s=>s.speed)
  const state = useStore(s=>s.state)
  const difficulty = useStore(s=>s.difficulty)
  const setDifficulty = useStore(s=>s.setDifficulty)
  const reset = useStore(s=>s.resetRun)
  const setState = useStore(s=>s.setState)

  const pct = Math.round(progress*100)
  const balPct = Math.round(((balance+1)/2)*100)

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* top bar */}
      <div className="absolute top-0 inset-x-0 p-3 md:p-4 flex gap-3">
        <div className="flex-1 glass rounded-2xl px-3 md:px-4 py-2.5 flex items-center gap-3 md:gap-4 pointer-events-auto">
          <button onClick={()=> setState(state==='paused'?'playing':'paused')} className="w-9 h-9 rounded-full bg-white text-zinc-900 grid place-items-center font-black shrink-0">
            {state==='paused'?'▶':'❚❚'}
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between text-[10px] font-black tracking-widest text-white/90">
              <span>PROGRESS</span>
              <span className="font-mono text-white">{pct}%</span>
            </div>
            <div className="mt-1 h-2 rounded-full bg-white/20 overflow-hidden p-[2px]">
              <div className="h-full rounded-full bg-gradient-to-r from-sky-400 via-white to-amber-300 transition-all duration-150" style={{width:`${pct}%`}} />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-[10px] font-black tracking-widest text-white/70">SPEED</span>
            <span className="px-2 py-1 rounded-full bg-white text-zinc-900 font-black font-mono text-xs">{speed.toFixed(1)} m/s</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-[10px] font-black tracking-widest text-white/70">BALANCE</span>
            <div className="w-[96px] h-2 rounded-full bg-white/20 overflow-hidden relative">
              <div className="absolute inset-y-0 w-[2px] bg-white left-1/2 -translate-x-1/2 z-10" />
              <div className="h-full bg-amber-300 transition-all" style={{width:`${balPct}%`}} />
            </div>
          </div>
          <button onClick={()=>{
            reset(); setState('landing')
          }} className="hidden md:inline-flex px-3 py-1.5 rounded-full bg-white/15 border border-white/15 text-white text-xs font-black">EXIT</button>
        </div>
        <div className="hidden md:flex glass rounded-2xl px-4 py-2.5 items-center gap-4 pointer-events-auto">
          <div><div className="text-[10px] tracking-widest font-black text-white/60">SCORE</div><div className="font-black font-mono text-white leading-none">{score}</div></div>
          <div className="w-px h-8 bg-white/15" />
          <div><div className="text-[10px] tracking-widest font-black text-white/60">BEST</div><div className="font-black font-mono text-amber-300 leading-none">{best}</div></div>
          <div className="flex gap-1 ml-2">
            {(['easy','sky','insane'] as const).map(d=>(
              <button key={d} onClick={()=> setDifficulty(d)} className={`px-2.5 py-1 rounded-full text-[11px] font-black uppercase ${difficulty===d?'bg-white text-zinc-900':'bg-white/15 text-white border border-white/15'}`}>{d}</button>
            ))}
          </div>
        </div>
      </div>

      {/* mobile score */}
      <div className="md:hidden absolute top-[78px] left-3 right-3 flex gap-2 pointer-events-auto">
        <div className="flex-1 glass rounded-xl px-3 py-2 flex items-center justify-between">
          <span className="text-[11px] font-black tracking-widest text-white/70">SCORE <b className="text-white font-mono ml-1">{score}</b></span>
          <span className="text-[11px] font-black tracking-widest text-white/70">BEST <b className="text-amber-300 font-mono ml-1">{best}</b></span>
          <span className="text-[11px] font-black tracking-widest text-white/70">{speed.toFixed(1)} m/s</span>
        </div>
      </div>

      {/* balance mobile */}
      <div className="md:hidden absolute top-[120px] left-3 right-3 pointer-events-none">
        <div className="glass rounded-full p-2 flex items-center gap-2">
          <span className="text-[10px] font-black tracking-widest text-white/70 px-1">BALANCE</span>
          <div className="flex-1 h-2 rounded-full bg-white/15 overflow-hidden relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white -translate-x-1/2" />
            <div className="h-full bg-amber-300" style={{width:`${balPct}%`}} />
          </div>
          <span className={`text-[10px] font-black px-2 py-1 rounded-full ${Math.abs(balance)>0.7?'bg-red-500 text-white':'bg-white text-zinc-900'}`}>{Math.abs(balance)>0.7?'DANGER':'STABLE'}</span>
        </div>
      </div>

      {/* touch steering — mobile */}
      <div className="absolute bottom-4 inset-x-3 md:inset-x-4 flex justify-between gap-3 pointer-events-auto md:bottom-6">
        <SteerButton side="left" />
        <div className="hidden md:flex items-center gap-2 glass rounded-full px-4 py-2 text-[11px] font-black tracking-widest text-white/80">
          <span className="w-6 h-6 rounded-full bg-white text-zinc-900 grid place-items-center text-[10px]">A</span> STEER
          <span className="mx-1 opacity-40">|</span>
          <span className="w-6 h-6 rounded-full bg-white text-zinc-900 grid place-items-center text-[10px]">D</span> STEER
          <span className="mx-2 opacity-40">•</span> Hold to balance on ribbon
        </div>
        <SteerButton side="right" />
      </div>
    </div>
  )
}

function SteerButton({ side }: { side:'left'|'right'}){
  const setTilt = useStore(s=>s.setTilt)
  const heldRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const onDown = (e: React.PointerEvent | React.TouchEvent)=>{
    e.preventDefault()
    if(heldRef.current) return
    heldRef.current = true
    if(rafRef.current) cancelAnimationFrame(rafRef.current)
    const v = side==='left' ? -1 : 1
    // instant tilt while held — no interval leak, single write
    setTilt(v)
  }
  const onUp = (e?: React.PointerEvent | React.TouchEvent)=>{
    e?.preventDefault()
    if(!heldRef.current) return
    heldRef.current = false
    // smooth return to 0 with single RAF chain, cancellable
    let t = useStore.getState().tilt
    const step = ()=>{
      // if re-pressed mid-animation, abort
      if(heldRef.current) return
      t *= 0.78
      if(Math.abs(t) < 0.02){ setTilt(0); rafRef.current=null; return }
      setTilt(t)
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
  }
  useEffect(()=> ()=>{ if(rafRef.current) cancelAnimationFrame(rafRef.current) },[])
  return (
    <button
      onPointerDown={onDown}
      onPointerUp={onUp as any}
      onPointerLeave={onUp as any}
      onPointerCancel={onUp as any}
      onTouchStart={onDown as any}
      onTouchEnd={onUp as any}
      style={{ touchAction:'none' }}
      className="flex-1 md:flex-none md:w-[148px] h-[64px] md:h-[56px] rounded-[18px] glass active:scale-[0.96] transition flex items-center justify-center gap-2 text-white font-black tracking-widest text-sm select-none touch-manipulation"
    >
      <span className="w-8 h-8 rounded-full bg-white text-zinc-900 grid place-items-center pointer-events-none">{side==='left'?'◀':'▶'}</span>
      <span className="pointer-events-none">{side==='left'?'LEFT':'RIGHT'}</span>
    </button>
  )
}

function Overlay({ children }: { children: React.ReactNode }){
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 grid place-items-center p-4 bg-[#020617]/42 backdrop-blur-[6px]">
      {children}
    </motion.div>
  )
}

export default function App(){
  const state = useStore(s=>s.state)
  const setState = useStore(s=>s.setState)
  const resetRun = useStore(s=>s.resetRun)
  const addScore = useStore(s=>s.addScore)
  const progress = useStore(s=>s.progress)
  const score = useStore(s=>s.score)
  const best = useStore(s=>s.best)

  // keyboard steering — fixed deps bug: use refs to avoid stale state closure
  const stateRef = useRef(state)
  useEffect(()=>{ stateRef.current = state },[state])
  useEffect(()=>{
    const down = new Set<string>()
    const update = ()=>{
      let tilt=0
      if(down.has('a')||down.has('arrowleft')) tilt -=1
      if(down.has('d')||down.has('arrowright')) tilt +=1
      useStore.setState({ tilt })
    }
    const onKeyDown = (e:KeyboardEvent)=>{
      const k=e.key.toLowerCase()
      if(k===' '){ e.preventDefault(); const cur=stateRef.current; useStore.setState({ state: cur==='paused'?'playing':cur==='playing'?'paused':cur } as any) }
      if(k==='escape'){ const cur=stateRef.current; useStore.setState({ state: cur==='playing'?'paused':cur==='paused'?'playing':cur } as any) }
      if(k==='a'||k==='arrowleft'||k==='d'||k==='arrowright'){ if(!down.has(k)){ down.add(k); update() } }
    }
    const onKeyUp = (e:KeyboardEvent)=>{
      const k=e.key.toLowerCase()
      if(down.delete(k)) update()
    }
    const onBlur = ()=>{ down.clear(); useStore.setState({ tilt:0 }) }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)
    return ()=>{ window.removeEventListener('keydown', onKeyDown); window.removeEventListener('keyup', onKeyUp); window.removeEventListener('blur', onBlur); useStore.setState({ tilt:0 }) }
  },[])

  // scoring loop
  useEffect(()=>{
    if(state!=='playing') return
    const id = setInterval(()=>{
      const p = useStore.getState().progress
      addScore(Math.floor(1 + p*2))
    }, 220)
    return ()=> clearInterval(id)
  },[state])

  const readyTimer = useRef<number | null>(null)
  const startGame = ()=>{
    if(readyTimer.current) window.clearTimeout(readyTimer.current)
    resetRun()
    useStore.setState({ progress:0.015, balance:0, tilt:0 })
    setState('ready')
    readyTimer.current = window.setTimeout(()=> {
      // only advance if still in ready (not paused/exited)
      if(useStore.getState().state==='ready') setState('playing')
    }, 900)
  }
  useEffect(()=> ()=>{ if(readyTimer.current) window.clearTimeout(readyTimer.current) },[])

  const handleCrash = ()=>{
    // tiny delay then show crash overlay already via state
  }
  const handleWin = ()=>{}

  if(state==='landing'){
    return (
      <div className="h-[100dvh] overflow-auto bg-white">
        <Nav onPlay={startGame} />
        <Hero onPlay={startGame} />
        <HowItWorks />
        <TechStrip />
        {/* asset texture showcase */}
        <section className="bg-[#f8fafc] py-10">
          <div className="max-w-[1120px] mx-auto px-4 md:px-6">
            <div className="rounded-[24px] bg-white border border-slate-200 p-4 md:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="font-black tracking-tight">ASSET & TEXTURE — 1:1 COPY PREVIEW</div>
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-black">VERIFIED COPY</span>
              </div>
              <div className="mt-5 grid md:grid-cols-4 gap-4">
                {[
                  {t:'Rider — Red Cap',d:'#ef4444 cap + cream skin #fbbf94 • exact icon shade',g:'from-red-500 to-red-600'},
                  {t:'Jersey — 00',d:'White body + emerald shoulders #22c55e + bold 00',g:'from-emerald-500 to-green-600'},
                  {t:'Bike — Red + Yellow',d:'Frame red, handle & rims yellow #facc15, black tires',g:'from-amber-400 to-yellow-500'},
                  {t:'Track — Ribbon',d:'White 1.78m • yellow rails • dashed center • 520 segs',g:'from-slate-900 to-zinc-800'},
                ].map(c=>(
                  <div key={c.t} className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
                    <div className={`h-[86px] bg-gradient-to-br ${c.g} relative`}>
                      <div className="absolute inset-0 opacity-20" style={{background:`radial-gradient(200px 80px at 30% 30%, white, transparent 60%)`}} />
                      <div className="absolute left-3 bottom-3 w-8 h-8 rounded-full bg-white/90 grid place-items-center font-black text-[11px]">{c.t.split('—')[0].trim().slice(0,2)}</div>
                    </div>
                    <div className="p-3"><div className="text-[13px] font-black leading-tight">{c.t}</div><div className="text-xs text-slate-600 font-medium leading-tight mt-1">{c.d}</div></div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button onClick={startGame} className="px-6 py-3 rounded-full bg-zinc-900 text-white font-black">PLAY CLONE NOW →</button>
                <span className="px-4 py-3 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">Heavy Rust backend ready at <code className="font-mono bg-white px-1.5 py-0.5 rounded border">/rust-backend</code></span>
              </div>
            </div>
          </div>
        </section>
        <FooterCTA onPlay={startGame} />
      </div>
    )
  }

  return (
    <div className="h-[100dvh] w-screen bg-[#020617] relative overflow-hidden">
      <GameCanvas onCrash={handleCrash} onWin={handleWin} />
      <HUD />

      {/* ready */}
      <AnimatePresence>
        {state==='ready' && (
          <Overlay>
            <motion.div initial={{scale:0.9, y:12, opacity:0}} animate={{scale:1,y:0,opacity:1}} className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-zinc-900 font-black tracking-widest text-xs">● GET READY</div>
              <div className="mt-4 display font-black text-white text-[42px] md:text-[64px] leading-none tracking-tight drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]">3 — 2 — 1</div>
              <div className="mt-2 text-white/80 font-bold tracking-wide">A/D or ◀ ▶ se balance rakho — ribbon se giro mat!</div>
            </motion.div>
          </Overlay>
        )}
        {state==='paused' && (
          <Overlay>
            <div className="w-full max-w-[380px] rounded-[22px] bg-white p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <div className="w-12 h-12 rounded-full bg-zinc-900 text-white grid place-items-center mx-auto font-black">❚❚</div>
              <div className="font-black text-xl mt-3">PAUSED</div>
              <div className="text-sm text-slate-600 font-medium">Ribbon abhi bhi intezaar kar raha hai</div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button onClick={()=> setState('playing')} className="py-3 rounded-full bg-sky-500 text-white font-black">RESUME</button>
                <button onClick={()=>{ resetRun(); setState('landing')}} className="py-3 rounded-full bg-zinc-900 text-white font-black">EXIT</button>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                <div className="rounded-xl bg-slate-100 p-2"><div className="font-black">{Math.round(progress*100)}%</div><div className="text-slate-500 font-bold">PROGRESS</div></div>
                <div className="rounded-xl bg-slate-100 p-2"><div className="font-black font-mono">{score}</div><div className="text-slate-500 font-bold">SCORE</div></div>
                <div className="rounded-xl bg-amber-100 p-2"><div className="font-black font-mono">{best}</div><div className="text-amber-700 font-bold">BEST</div></div>
              </div>
            </div>
          </Overlay>
        )}
        {state==='crashed' && (
          <Overlay>
            <div className="w-full max-w-[420px] rounded-[24px] bg-white p-6 md:p-7 shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
              <div className="w-12 h-12 rounded-full bg-red-500 text-white grid place-items-center mx-auto text-xl">✕</div>
              <div className="text-center font-black text-[22px] mt-3">FELL OFF THE RIBBON!</div>
              <div className="text-center text-sm text-slate-600 font-medium">Balance 0.96 se zyada ho gaya — ribbon se neeche gir gaye.</div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-slate-900 text-white p-3 text-center"><div className="text-[11px] tracking-widest font-black opacity-60">SCORE</div><div className="font-black font-mono text-lg">{score}</div></div>
                <div className="rounded-xl bg-sky-500 text-white p-3 text-center"><div className="text-[11px] tracking-widest font-black opacity-80">DISTANCE</div><div className="font-black font-mono text-lg">{Math.round(progress*140)}m</div></div>
                <div className="rounded-xl bg-amber-300 p-3 text-center"><div className="text-[11px] tracking-widest font-black opacity-60">BEST</div><div className="font-black font-mono text-lg">{best}</div></div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button onClick={startGame} className="py-3 rounded-full bg-red-500 text-white font-black btn-3d border-0">RETRY →</button>
                <button onClick={()=>{ resetRun(); setState('landing')}} className="py-3 rounded-full bg-white border-2 border-slate-200 font-black">HOME</button>
              </div>
              <div className="mt-3 text-center text-[11px] font-bold text-slate-500">Tip: Halke taps se balance karo — hold karoge to gir jaoge!</div>
            </div>
          </Overlay>
        )}
        {state==='won' && (
          <Overlay>
            <div className="w-full max-w-[460px] rounded-[24px] bg-white p-6 md:p-7 text-center shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
              <div className="w-14 h-14 rounded-full bg-emerald-500 text-white grid place-items-center mx-auto text-2xl">✓</div>
              <div className="font-black text-[26px] mt-3 leading-none">SKY CONQUERED!</div>
              <div className="text-sm font-medium text-slate-600">Pura 140m white ribbon cross kar liya — icon ka end tak!</div>
              <div className="mt-4 flex justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-black">+500 BONUS</span>
                <span className="px-3 py-1 rounded-full bg-zinc-900 text-white text-xs font-black">RANK: SKY LEGEND</span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-slate-900 text-white p-3"><div className="text-[11px] font-black opacity-60">FINAL</div><div className="font-mono font-black text-lg">{score}</div></div>
                <div className="rounded-xl bg-sky-500 text-white p-3"><div className="text-[11px] font-black opacity-80">TIME</div><div className="font-mono font-black text-lg">{(progress*32).toFixed(1)}s</div></div>
                <div className="rounded-xl bg-amber-300 p-3"><div className="text-[11px] font-black opacity-60">BEST</div><div className="font-mono font-black text-lg">{best}</div></div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button onClick={startGame} className="py-3 rounded-full bg-emerald-500 text-white font-black">PLAY AGAIN</button>
                <button onClick={()=>{ resetRun(); setState('landing')}} className="py-3 rounded-full bg-white border-2 border-slate-200 font-black">HOME</button>
              </div>
            </div>
          </Overlay>
        )}
      </AnimatePresence>
    </div>
  )
}
