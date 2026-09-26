/* eslint-disable */
"use client";

/**
 * MotionLab — "The dot, unleashed."
 * A grid of 18 physics-driven canvas/SVG micro-animations for the design system.
 * Brand rule honored: surfaces stay grayscale; dots are ink-black at rest and
 * bloom to the accent only where the cursor disturbs them. Charts/orbital/pendulum
 * keep the accent as their highlight.
 *
 * Self-contained: one <canvas> (or one <svg> for the gooey scene) per tile, driven
 * by a single rAF engine. No design-system components needed — it styles against
 * the DS tokens (var(--ds-*)) so it sits natively in the catalog.
 *
 * Drop at: src/components/showroom/motion-lab.tsx
 * Props:  accent ("blue"|"green"|"amber"|"purple"|"pink"|"teal"|"red"), intensity (0.4–2), reduceMotion
 */

import { useEffect, useRef } from "react";

/* ------------------------------------------------------------------ engine */

class Engine {
  els: Record<string, any>;
  getLive: () => { intensity: number; reduceMotion: boolean };
  accent: string;
  scenes: any[] = [];
  _listeners: { el: any; type: string; fn: any }[] = [];
  colors: any = {};
  flock: any = null;
  morph: any = null;
  _raf = 0;
  _last = 0;
  _rt: any;
  _onResize: any;

  constructor(els: Record<string, any>, getLive: () => any, accent: string) {
    this.els = els; this.getLive = getLive; this.accent = accent;
  }

  rgb = (expr: string) => {
    const p = document.createElement("span");
    p.style.cssText = "position:absolute;left:-9999px;top:-9999px;color:" + expr;
    document.body.appendChild(p);
    const c = getComputedStyle(p).color; p.remove();
    const m = c.match(/[\d.]+/g) || ["0", "0", "0"];
    return [+m[0] || 0, +m[1] || 0, +m[2] || 0];
  };
  mix = (a: any, b: any, k: number) =>
    Math.round(a[0] + (b[0] - a[0]) * k) + "," + Math.round(a[1] + (b[1] - a[1]) * k) + "," + Math.round(a[2] + (b[2] - a[2]) * k);
  resolveColors = () => {
    const acc = this.accent || "blue";
    this.colors = {
      accent: this.rgb("var(--ds-" + acc + "-700)"),
      accent2: this.rgb("var(--ds-" + acc + "-400)"),
      gridGray: this.rgb("var(--ds-gray-600)"),
      ink: this.rgb("var(--ds-gray-1000)"),
      bg: this.rgb("var(--ds-background-200)"),
      line: this.rgb("var(--ds-gray-700)"),
    };
  };
  force = () => this.getLive().intensity ?? 1;

  addL = (el: any, type: string, fn: any) => { if (!el) return; el.addEventListener(type, fn); this._listeners.push({ el, type, fn }); };
  clearAll = () => { this._listeners.forEach((l) => l.el.removeEventListener(l.type, l.fn)); this._listeners = []; this.scenes = []; };
  setup = (name: string) => {
    const cv = this.els[name]; if (!cv) return null;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const r = cv.getBoundingClientRect();
    const W = Math.round(r.width), H = Math.round(r.height);
    if (!W || !H) return null;
    cv.width = W * dpr; cv.height = H * dpr;
    const ctx = cv.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { cv, ctx, W, H };
  };
  addPointer = (name: string, sc: any) => {
    const cv = this.els[name]; if (!cv) return;
    sc.p = sc.p || { x: null, y: null };
    this.addL(cv, "mousemove", (e: any) => { const r = cv.getBoundingClientRect(); sc.p.x = e.clientX - r.left; sc.p.y = e.clientY - r.top; });
    this.addL(cv, "mouseleave", () => { sc.p.x = null; sc.p.y = null; });
  };

  mount() {
    this.resolveColors();
    requestAnimationFrame(() => { this.init(); this._last = performance.now(); this._raf = requestAnimationFrame(this.loop); });
    this._onResize = () => { clearTimeout(this._rt); this._rt = setTimeout(() => { this.resolveColors(); this.init(); }, 200); };
    window.addEventListener("resize", this._onResize);
    [120, 450, 1000].forEach((ms) => setTimeout(() => this.resolveColors(), ms));
    if ((document as any).fonts && (document as any).fonts.ready) (document as any).fonts.ready.then(() => { this.resolveColors(); this.buildFlockShapes(); });
  }
  unmount() {
    cancelAnimationFrame(this._raf); clearTimeout(this._rt);
    window.removeEventListener("resize", this._onResize); this.clearAll();
  }
  loop = (now: number) => {
    this._raf = requestAnimationFrame(this.loop);
    let dt = (now - (this._last || now)) / 16.667;
    if (!isFinite(dt) || dt <= 0) dt = 1; dt = Math.min(2.5, dt);
    this._last = now;
    if (this.getLive().reduceMotion) return;
    const t = now / 1000;
    for (const s of this.scenes) { try { s.update(t, dt); } catch (e) {} }
  };
  init() {
    this.clearAll();
    this.buildFerro(); this.buildFlock(); this.buildBoids(); this.buildMorph();
    this.buildGoo(); this.buildOrbit(); this.buildConst(); this.buildPend(); this.buildElastic();
    this.buildComet(); this.buildRippleGrid(); this.buildCradle(); this.buildInterf();
    this.buildSpiro(); this.buildCloth(); this.buildBreath(); this.buildAttract(); this.buildConfetti();
    const t = performance.now() / 1000;
    for (const s of this.scenes) { try { s.update(t, 1); } catch (e) {} }
  }

  /* 01 — ferrofluid magnetic grid */
  buildFerro() {
    const s = this.setup("ferro"); if (!s) return;
    const { ctx, W, H } = s, gap = 23, dots: any[] = [];
    const ox = ((W % gap) + gap) / 2, oy = ((H % gap) + gap) / 2;
    for (let y = oy; y < H; y += gap) for (let x = ox; x < W; x += gap) dots.push({ hx: x, hy: y, x, y });
    const sc: any = { p: { x: null, y: null }, update: (t: number, dt: number) => {
      ctx.clearRect(0, 0, W, H);
      const A = this.colors.accent, G = this.colors.gridGray, R = 130, F = this.force();
      for (const d of dots) {
        let tx = d.hx + Math.sin(t * 1.1 + d.hx * 0.05) * 1.6, ty = d.hy + Math.cos(t * 0.9 + d.hy * 0.05) * 1.6;
        if (sc.p.x != null) {
          const dx = d.hx - sc.p.x, dy = d.hy - sc.p.y, dist = Math.hypot(dx, dy) || 0.001;
          if (dist < R) { const f = Math.pow(1 - dist / R, 1.6) * F, nx = dx / dist, ny = dy / dist, push = f * 48; tx += nx * push - ny * push * 0.55; ty += ny * push + nx * push * 0.55; }
        }
        d.x += (tx - d.x) * 0.2 * dt; d.y += (ty - d.y) * 0.2 * dt;
        const k = Math.min(1, Math.hypot(d.x - d.hx, d.y - d.hy) / 44);
        ctx.beginPath(); ctx.fillStyle = "rgb(" + this.mix(G, A, k) + ")"; ctx.arc(d.x, d.y, 1.3 + k * 3.2, 0, 7); ctx.fill();
      }
    }};
    this.addPointer("ferro", sc); this.scenes.push(sc);
  }

  /* 02 — flocking swarm into words */
  buildFlock() {
    const s = this.setup("flock"); if (!s) return;
    const { ctx, W, H } = s, N = 320, parts: any[] = [];
    for (let i = 0; i < N; i++) parts.push({ x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0, ti: i });
    this.flock = { parts, N, W, H, ctx, idx: 0, shapes: [], last: 0 };
    this.buildFlockShapes();
    const sc: any = { p: { x: null, y: null }, update: (t: number, dt: number) => {
      const F = this.flock; if (!F || !F.shapes.length) return;
      if (t - F.last > 3.8) { F.last = t; F.idx = (F.idx + 1) % F.shapes.length; }
      const tg = F.shapes[F.idx], A = this.colors.accent, INK = this.colors.ink, FC = this.force();
      const accS = "rgb(" + A.join(",") + ")", inkS = "rgb(" + INK.join(",") + ")";
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        const T = tg[p.ti % tg.length];
        p.vx += (T.x - p.x) * 0.014; p.vy += (T.y - p.y) * 0.014;
        p.vx += (Math.random() - 0.5) * 0.25; p.vy += (Math.random() - 0.5) * 0.25;
        let near = false;
        if (sc.p.x != null) { const dx = p.x - sc.p.x, dy = p.y - sc.p.y, d = Math.hypot(dx, dy) || 0.001; if (d < 82) { const f = (1 - d / 82) * 5 * FC; p.vx += dx / d * f; p.vy += dy / d * f; near = true; } }
        p.vx *= 0.85; p.vy *= 0.85; p.x += p.vx * dt; p.y += p.vy * dt;
        ctx.fillStyle = near ? accS : inkS; ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, 7); ctx.fill();
      }
    }};
    this.addPointer("flock", sc);
    this.addL(this.els["flock"], "click", () => { const F = this.flock; if (F && F.shapes.length) { F.idx = (F.idx + 1) % F.shapes.length; F.last = performance.now() / 1000; } });
    this.scenes.push(sc);
  }
  buildFlockShapes() {
    const F = this.flock; if (!F) return;
    F.shapes = ["SHIP", "LIVE", "DONE"].map((w) => this.sampleText(w, F.N, F.W, F.H));
  }
  sampleText(str: string, n: number, W: number, H: number) {
    const c = document.createElement("canvas"); c.width = W; c.height = H;
    const x = c.getContext("2d")!;
    const probe = document.createElement("span"); probe.style.fontFamily = "var(--font-geist-sans)";
    document.body.appendChild(probe); const fam = getComputedStyle(probe).fontFamily || "sans-serif"; probe.remove();
    const fs = Math.min(H * 0.6, (W * 0.82) / (str.length * 0.6));
    x.fillStyle = "#fff"; x.font = "800 " + fs + "px " + fam; x.textAlign = "center"; x.textBaseline = "middle";
    x.fillText(str, W / 2, H / 2);
    const data = x.getImageData(0, 0, W, H).data, pts: any[] = [];
    for (let yy = 0; yy < H; yy += 3) for (let xx = 0; xx < W; xx += 3) if (data[(yy * W + xx) * 4 + 3] > 128) pts.push({ x: xx, y: yy });
    const out: any[] = [];
    if (!pts.length) { for (let i = 0; i < n; i++) out.push({ x: W / 2, y: H / 2 }); return out; }
    // Spread particles evenly across every glyph pixel so each letter gets
    // proportional coverage (a fixed stride can clump and leave gaps).
    for (let i = 0; i < n; i++) out.push(pts[Math.floor((i / n) * pts.length)]);
    return out;
  }

  /* 03 — boids fish school */
  buildBoids() {
    const s = this.setup("boids"); if (!s) return;
    const { ctx, W, H } = s, N = 92, b: any[] = [];
    for (let i = 0; i < N; i++) b.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2 });
    const sc: any = { p: { x: null, y: null }, update: (t: number, dt: number) => {
      const bg = this.colors.bg, A = this.colors.accent, INK = this.colors.ink, F = this.force(), R2 = 44 * 44;
      const accS = "rgb(" + A.join(",") + ")", inkS = "rgb(" + INK.join(",") + ")";
      ctx.fillStyle = "rgba(" + bg.join(",") + ",0.22)"; ctx.fillRect(0, 0, W, H);
      for (const o of b) {
        let cx = 0, cy = 0, ax = 0, ay = 0, sx = 0, sy = 0, cnt = 0;
        for (const q of b) { if (q === o) continue; const dx = q.x - o.x, dy = q.y - o.y, d2 = dx * dx + dy * dy; if (d2 < R2) { cnt++; cx += q.x; cy += q.y; ax += q.vx; ay += q.vy; if (d2 < 420) { sx -= dx; sy -= dy; } } }
        if (cnt) { cx /= cnt; cy /= cnt; o.vx += (cx - o.x) * 0.0009; o.vy += (cy - o.y) * 0.0009; o.vx += (ax / cnt - o.vx) * 0.045; o.vy += (ay / cnt - o.vy) * 0.045; o.vx += sx * 0.004; o.vy += sy * 0.004; }
        if (sc.p.x != null) { const dx = sc.p.x - o.x, dy = sc.p.y - o.y, d = Math.hypot(dx, dy) || 1; o.vx += dx / d * 0.26 * F; o.vy += dy / d * 0.26 * F; }
        else { o.vx += Math.cos(t * 0.5 + o.x * 0.01) * 0.03; o.vy += Math.sin(t * 0.5 + o.y * 0.01) * 0.03; }
        const m = 22;
        if (o.x < m) o.vx += 0.3; if (o.x > W - m) o.vx -= 0.3; if (o.y < m) o.vy += 0.3; if (o.y > H - m) o.vy -= 0.3;
        const sp = Math.hypot(o.vx, o.vy), max = 2.5; if (sp > max) { o.vx = o.vx / sp * max; o.vy = o.vy / sp * max; }
        o.x += o.vx * dt; o.y += o.vy * dt;
        const near = sc.p.x != null && Math.hypot(sc.p.x - o.x, sc.p.y - o.y) < 95;
        ctx.beginPath(); ctx.fillStyle = near ? accS : inkS; ctx.arc(o.x, o.y, 2, 0, 7); ctx.fill();
      }
    }};
    this.addPointer("boids", sc); this.scenes.push(sc);
  }

  /* 04 — shape morph swarm */
  buildMorph() {
    const s = this.setup("morph"); if (!s) return;
    const { ctx, W, H } = s, N = 150, parts: any[] = [];
    for (let i = 0; i < N; i++) parts.push({ x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0, ti: i });
    this.morph = { parts, shapes: [this.genRing(N, W, H), this.genCheck(N, W, H), this.genBars(N, W, H), this.genHeart(N, W, H)], idx: 0, last: 0 };
    const sc: any = { p: { x: null, y: null }, update: (t: number, dt: number) => {
      const M = this.morph; if (!M) return;
      if (t - M.last > 3.2) { M.last = t; M.idx = (M.idx + 1) % M.shapes.length; }
      const tg = M.shapes[M.idx], A = this.colors.accent, INK = this.colors.ink, F = this.force();
      const accS = "rgb(" + A.join(",") + ")", inkS = "rgb(" + INK.join(",") + ")";
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        const T = tg[p.ti % tg.length];
        p.vx += (T.x - p.x) * 0.016; p.vy += (T.y - p.y) * 0.016;
        p.vx += (Math.random() - 0.5) * 0.2; p.vy += (Math.random() - 0.5) * 0.2;
        let near = false;
        if (sc.p.x != null) { const dx = p.x - sc.p.x, dy = p.y - sc.p.y, d = Math.hypot(dx, dy) || 1; if (d < 72) { const f = (1 - d / 72) * 4.5 * F; p.vx += dx / d * f; p.vy += dy / d * f; near = true; } }
        p.vx *= 0.84; p.vy *= 0.84; p.x += p.vx * dt; p.y += p.vy * dt;
        ctx.fillStyle = near ? accS : inkS; ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, 7); ctx.fill();
      }
    }};
    this.addPointer("morph", sc);
    this.addL(this.els["morph"], "click", () => { const M = this.morph; if (M) { M.idx = (M.idx + 1) % M.shapes.length; M.last = performance.now() / 1000; } });
    this.scenes.push(sc);
  }
  genRing(n: number, W: number, H: number) { const cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.34, out: any[] = []; for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; out.push({ x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R }); } return out; }
  genCheck(n: number, W: number, H: number) { const cx = W / 2, cy = H / 2, s = Math.min(W, H) * 0.32, p1 = { x: cx - s * 0.7, y: cy + s * 0.05 }, p2 = { x: cx - s * 0.15, y: cy + s * 0.6 }, p3 = { x: cx + s * 0.8, y: cy - s * 0.55 }, out: any[] = [], a = Math.floor(n * 0.38), b = n - a; for (let i = 0; i < a; i++) { const u = i / a; out.push({ x: p1.x + (p2.x - p1.x) * u, y: p1.y + (p2.y - p1.y) * u }); } for (let i = 0; i < b; i++) { const u = i / b; out.push({ x: p2.x + (p3.x - p2.x) * u, y: p2.y + (p3.y - p2.y) * u }); } return out; }
  genBars(n: number, W: number, H: number) { const cols = 5, out: any[] = [], baseY = H * 0.76, maxH = H * 0.5, bw = W * 0.08, gap = W * 0.05, totalW = cols * bw + (cols - 1) * gap, x0 = (W - totalW) / 2, heights = [0.45, 0.8, 0.6, 1, 0.7], per = Math.floor(n / cols); for (let c = 0; c < cols; c++) { const bx = x0 + c * (bw + gap), bh = maxH * heights[c], cnt = (c === cols - 1) ? (n - per * (cols - 1)) : per; for (let i = 0; i < cnt; i++) { const u = i / Math.max(1, cnt - 1); out.push({ x: bx + (i % 3) / 3 * bw * 0.8 + bw * 0.1, y: baseY - u * bh }); } } return out; }
  genHeart(n: number, W: number, H: number) { const cx = W / 2, cy = H / 2, sc = Math.min(W, H) * 0.021, out: any[] = []; for (let i = 0; i < n; i++) { const tt = (i / n) * Math.PI * 2, x = 16 * Math.pow(Math.sin(tt), 3), y = 13 * Math.cos(tt) - 5 * Math.cos(2 * tt) - 2 * Math.cos(3 * tt) - Math.cos(4 * tt); out.push({ x: cx + x * sc, y: cy - y * sc }); } return out; }

  /* 05 — gooey metaballs (SVG) */
  buildGoo() {
    const el = this.els["goo"]; if (!el) return;
    const circles = [...el.querySelectorAll("circle[data-blob]")]; if (!circles.length) return;
    const r = el.getBoundingClientRect(), W = r.width, H = r.height;
    const blobs = circles.map((c: any, i: number) => ({ c, phase: i * 1.7, ax: 16 + i * 7, ay: 13 + i * 6, sx: 0.55 + i * 0.12, sy: 0.48 + i * 0.1 }));
    const sc: any = { p: { x: null, y: null }, cx: W / 2, cy: H / 2, update: (t: number, dt: number) => {
      blobs.forEach((b: any, i: number) => {
        let X, Y;
        if (i === 0) { const tx = sc.p.x != null ? sc.p.x : W / 2 + Math.cos(t * 0.7) * 28; const ty = sc.p.y != null ? sc.p.y : H / 2 + Math.sin(t * 0.7) * 22; sc.cx += (tx - sc.cx) * 0.12 * dt; sc.cy += (ty - sc.cy) * 0.12 * dt; X = sc.cx; Y = sc.cy; }
        else { X = W / 2 + Math.sin(t * b.sx + b.phase) * b.ax * 1.7; Y = H / 2 + Math.cos(t * b.sy + b.phase) * b.ay * 1.7; }
        b.c.setAttribute("cx", X.toFixed(1)); b.c.setAttribute("cy", Y.toFixed(1));
      });
    }};
    this.addPointer("goo", sc); this.scenes.push(sc);
  }

  /* 06 — orbital gravity */
  buildOrbit() {
    const s = this.setup("orbit"); if (!s) return;
    const { ctx, W, H } = s, cx = W / 2, cy = H / 2;
    const sats = [{ r0: 32, r: 32, a: 0, sp: 0.045, sz: 5 }, { r0: 52, r: 52, a: 2, sp: -0.03, sz: 4.2 }, { r0: 74, r: 74, a: 4, sp: 0.022, sz: 3.4 }, { r0: 94, r: 94, a: 1, sp: -0.016, sz: 2.8 }];
    const sc: any = { p: { x: null, y: null }, update: (t: number, dt: number) => {
      const hov = sc.p.x != null, bg = this.colors.bg, A = this.colors.accent, ink = this.colors.ink, line = this.colors.line;
      ctx.fillStyle = "rgba(" + bg.join(",") + ",0.28)"; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(" + line.join(",") + ",0.16)"; ctx.lineWidth = 1;
      sats.forEach((o) => { ctx.beginPath(); ctx.arc(cx, cy, o.r, 0, 7); ctx.stroke(); });
      const F = this.force();
      sats.forEach((o) => { const tr = o.r0 * (hov ? 0.5 : 1); o.r += (tr - o.r) * 0.05 * dt; o.a += o.sp * (hov ? 1 + 1.4 * F : 1) * dt; const x = cx + Math.cos(o.a) * o.r, y = cy + Math.sin(o.a) * o.r; ctx.beginPath(); ctx.fillStyle = "rgb(" + A.join(",") + ")"; ctx.arc(x, y, o.sz, 0, 7); ctx.fill(); });
      ctx.beginPath(); ctx.fillStyle = "rgb(" + ink.join(",") + ")"; ctx.arc(cx, cy, hov ? 9 : 7, 0, 7); ctx.fill();
    }};
    this.addPointer("orbit", sc); this.scenes.push(sc);
  }

  /* 07 — living constellation */
  buildConst() {
    const s = this.setup("const"); if (!s) return;
    const { ctx, W, H } = s, N = 46, nodes: any[] = [];
    for (let i = 0; i < N; i++) nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5 });
    const D = 86;
    const sc: any = { p: { x: null, y: null }, update: (t: number, dt: number) => {
      ctx.clearRect(0, 0, W, H);
      const A = this.colors.accent, G = this.colors.gridGray, line = this.colors.line;
      for (const n of nodes) {
        n.x += n.vx * dt; n.y += n.vy * dt;
        if (n.x < 0 || n.x > W) n.vx *= -1; if (n.y < 0 || n.y > H) n.vy *= -1;
        n.x = Math.max(0, Math.min(W, n.x)); n.y = Math.max(0, Math.min(H, n.y));
        if (sc.p.x != null) { const dx = sc.p.x - n.x, dy = sc.p.y - n.y, d = Math.hypot(dx, dy) || 1; if (d < 120) { n.vx += dx / d * 0.04 * this.force(); n.vy += dy / d * 0.04 * this.force(); } }
        n.vx *= 0.995; n.vy *= 0.995;
      }
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) { const a = nodes[i], b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy); if (d < D) { ctx.strokeStyle = "rgba(" + line.join(",") + "," + ((1 - d / D) * 0.5).toFixed(3) + ")"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); } }
      if (sc.p.x != null) for (const n of nodes) { const d = Math.hypot(sc.p.x - n.x, sc.p.y - n.y); if (d < 120) { ctx.strokeStyle = "rgba(" + A.join(",") + "," + ((1 - d / 120) * 0.8).toFixed(3) + ")"; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(sc.p.x, sc.p.y); ctx.lineTo(n.x, n.y); ctx.stroke(); } }
      for (const n of nodes) { const near = sc.p.x != null && Math.hypot(sc.p.x - n.x, sc.p.y - n.y) < 120; ctx.beginPath(); ctx.fillStyle = near ? "rgb(" + A.join(",") + ")" : "rgb(" + G.join(",") + ")"; ctx.arc(n.x, n.y, near ? 3 : 2, 0, 7); ctx.fill(); }
    }};
    this.addPointer("const", sc); this.scenes.push(sc);
  }

  /* 08 — pendulum wave */
  buildPend() {
    const s = this.setup("pend"); if (!s) return;
    const { ctx, W, H } = s, N = 24, cy = H / 2, Amp = H * 0.3, n0 = 18, cycle = 8, margin = 22, span = W - margin * 2;
    const sc: any = { update: (t: number) => {
      ctx.clearRect(0, 0, W, H);
      const A = this.colors.accent, A2 = this.colors.accent2, pts: any[] = [];
      for (let i = 0; i < N; i++) { const x = margin + (i / (N - 1)) * span, w = 2 * Math.PI * (n0 + i) / cycle, y = cy + Amp * Math.sin(w * t); pts.push({ x, y }); }
      ctx.strokeStyle = "rgba(" + A2.join(",") + ",0.35)"; ctx.lineWidth = 1.5; ctx.beginPath();
      pts.forEach((p, i) => { i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); }); ctx.stroke();
      ctx.fillStyle = "rgb(" + A.join(",") + ")";
      for (const p of pts) { ctx.beginPath(); ctx.arc(p.x, p.y, 3.2, 0, 7); ctx.fill(); }
    }};
    this.scenes.push(sc);
  }

  /* 09 — elastic throw */
  buildElastic() {
    const s = this.setup("elastic"); if (!s) return;
    const { ctx, W, H, cv } = s;
    const ball = { x: W / 2, y: 40, vx: 1.6, vy: 0, r: 13 }, floor = H - 18;
    let drag = false, lx = 0, ly = 0;
    const sc: any = { update: (t: number, dt: number) => {
      ctx.clearRect(0, 0, W, H);
      const A = this.colors.accent, line = this.colors.line;
      ctx.strokeStyle = "rgba(" + line.join(",") + ",0.3)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, floor + ball.r); ctx.lineTo(W, floor + ball.r); ctx.stroke();
      if (!drag) {
        ball.vy += 0.6 * dt; ball.x += ball.vx * dt; ball.y += ball.vy * dt;
        if (ball.y > floor) { ball.y = floor; ball.vy *= -0.78; ball.vx *= 0.985; if (Math.abs(ball.vy) < 0.8) ball.vy = 0; }
        if (ball.y < ball.r) { ball.y = ball.r; ball.vy *= -0.78; }
        if (ball.x < ball.r) { ball.x = ball.r; ball.vx *= -0.8; }
        if (ball.x > W - ball.r) { ball.x = W - ball.r; ball.vx *= -0.8; }
        if (ball.y >= floor) ball.vx *= 0.99;
      }
      const sp = Math.hypot(ball.vx, ball.vy), st = Math.min(0.45, sp * 0.02), ang = Math.atan2(ball.vy, ball.vx);
      ctx.save(); ctx.translate(ball.x, ball.y); ctx.rotate(ang); ctx.scale(1 + st, 1 - st);
      ctx.beginPath(); ctx.fillStyle = "rgb(" + A.join(",") + ")"; ctx.arc(0, 0, ball.r, 0, 7); ctx.fill(); ctx.restore();
    }};
    this.addL(cv, "mousedown", (e: any) => { const r = cv.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top; if (Math.hypot(mx - ball.x, my - ball.y) < ball.r + 18) { drag = true; lx = mx; ly = my; ball.vx = 0; ball.vy = 0; cv.style.cursor = "grabbing"; } });
    this.addL(cv, "mousemove", (e: any) => { if (!drag) return; const r = cv.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top; ball.vx = mx - lx; ball.vy = my - ly; ball.x = mx; ball.y = my; lx = mx; ly = my; });
    this.addL(window, "mouseup", () => { if (drag) { drag = false; ball.vx = Math.max(-24, Math.min(24, ball.vx)); ball.vy = Math.max(-24, Math.min(24, ball.vy)); cv.style.cursor = "grab"; } });
    this.scenes.push(sc);
  }

  /* 10 — comet cursor trail */
  buildComet() {
    const s = this.setup("comet"); if (!s) return;
    const { ctx, W, H } = s, head = { x: W / 2, y: H / 2 }, trail: any[] = [];
    const sc: any = { p: { x: null, y: null }, update: (t: number, dt: number) => {
      const A = this.colors.accent, INK = this.colors.ink, active = sc.p.x != null;
      const tx = active ? sc.p.x : W / 2 + Math.cos(t * 0.8) * W * 0.32, ty = active ? sc.p.y : H / 2 + Math.sin(t * 1.1) * H * 0.3;
      head.x += (tx - head.x) * 0.16 * dt; head.y += (ty - head.y) * 0.16 * dt;
      trail.push({ x: head.x, y: head.y }); if (trail.length > 26) trail.shift();
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < trail.length; i++) { const k = i / trail.length, c = active ? A : INK; ctx.globalAlpha = k * 0.8; ctx.fillStyle = "rgb(" + c.join(",") + ")"; ctx.beginPath(); ctx.arc(trail[i].x, trail[i].y, 1 + k * 5.5, 0, 7); ctx.fill(); }
      ctx.globalAlpha = 1; ctx.fillStyle = "rgb(" + A.join(",") + ")"; ctx.beginPath(); ctx.arc(head.x, head.y, 7, 0, 7); ctx.fill();
    }};
    this.addPointer("comet", sc); this.scenes.push(sc);
  }

  /* 11 — ripple grid */
  buildRippleGrid() {
    const s = this.setup("rippleGrid"); if (!s) return;
    const { ctx, W, H } = s, gap = 22, dots: any[] = [];
    const ox = ((W % gap) + gap) / 2, oy = ((H % gap) + gap) / 2;
    for (let y = oy; y < H; y += gap) for (let x = ox; x < W; x += gap) dots.push({ x, y });
    const ripples: any[] = [];
    const sc: any = { p: { x: null, y: null }, last: 0, update: (t: number, dt: number) => {
      if (t - sc.last > 2.6) { sc.last = t; ripples.push({ x: Math.random() * W, y: Math.random() * H, t0: t }); }
      for (let i = ripples.length - 1; i >= 0; i--) if (t - ripples[i].t0 > 2.2) ripples.splice(i, 1);
      ctx.clearRect(0, 0, W, H);
      const A = this.colors.accent, G = this.colors.gridGray;
      for (const d of dots) {
        let amp = 0;
        for (const r of ripples) { const dist = Math.hypot(d.x - r.x, d.y - r.y), age = t - r.t0, env = Math.max(0, 1 - age * 0.5) * Math.max(0, 1 - dist / 240); amp += Math.sin(dist * 0.07 - age * 6) * env; }
        const k = Math.min(1, Math.abs(amp));
        ctx.fillStyle = "rgb(" + this.mix(G, A, k) + ")"; ctx.beginPath(); ctx.arc(d.x, d.y, 1.4 + k * 3.4, 0, 7); ctx.fill();
      }
    }};
    this.addL(this.els["rippleGrid"], "click", (e: any) => { const r = this.els["rippleGrid"].getBoundingClientRect(); ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, t0: performance.now() / 1000 }); });
    this.scenes.push(sc);
  }

  /* 12 — Newton's cradle */
  buildCradle() {
    const s = this.setup("cradle"); if (!s) return;
    const { ctx, W, H } = s, n = 5, R = 11, py = 26, L = H - 78, cxs: number[] = [], span = (n - 1) * R * 2, x0 = W / 2 - span / 2;
    for (let i = 0; i < n; i++) cxs.push(x0 + i * R * 2);
    const sc: any = { amp: 0.5, update: (t: number) => {
      const A = this.colors.accent, INK = this.colors.ink, line = this.colors.line;
      ctx.clearRect(0, 0, W, H);
      const sw = sc.amp * Math.sin(t * 3.1), left = Math.min(0, sw), right = Math.max(0, sw);
      for (let i = 0; i < n; i++) {
        let th = 0; if (i === 0) th = left; else if (i === n - 1) th = right;
        const bx = cxs[i] + Math.sin(th) * L, by = py + Math.cos(th) * L;
        ctx.strokeStyle = "rgba(" + line.join(",") + ",0.4)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cxs[i], py); ctx.lineTo(bx, by); ctx.stroke();
        const swing = Math.abs(th) > 0.02; ctx.fillStyle = swing ? "rgb(" + A.join(",") + ")" : "rgb(" + INK.join(",") + ")";
        ctx.beginPath(); ctx.arc(bx, by, R, 0, 7); ctx.fill();
      }
    }};
    this.addL(this.els["cradle"], "click", () => { sc.amp = Math.min(0.85, sc.amp + 0.25); });
    this.scenes.push(sc);
  }

  /* 13 — wave interference field */
  buildInterf() {
    const s = this.setup("interf"); if (!s) return;
    const { ctx, W, H } = s, gap = 18, dots: any[] = [];
    const ox = ((W % gap) + gap) / 2, oy = ((H % gap) + gap) / 2;
    for (let y = oy; y < H; y += gap) for (let x = ox; x < W; x += gap) dots.push({ x, y });
    const sc: any = { p: { x: null, y: null }, update: (t: number) => {
      const A = this.colors.accent, G = this.colors.gridGray;
      const s1x = W * 0.32, s1y = H / 2, s2x = sc.p.x != null ? sc.p.x : W * 0.68, s2y = sc.p.y != null ? sc.p.y : H / 2;
      ctx.clearRect(0, 0, W, H);
      for (const d of dots) {
        const d1 = Math.hypot(d.x - s1x, d.y - s1y), d2 = Math.hypot(d.x - s2x, d.y - s2y);
        const v = (Math.sin(d1 * 0.13 - t * 3) + Math.sin(d2 * 0.13 - t * 3)) / 2, k = Math.max(0, v);
        ctx.fillStyle = "rgb(" + this.mix(G, A, k) + ")"; ctx.beginPath(); ctx.arc(d.x, d.y, 1.2 + Math.abs(v) * 3, 0, 7); ctx.fill();
      }
    }};
    this.addPointer("interf", sc); this.scenes.push(sc);
  }

  /* 14 — spirograph trace */
  buildSpiro() {
    const s = this.setup("spiro"); if (!s) return;
    const { ctx, W, H } = s, cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.32, r = R * 0.38, d = R * 0.62, trail: any[] = [];
    const sc: any = { th: 0, update: (t: number, dt: number) => {
      const A = this.colors.accent, INK = this.colors.ink;
      sc.th += 0.08 * dt;
      const k = (R - r) / r, x = cx + (R - r) * Math.cos(sc.th) + d * Math.cos(k * sc.th), y = cy + (R - r) * Math.sin(sc.th) - d * Math.sin(k * sc.th);
      trail.push({ x, y }); if (trail.length > 360) trail.shift();
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(" + INK.join(",") + ",0.5)"; ctx.lineWidth = 1.4; ctx.beginPath();
      trail.forEach((p, i) => { i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); }); ctx.stroke();
      ctx.fillStyle = "rgb(" + A.join(",") + ")"; ctx.beginPath(); ctx.arc(x, y, 4, 0, 7); ctx.fill();
    }};
    this.scenes.push(sc);
  }

  /* 15 — spring cloth mesh */
  buildCloth() {
    const s = this.setup("cloth"); if (!s) return;
    const { ctx, W, H } = s, cols = 11, rows = 7, mx = 26, my = 20;
    const sw = (W - mx * 2) / (cols - 1), sh = (H - my * 2) / (rows - 1), nodes: any[] = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) nodes.push({ x: mx + c * sw, y: my + r * sh, ox: mx + c * sw, oy: my + r * sh, vx: 0, vy: 0, pin: r === 0 });
    const idx = (c: number, r: number) => r * cols + c;
    const sc: any = { p: { x: null, y: null }, update: (t: number, dt: number) => {
      const INK = this.colors.ink, line = this.colors.line, A = this.colors.accent, F = this.force();
      for (const o of nodes) {
        if (o.pin) continue;
        o.vx += (o.ox - o.x) * 0.06; o.vy += (o.oy - o.y) * 0.06 + 0.12;
        if (sc.p.x != null) { const dx = o.x - sc.p.x, dy = o.y - sc.p.y, dd = Math.hypot(dx, dy) || 1; if (dd < 70) { const f = (1 - dd / 70) * 4 * F; o.vx += dx / dd * f; o.vy += dy / dd * f; } }
        o.vx *= 0.9; o.vy *= 0.9; o.x += o.vx * dt; o.y += o.vy * dt;
      }
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(" + line.join(",") + ",0.45)"; ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const a = nodes[idx(c, r)]; if (c < cols - 1) { const b = nodes[idx(c + 1, r)]; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); } if (r < rows - 1) { const b = nodes[idx(c, r + 1)]; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); } }
      for (const o of nodes) { const near = sc.p.x != null && Math.hypot(sc.p.x - o.x, sc.p.y - o.y) < 70; ctx.fillStyle = near ? "rgb(" + A.join(",") + ")" : "rgb(" + INK.join(",") + ")"; ctx.beginPath(); ctx.arc(o.x, o.y, 2, 0, 7); ctx.fill(); }
    }};
    this.addPointer("cloth", sc); this.scenes.push(sc);
  }

  /* 16 — breathing grid */
  buildBreath() {
    const s = this.setup("breath"); if (!s) return;
    const { ctx, W, H } = s, gap = 24, dots: any[] = [];
    const ox = ((W % gap) + gap) / 2, oy = ((H % gap) + gap) / 2;
    for (let y = oy; y < H; y += gap) for (let x = ox; x < W; x += gap) dots.push({ x, y });
    const sc: any = { p: { x: null, y: null }, update: (t: number) => {
      const A = this.colors.accent, G = this.colors.gridGray;
      const cx = sc.p.x != null ? sc.p.x : W / 2, cy = sc.p.y != null ? sc.p.y : H / 2;
      ctx.clearRect(0, 0, W, H);
      for (const d of dots) { const dist = Math.hypot(d.x - cx, d.y - cy), k = (Math.sin(t * 1.8 - dist * 0.035) + 1) / 2; ctx.fillStyle = "rgb(" + this.mix(G, A, k * 0.9) + ")"; ctx.beginPath(); ctx.arc(d.x, d.y, 1.3 + k * 3.2, 0, 7); ctx.fill(); }
    }};
    this.addPointer("breath", sc); this.scenes.push(sc);
  }

  /* 17 — gravity attractor */
  buildAttract() {
    const s = this.setup("attract"); if (!s) return;
    const { ctx, W, H } = s, N = 220, ps: any[] = [];
    for (let i = 0; i < N; i++) ps.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2 });
    const sc: any = { p: { x: null, y: null }, update: (t: number, dt: number) => {
      const bg = this.colors.bg, A = this.colors.accent, INK = this.colors.ink, F = this.force();
      ctx.fillStyle = "rgba(" + bg.join(",") + ",0.22)"; ctx.fillRect(0, 0, W, H);
      const gx = sc.p.x != null ? sc.p.x : W / 2 + Math.cos(t * 0.5) * W * 0.18, gy = sc.p.y != null ? sc.p.y : H / 2 + Math.sin(t * 0.5) * H * 0.18;
      const accS = "rgb(" + A.join(",") + ")", inkS = "rgb(" + INK.join(",") + ")";
      for (const p of ps) {
        const dx = gx - p.x, dy = gy - p.y, d = Math.hypot(dx, dy) || 1, g = Math.min(0.6, 60 / (d * d)) * F * 8;
        p.vx += dx / d * g - dy / d * g * 0.35; p.vy += dy / d * g + dx / d * g * 0.35;
        p.vx *= 0.985; p.vy *= 0.985; p.x += p.vx * dt; p.y += p.vy * dt;
        if (p.x < 0 || p.x > W) p.vx *= -0.6; if (p.y < 0 || p.y > H) p.vy *= -0.6;
        ctx.fillStyle = d < 90 ? accS : inkS; ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, 7); ctx.fill();
      }
      ctx.fillStyle = inkS; ctx.beginPath(); ctx.arc(gx, gy, 4, 0, 7); ctx.fill();
    }};
    this.addPointer("attract", sc); this.scenes.push(sc);
  }

  /* 18 — confetti burst */
  buildConfetti() {
    const s = this.setup("confetti"); if (!s) return;
    const { ctx, W, H } = s, parts: any[] = [];
    const burst = (x: number, y: number) => { for (let i = 0; i < 46; i++) { const a = Math.random() * Math.PI * 2, sp = 2 + Math.random() * 6; parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 2, life: 1, acc: Math.random() < 0.55 }); } };
    const sc: any = { last: 0, update: (t: number, dt: number) => {
      if (t - sc.last > 3) { sc.last = t; burst(W / 2, H / 2); }
      const A = this.colors.accent, INK = this.colors.ink;
      ctx.clearRect(0, 0, W, H);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]; p.vy += 0.18 * dt; p.vx *= 0.99; p.x += p.vx * dt; p.y += p.vy * dt; p.life -= 0.014 * dt;
        if (p.life <= 0) { parts.splice(i, 1); continue; }
        const c = p.acc ? A : INK; ctx.globalAlpha = Math.max(0, p.life); ctx.fillStyle = "rgb(" + c.join(",") + ")";
        ctx.beginPath(); ctx.arc(p.x, p.y, 2.4 * p.life + 0.6, 0, 7); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }};
    this.addL(this.els["confetti"], "click", (e: any) => { const r = this.els["confetti"].getBoundingClientRect(); burst(e.clientX - r.left, e.clientY - r.top); });
    this.scenes.push(sc);
  }
}

/* --------------------------------------------------------------- component */

type Props = { accent?: string; intensity?: number; reduceMotion?: boolean };

type Tile = { name?: string; num?: string; kind?: string; title?: string; hint?: string; full?: boolean; h?: number; cursor?: string; svg?: boolean; divider?: string };

const TILES: Tile[] = [
  { name: "ferro", num: "01", kind: "Field", title: "Ferrofluid magnetic grid", full: true, h: 280, hint: "Move your cursor across the field — dots bulge, swirl, and glow." },
  { name: "flock", num: "02", kind: "Swarm", title: "Flocking dots → words", full: true, h: 248, cursor: "pointer", hint: "180 dots assemble into words. Click to morph · cursor scatters them." },
  { divider: "More swarms" },
  { name: "boids", num: "03", kind: "Swarm", title: "Boids — fish school", full: true, h: 248, hint: "A flock with cohesion, alignment & separation — it chases your cursor." },
  { name: "morph", num: "04", kind: "Swarm", title: "Shape morph · ring → ✓ → bars → ♥", h: 220, cursor: "pointer" },
  { divider: "Fields & physics" },
  { name: "goo", num: "05", kind: "Fluid", title: "Gooey metaball merge", h: 220, svg: true },
  { name: "orbit", num: "06", kind: "Gravity", title: "Orbital system · hover to pull", h: 220 },
  { name: "const", num: "07", kind: "Network", title: "Living constellation", h: 220 },
  { name: "pend", num: "08", kind: "Rhythm", title: "Pendulum wave", h: 220 },
  { name: "elastic", num: "09", kind: "Physics", title: "Elastic throw · drag & fling", h: 220, cursor: "grab" },
  { divider: "New experiments" },
  { name: "comet", num: "10", kind: "Trail", title: "Comet cursor trail", h: 220 },
  { name: "rippleGrid", num: "11", kind: "Wave", title: "Ripple grid · click to pulse", h: 220, cursor: "pointer" },
  { name: "cradle", num: "12", kind: "Physics", title: "Newton's cradle · click", h: 220, cursor: "pointer" },
  { name: "interf", num: "13", kind: "Wave", title: "Interference field", full: true, h: 248, hint: "Two wave sources — move your cursor to steer one and watch the moiré bloom." },
  { name: "spiro", num: "14", kind: "Geometry", title: "Spirograph trace", h: 220 },
  { name: "cloth", num: "15", kind: "Cloth", title: "Spring mesh · push it", h: 220 },
  { name: "breath", num: "16", kind: "Pulse", title: "Breathing grid", h: 220 },
  { name: "attract", num: "17", kind: "Gravity", title: "Gravity attractor", full: true, h: 248, hint: "Particles fall into orbit around your cursor — an accretion disk in ink." },
  { name: "confetti", num: "18", kind: "Burst", title: "Confetti burst · click", h: 220, cursor: "pointer" },
];

const mono = "var(--font-geist-mono)";
const card: React.CSSProperties = { background: "var(--ds-background-100)", border: "1px solid var(--ds-gray-alpha-400)", borderRadius: 13, overflow: "hidden", display: "flex", flexDirection: "column" };

export function MotionLab({ accent = "blue", intensity = 1, reduceMotion = false }: Props) {
  const els = useRef<Record<string, any>>({});
  const live = useRef({ intensity, reduceMotion });
  live.current = { intensity, reduceMotion };

  useEffect(() => {
    const eng = new Engine(els.current, () => live.current, accent);
    eng.mount();
    return () => eng.unmount();
  }, [accent]);

  const setRef = (name: string) => (el: any) => { els.current[name] = el; };

  return (
    <div style={{ ["--accent" as any]: `var(--ds-${accent}-700)`, fontFamily: "var(--font-geist-sans)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 18 }}>
        {TILES.map((tile, i) => {
          if (tile.divider) return (
            <div key={"d" + i} style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 12, margin: "6px 0 -4px" }}>
              <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".1em", color: "var(--ds-gray-700)", textTransform: "uppercase" }}>{tile.divider}</span>
              <span style={{ flex: 1, height: 1, background: "var(--ds-gray-alpha-300)" }} />
            </div>
          );
          return (
            <article key={tile.name} style={{ ...card, gridColumn: tile.full ? "1 / -1" : undefined }}>
              <div style={{ position: "relative", height: tile.h, background: "var(--ds-background-200)", borderBottom: "1px solid var(--ds-gray-alpha-400)", cursor: tile.cursor }}>
                {tile.svg ? (
                  <svg ref={setRef("goo")} width="100%" height="100%" style={{ position: "absolute", inset: 0, display: "block" }}>
                    <defs>
                      <filter id="m-goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="b" />
                        <feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" />
                      </filter>
                    </defs>
                    <g filter="url(#m-goo)" fill="var(--accent)">
                      <circle data-blob="1" cx="50%" cy="50%" r="16" />
                      <circle data-blob="1" cx="50%" cy="50%" r="13" />
                      <circle data-blob="1" cx="50%" cy="50%" r="12" />
                      <circle data-blob="1" cx="50%" cy="50%" r="11" />
                    </g>
                  </svg>
                ) : (
                  <canvas ref={setRef(tile.name!)} style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%" }} />
                )}
              </div>
              <div style={{ padding: "15px 17px", display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".06em", color: "var(--ds-gray-600)", textTransform: "uppercase" }}>{tile.num} · {tile.kind}</span>
                <span style={{ fontSize: 14, color: "var(--ds-gray-1000)", fontWeight: 500 }}>{tile.title}</span>
                {tile.hint ? <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--ds-gray-600)" }}>{tile.hint}</span> : null}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default MotionLab;
