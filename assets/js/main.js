// Motion for the home page: loader, sound gate, particle story, project lens, skills map and contact bunny.
// Libraries (three.js r128, GSAP + ScrollTrigger, Lenis) are self hosted in static/vendor.
(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGsap = typeof window.gsap !== 'undefined';
  const loader = document.getElementById('loader'), gate = document.getElementById('gate');

  // If the animation library is missing, show the plain page instead of an empty screen.
  if (!hasGsap) { root.classList.remove('js-on'); return; }
  gsap.registerPlugin(ScrollTrigger);
  document.body.classList.add('locked');
  window.scrollTo(0, 0);

  /* ---------------- ambient sound (Web Audio, generated, no files) ---------------- */
  const audio = { ctx: null, master: null, on: false, timer: null };
  const chords = [[261.63, 329.63, 392.0, 493.88], [220.0, 261.63, 329.63, 392.0], [174.61, 220.0, 261.63, 329.63], [196.0, 246.94, 293.66, 392.0]];
  function startAudio() {
    if (!audio.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      audio.ctx = new AC();
      audio.master = audio.ctx.createGain(); audio.master.gain.value = 0;
      const lp = audio.ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1100;
      audio.master.connect(lp); lp.connect(audio.ctx.destination);
      let i = 0;
      const playChord = () => {
        const now = audio.ctx.currentTime;
        chords[i++ % chords.length].forEach((f, k) => {
          ['sine', 'triangle'].forEach((type, j) => {
            const o = audio.ctx.createOscillator(), g = audio.ctx.createGain();
            o.type = type; o.frequency.value = f / (j ? 2 : 1); o.detune.value = (k - 1.5) * 4;
            g.gain.setValueAtTime(0, now); g.gain.linearRampToValueAtTime(0.05 / (j + 1), now + 2.5); g.gain.linearRampToValueAtTime(0, now + 7.5);
            o.connect(g); g.connect(audio.master); o.start(now); o.stop(now + 7.6);
          });
        });
      };
      playChord(); audio.timer = setInterval(playChord, 6000);
    }
    audio.ctx.resume(); audio.on = true;
    audio.master.gain.cancelScheduledValues(audio.ctx.currentTime);
    audio.master.gain.linearRampToValueAtTime(0.9, audio.ctx.currentTime + 1.5);
    setSoundUI();
  }
  function stopAudio() {
    if (audio.ctx) audio.master.gain.linearRampToValueAtTime(0, audio.ctx.currentTime + 0.6);
    audio.on = false; setSoundUI();
  }
  function chime() {
    if (!audio.on || !audio.ctx) return;
    const now = audio.ctx.currentTime, o = audio.ctx.createOscillator(), g = audio.ctx.createGain();
    o.type = 'sine'; o.frequency.value = 1046.5; g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.06, now + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);
    o.connect(g); g.connect(audio.master); o.start(now); o.stop(now + 1.5);
  }
  const soundBtn = document.getElementById('sound'), soundLabel = document.getElementById('sound-label');
  function setSoundUI() { soundBtn.setAttribute('aria-pressed', String(audio.on)); soundLabel.textContent = audio.on ? 'Sound on' : 'Sound off'; }
  soundBtn.addEventListener('click', () => { audio.on ? stopAudio() : startAudio(); session.set('bt-gate', audio.on ? 'sound' : 'quiet'); });

  /* ---------------- particle field with chapter morphs ---------------- */
  const field = { uniforms: null }; window.__field = field;
  const canvas = document.getElementById('field');
  if (window.THREE) {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 6.2);
    const N = innerWidth < 700 ? 7000 : 12000;
    const rnd = new Float32Array(N);
    for (let i = 0; i < N; i++) rnd[i] = Math.random();
    const jit = () => (Math.random() - 0.5) * 0.012;

    // sample N points from anything drawn white on a 2D canvas
    function sample2D(draw, size, depth, scale = 1.25, weight) {
      const c = document.createElement('canvas'); c.width = c.height = size;
      const g = c.getContext('2d'); g.fillStyle = '#000'; g.fillRect(0, 0, size, size); g.fillStyle = g.strokeStyle = '#fff';
      draw(g, size);
      const d = g.getImageData(0, 0, size, size).data, pts = [];
      for (let y = 0; y < size; y += 1) for (let x = 0; x < size; x += 1) { const a = d[(y * size + x) * 4]; if (a > 120) pts.push(x, y, a / 255); }
      const out = new Float32Array(N * 3), cnt = pts.length / 3;
      for (let i = 0; i < N; i++) {
        const k = Math.floor(Math.random() * cnt) * 3;
        out[i * 3] = ((pts[k] + Math.random()) / size - 0.5) * 2 * scale;
        out[i * 3 + 1] = -((pts[k + 1] + Math.random()) / size - 0.5) * 2 * scale;
        out[i * 3 + 2] = (Math.random() - 0.5) * depth;
      }
      return out;
    }
    const line = (g, w, pts) => { g.lineWidth = w; g.lineCap = g.lineJoin = 'round'; g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.stroke(); };

    // 0: a solid 3D bunny: head, floppy-ready ears, cheeks, nose and a tail; per-point normals for lighting
    const bunny = new Float32Array(N * 3), bnorm = new Float32Array(N * 3), bear = new Float32Array(N * 2), bcol = new Float32Array(N * 3);
    const WHITE = [0.93, 0.91, 1.0], PINK = [1.0, 0.6, 0.78], ROSE = [1.0, 0.45, 0.66];
    const parts = [
      { k: 'head', c: [0, -0.18, 0], r: [0.72, 0.62, 0.58], w: 0.6 },
      { k: 'ear', side: -1, c: [-0.32, 0.72, -0.05], r: [0.17, 0.52, 0.14], w: 0.16, a: 0.2 },
      { k: 'ear', side: 1, c: [0.32, 0.72, -0.05], r: [0.17, 0.52, 0.14], w: 0.16, a: -0.2 },
      { k: 'cheek', c: [-0.44, -0.36, 0.38], r: [0.14, 0.09, 0.06], w: 0.03 }, { k: 'cheek', c: [0.44, -0.36, 0.38], r: [0.14, 0.09, 0.06], w: 0.03 },
      { k: 'nose', c: [0, -0.4, 0.57], r: [0.07, 0.05, 0.04], w: 0.02 },
      { k: 'tail', c: [0, -0.62, -0.5], r: [0.16, 0.16, 0.16], w: 0.02 } ];
    const tw = parts.reduce((s, p) => s + p.w, 0);
    for (let i = 0; i < N; i++) {
      let r = Math.random() * tw, p = parts[0]; for (const q of parts) { if ((r -= q.w) <= 0) { p = q; break; } }
      let x, y, z, nx, ny, nz, u;
      do {
        u = Math.random() * 2 - 1; const th = Math.random() * Math.PI * 2, sq = Math.sqrt(1 - u * u);
        const fill = p.k === 'head' && Math.random() < 0.28 ? Math.cbrt(Math.random()) * 0.94 : 1;   // part of the head is filled, not just a shell
        const ux = sq * Math.cos(th), uy = u, uz = sq * Math.sin(th);
        x = ux * p.r[0] * fill; y = uy * p.r[1] * fill; z = uz * p.r[2] * fill;
        nx = ux / p.r[0]; ny = uy / p.r[1]; nz = uz / p.r[2];
        if (p.a) { const ca = Math.cos(p.a), sa = Math.sin(p.a); [x, y] = [x * ca - y * sa, x * sa + y * ca]; [nx, ny] = [nx * ca - ny * sa, nx * sa + ny * ca]; }
        x += p.c[0]; y += p.c[1]; z += p.c[2];
      } while (p.k === 'head' && z > 0.3 && ((x + 0.26) ** 2 + (y + 0.12) ** 2 < 0.012 || (x - 0.26) ** 2 + (y + 0.12) ** 2 < 0.012));
      const nl = Math.hypot(nx, ny, nz) || 1;
      bunny.set([x * 1.2 + jit(), y * 1.2 - 0.05 + jit(), z * 1.2], i * 3);
      bnorm.set([nx / nl, ny / nl, nz / nl], i * 3);
      bear.set(p.k === 'ear' ? [p.side, (u + 1) / 2] : [0, 0], i * 2);
      const innerEar = p.k === 'ear' && z > p.c[2] + 0.04 && Math.abs(x - p.c[0]) < p.r[0] * 0.55 && u > -0.7;
      bcol.set(p.k === 'cheek' || innerEar ? PINK : p.k === 'nose' ? ROSE : WHITE, i * 3);
    }

    // 1: portrait, filled in from the profile photo once it has loaded
    const portrait = new Float32Array(N * 3), pcol = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) { portrait.set(bunny.subarray(i * 3, i * 3 + 3), i * 3); pcol.set([0.8, 0.8, 0.9], i * 3); }

    // 2-4: one interface in four layers (layout, colour and type, components, tests):
    // assembled, pulled apart so each layer floats on its own, then put back together and tested
    const uiFlat = new Float32Array(N * 3), uiOpen = new Float32Array(N * 3), uiDone = new Float32Array(N * 3), uiCol = new Float32Array(N * 4);
    {
      const C = { dim: [0.46, 0.48, 0.64], blue: [0.56, 0.7, 1], white: [0.95, 0.94, 1], grey: [0.66, 0.66, 0.74], pink: [1, 0.61, 0.76], green: [0.56, 0.86, 0.71] };
      const seg = (x1, y1, x2, y2, col, w = 0.012) => ({ t: 's', x1, y1, x2, y2, col, w, m: Math.hypot(x2 - x1, y2 - y1) });
      const rect = (x1, y1, x2, y2, col) => ({ t: 'r', x1, y1, x2, y2, col, m: (x2 - x1) * (y2 - y1) * 6 });
      const box = (x1, y1, x2, y2, col) => [seg(x1, y1, x2, y1, col), seg(x2, y1, x2, y2, col), seg(x2, y2, x1, y2, col), seg(x1, y2, x1, y1, col)];
      const disc = (cx, cy, r, col) => ({ t: 'd', cx, cy, r, col, m: Math.PI * r * r * 6 });
      const ring = (cx, cy, r, col, idx) => ({ t: 'c', cx, cy, r, col, idx, m: Math.PI * 2 * r });
      const tick = (cx, cy, r, col, idx) => [seg(cx - r * 0.45, cy, cx - r * 0.1, cy - r * 0.35, col, 0.016), seg(cx - r * 0.1, cy - r * 0.35, cx + r * 0.5, cy + r * 0.35, col, 0.016)].map((q) => Object.assign(q, { idx }));
      const layers = [
        { share: 0.2, items: [...box(-1.3, -0.85, 1.3, 0.85, C.dim), seg(-1.3, 0.6, 1.3, 0.6, C.dim), seg(-0.75, -0.85, -0.75, 0.6, C.dim),
          ...[-0.5, -0.15, 0.2, 0.55, 0.9].flatMap((u) => [0, 1, 2, 3, 4, 5].map((k) => seg(u, 0.5 - k * 0.22, u, 0.38 - k * 0.22, C.dim, 0.006)))] },
        { share: 0.3, items: [rect(-1.3, 0.6, 1.3, 0.85, C.blue), rect(-0.6, 0.33, 0.45, 0.43, C.white),
          ...[[0.2, 0.9], [0.08, 0.9], [-0.04, 0.55]].map(([v, e]) => rect(-0.6, v - 0.018, e, v + 0.018, C.grey)),
          ...[0.4, 0.25, 0.1, -0.05].map((v) => rect(-1.15, v - 0.02, -0.92, v + 0.02, C.grey)),
          disc(-1.15, -0.62, 0.055, C.blue), disc(-1.0, -0.62, 0.055, C.pink), disc(-0.85, -0.62, 0.055, C.green)] },
        { share: 0.3, items: [...[-0.6, -0.02, 0.56].flatMap((u) => [...box(u, -0.75, u + 0.5, -0.18, C.white), rect(u + 0.04, -0.45, u + 0.46, -0.22, C.pink)]),
          rect(0.78, 0.66, 1.18, 0.79, C.pink), ...box(-1.18, -0.4, -0.98, -0.3, C.white), disc(-1.03, -0.35, 0.04, C.green)] },
        { share: 0.2, items: [-0.35, 0.23, 0.81].flatMap((u, k) => [ring(u, -0.47, 0.14, C.green, k), ...tick(u, -0.47, 0.14, C.green, k)]) },
      ];
      const narrow = innerWidth < 700, A = 0.8, Y = -0.32, S = narrow ? 0.46 : 0.58, GAP = narrow ? 0.38 : 0.7, UP = narrow ? 0 : 0.12, ca = Math.cos(A), sa = Math.sin(A), cy = Math.cos(Y), sy = Math.sin(Y);
      const place = (u, v, lift, out, i) => {
        let x = u * S, y = v * S * ca, z = -v * S * sa;   // the screen leans back; layers lift straight up
        [x, z] = [x * cy + z * sy, -x * sy + z * cy];
        out.set([x + 0.05, y + lift + UP, z], i * 3);
      };
      let i = 0;
      layers.forEach((L, li) => {
        const tot = L.items.reduce((a, q) => a + q.m, 0), end = li === layers.length - 1 ? N : i + Math.round(N * L.share);
        for (; i < end; i++) {
          let r = Math.random() * tot, q = L.items[0]; for (const it of L.items) { if ((r -= it.m) <= 0) { q = it; break; } }
          let u, v; const R = Math.random();
          if (q.t === 's') { const n = (Math.random() - 0.5) * q.w, dx = q.x2 - q.x1, dy = q.y2 - q.y1, l = q.m || 1; u = q.x1 + dx * R - dy / l * n; v = q.y1 + dy * R + dx / l * n; }
          else if (q.t === 'r') { u = q.x1 + (q.x2 - q.x1) * R; v = q.y1 + (q.y2 - q.y1) * Math.random(); }
          else { const a = R * Math.PI * 2, rr = q.t === 'd' ? Math.sqrt(Math.random()) * q.r : q.r + (Math.random() - 0.5) * 0.016; u = q.cx + Math.cos(a) * rr; v = q.cy + Math.sin(a) * rr; }
          place(u, v, li * 0.012, uiFlat, i);
          place(u, v, (li - 1.5) * GAP, uiOpen, i);
          place(u, v, li === 3 ? 0.1 : li * 0.012, uiDone, i);
          uiCol.set([...q.col, li + (q.idx || 0) * 0.25], i * 4);
        }
      });
    }
    // 5-6: a bug, then a check mark
    const bug = sample2D((g, s) => {
      g.beginPath(); g.ellipse(s * .5, s * .56, s * .17, s * .23, 0, 0, Math.PI * 2); g.fill();
      g.beginPath(); g.arc(s * .5, s * .29, s * .09, 0, Math.PI * 2); g.fill();
      for (const k of [-1, 1]) { [[.44, -.06], [.56, 0], [.68, .07]].forEach(([y, dy]) => line(g, s * .026, [[s * (.5 + k * .14), s * y], [s * (.5 + k * .25), s * (y + dy)], [s * (.5 + k * .31), s * (y + dy + .04)]])); line(g, s * .02, [[s * (.5 + k * .04), s * .22], [s * (.5 + k * .12), s * .12]]); }
      g.strokeStyle = '#000'; line(g, s * .012, [[s * .5, s * .36], [s * .5, s * .78]]);
    }, 220, 0.3, 1.2);
    const check = sample2D((g, s) => { g.lineWidth = s * .045; g.beginPath(); g.arc(s / 2, s / 2, s * .36, 0, Math.PI * 2); g.stroke(); line(g, s * .08, [[s * .33, s * .52], [s * .45, s * .64], [s * .68, s * .38]]); }, 220, 0.25, 1.2);
    // 7: a camera aperture
    const aperture = sample2D((g, s) => {
      g.beginPath(); g.arc(s / 2, s / 2, s * .42, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#000'; g.beginPath(); for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3 + 0.3; g.lineTo(s / 2 + Math.cos(a) * s * .2, s / 2 + Math.sin(a) * s * .2); } g.closePath(); g.fill();
      g.strokeStyle = '#000'; for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3 + 0.3, b = a + Math.PI / 3; line(g, s * .04, [[s / 2 + Math.cos(a) * s * .2, s / 2 + Math.sin(a) * s * .2], [s / 2 + Math.cos(b - 0.9) * s * .44, s / 2 + Math.sin(b - 0.9) * s * .44]]); }
    }, 240, 0.3, 1.25);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(bunny, 3));
    geo.setAttribute('aNorm', new THREE.BufferAttribute(bnorm, 3));
    geo.setAttribute('aEar', new THREE.BufferAttribute(bear, 2));
    geo.setAttribute('aBCol', new THREE.BufferAttribute(bcol, 3));
    const pAttr = new THREE.BufferAttribute(portrait, 3), cAttr = new THREE.BufferAttribute(pcol, 3);
    geo.setAttribute('aT1', pAttr); geo.setAttribute('aCol', cAttr);
    geo.setAttribute('aT2', new THREE.BufferAttribute(uiFlat, 3));
    geo.setAttribute('aT3', new THREE.BufferAttribute(uiOpen, 3));
    geo.setAttribute('aT4', new THREE.BufferAttribute(uiDone, 3));
    geo.setAttribute('aUi', new THREE.BufferAttribute(uiCol, 4));
    field.bunnyData = { bunny, bnorm, bear, bcol };
    geo.setAttribute('aT5', new THREE.BufferAttribute(bug, 3));
    geo.setAttribute('aT6', new THREE.BufferAttribute(check, 3));
    geo.setAttribute('aT7', new THREE.BufferAttribute(aperture, 3));
    geo.setAttribute('aRand', new THREE.BufferAttribute(rnd, 1));

    // portrait from the profile photo: brighter pixels attract more particles and keep their colour
    const src = document.getElementById('portrait-src');
    const buildPortrait = () => {
      const S = 200, c = document.createElement('canvas'); c.width = c.height = S; const g = c.getContext('2d');
      const iw = src.naturalWidth, ih = src.naturalHeight, side = iw * 0.62;
      g.drawImage(src, iw * 0.47 - side / 2, ih * 0.37 - side / 2, side, side, 0, 0, S, S);
      const d = g.getImageData(0, 0, S, S).data, L = new Float32Array(S * S), cand = [];
      for (let i = 0; i < S * S; i++) L[i] = (d[i * 4] * 0.3 + d[i * 4 + 1] * 0.59 + d[i * 4 + 2] * 0.11) / 255;
      for (let y = 1; y < S - 1; y++) for (let x = 1; x < S - 1; x++) {
        const dx = x / S - 0.5, dy = y / S - 0.5; if (dx * dx + dy * dy > 0.24) continue;      // round crop, like the avatar
        const i = y * S + x;
        const gx = L[i - S + 1] + 2 * L[i + 1] + L[i + S + 1] - L[i - S - 1] - 2 * L[i - 1] - L[i + S - 1];
        const gy = L[i + S - 1] + 2 * L[i + S] + L[i + S + 1] - L[i - S - 1] - 2 * L[i - S] - L[i - S + 1];
        const edge = Math.min(1, Math.pow(Math.hypot(gx, gy) * 3.0, 1.3));
        cand.push(x, y, edge * 0.95 + 0.02, d[i * 4] / 255, d[i * 4 + 1] / 255, d[i * 4 + 2] / 255);
      }
      // particles gather along the edges of face, hair and glasses, like a sketch
      for (let i = 0; i < N; i++) {
        let k; do { k = Math.floor(Math.random() * (cand.length / 6)) * 6; } while (Math.random() > cand[k + 2]);
        const x = ((cand[k] + Math.random()) / S - 0.5) * 2.5, y = -((cand[k + 1] + Math.random()) / S - 0.5) * 2.5;
        portrait.set([x, y, (Math.random() - 0.5) * 0.12], i * 3);
        const w = 0.55;   // tint the photo colour toward a soft white so the sketch reads on the dark page
        pcol.set([cand[k + 3] * (1 - w) + w, cand[k + 4] * (1 - w) + w * 0.95, cand[k + 5] * (1 - w) + w], i * 3);
      }
      pAttr.needsUpdate = true; cAttr.needsUpdate = true;
    };
    if (src && src.complete && src.naturalWidth) buildPortrait(); else if (src) src.addEventListener('load', buildPortrait);

    const uniforms = field.uniforms = {
      uTime: { value: 0 }, uIntro: { value: 0 }, uMorph: { value: 0 }, uFade: { value: 0 }, uDroop: { value: 0 },
      uMouse: { value: new THREE.Vector2(9, 9) }, uSize: { value: 22 }, uPR: { value: renderer.getPixelRatio() },
      uA: { value: new THREE.Color('#8fb2ff') }, uB: { value: new THREE.Color('#ff9cc2') },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `
        uniform float uTime, uIntro, uMorph, uFade, uSize, uPR, uDroop; uniform vec2 uMouse; uniform vec3 uA, uB;
        attribute vec3 aT1, aT2, aT3, aT4, aT5, aT6, aT7, aCol, aNorm, aBCol; attribute vec4 aUi; attribute vec2 aEar; attribute float aRand;
        vec3 bunnyPos() {
          vec3 q = position;
          if (aEar.x != 0.0) {                                   // ears flop outward and down around their base
            vec3 pivot = vec3(aEar.x * 0.36, 0.26, -0.06);
            float ang = -aEar.x * uDroop * (0.55 + 0.95 * aEar.y);
            vec3 v = q - pivot; float c = cos(ang), s = sin(ang);
            v.xy = vec2(v.x * c - v.y * s, v.x * s + v.y * c);
            v.z += uDroop * 0.18 * aEar.y;
            q = pivot + v;
          }
          return q;
        }
        varying vec3 vColor; varying float vAlpha;
        vec3 shape(float k) {
          if (k < 0.5) return bunnyPos(); if (k < 1.5) return aT1; if (k < 2.5) return aT2; if (k < 3.5) return aT3;
          if (k < 4.5) return aT4; if (k < 5.5) return aT5; if (k < 6.5) return aT6; return aT7;
        }
        void main() {
          float k = clamp(uMorph, 0.0, 7.0), base = floor(k), f = k - base;
          float layer = floor(aUi.a + 0.01), tickIdx = fract(aUi.a + 0.001) * 4.0;
          bool uiStep = base > 1.5 && base < 3.5;                 // pulling the interface apart or putting it back
          float t = uiStep ? clamp((f - layer * 0.12 - aRand * 0.08) / 0.56, 0.0, 1.0) : clamp((f - aRand * 0.3) / 0.7, 0.0, 1.0);
          t = t * t * (3.0 - 2.0 * t);
          vec3 a = shape(base), b = shape(min(base + 1.0, 7.0));
          // particles lift off the old shape and settle into the new one along a gentle arc; interface layers move as sheets
          vec3 p = mix(a, b, t) + vec3(0.0, 0.0, sin(t * 3.14159) * (0.4 + aRand * 0.6) * (uiStep ? 0.06 : 1.0));
          p += 0.02 * vec3(sin(uTime * 0.8 + aRand * 40.0), cos(uTime * 0.7 + aRand * 30.0), sin(uTime * 0.6 + aRand * 20.0));
          vec3 dir = normalize(vec3(sin(aRand * 91.3 + position.x * 7.0), cos(aRand * 47.1 + position.y * 5.0), sin(aRand * 13.7 + position.z * 3.0)));
          p = mix(dir * (2.4 + aRand * 5.0), p, clamp(uIntro * 1.15 - aRand * 0.15, 0.0, 1.0));
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          vec2 ndc = gl_Position.xy / gl_Position.w, d = ndc - uMouse;
          float bw = clamp(1.0 - uMorph, 0.0, 1.0);
          ndc += normalize(d + 1e-4) * smoothstep(0.3, 0.0, length(d)) * 0.12 * (1.0 - bw * 0.85);
          gl_Position.xy = ndc * gl_Position.w;
          float portraitW = clamp(1.0 - abs(k - 1.0), 0.0, 1.0);
          gl_PointSize = uSize * uPR * (0.35 + aRand * 0.9) * (1.0 + portraitW * 0.15) / -mv.z;
          vec3 n = normalize(mat3(modelMatrix) * aNorm);
          float light = 0.32 + 0.68 * max(dot(n, normalize(vec3(-0.45, 0.65, 0.75))), 0.0) + 0.25 * pow(1.0 - max(n.z, 0.0), 3.0);
          vec3 tint = mix(mix(uA, uB, smoothstep(-1.0, 1.0, p.y + p.x * 0.4)), aCol, portraitW);
          float uiW = clamp(k - 1.0, 0.0, 1.0) * clamp(5.0 - k, 0.0, 1.0);
          float lit = smoothstep(3.3 + tickIdx * 0.18, 3.5 + tickIdx * 0.18, k);   // the tests pass one after another
          tint = mix(tint, aUi.rgb * (layer > 2.5 ? 0.6 + 0.5 * lit : 1.0), uiW);
          vColor = mix(tint, aBCol * light, bw);
          vAlpha = (0.2 + 0.8 * uIntro) * (0.35 + 0.65 * aRand) * (1.0 - uFade * 0.8) * (1.0 + portraitW * 0.25) * mix(1.0, 0.25 + 0.75 * smoothstep(-7.4, -5.2, mv.z), bw) * mix(1.0, layer > 2.5 ? mix(0.35, 1.6, lit) : 1.1, uiW);
        }`,
      fragmentShader: `
        varying vec3 vColor; varying float vAlpha;
        void main() { float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard; gl_FragColor = vec4(vColor, smoothstep(0.5, 0.05, d) * vAlpha); }`,
    });
    const points = new THREE.Points(geo, mat), group = new THREE.Group();
    group.add(points); scene.add(group);
    const layout = { x: 1.45, y: 0, s: 1.15 };
    const size = () => {
      renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
      const wide = innerWidth > 860; layout.x = wide ? 1.45 : 0; layout.y = wide ? 0 : 0.95; layout.s = wide ? 1.15 : 0.8;
    };
    size(); addEventListener('resize', size);
    const target = new THREE.Vector2(9, 9), tilt = { x: 0, y: 0 };
    // the bunny turns on its own, can be spun by dragging, and droops its ears when the pointer is on it
    const spin = { x: 0, y: 0, vx: 0, vy: 0.004, drag: false, lx: 0, ly: 0, hover: false };
    const center = new THREE.Vector3();
    field.bunnyHover = () => spin.hover;
    addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse' || !spin.hover || e.target.closest('a, button')) return;
      spin.drag = true; spin.lx = e.clientX; spin.ly = e.clientY; e.preventDefault();
    });
    addEventListener('pointermove', (e) => {
      if (!spin.drag) return;
      const dx = e.clientX - spin.lx, dy = e.clientY - spin.ly; spin.lx = e.clientX; spin.ly = e.clientY;
      spin.vy = dx * 0.008; spin.vx = dy * 0.006; spin.y += spin.vy; spin.x = Math.max(-0.6, Math.min(0.6, spin.x + spin.vx));
    });
    addEventListener('pointerup', () => { spin.drag = false; });
    addEventListener('pointermove', (e) => target.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1));
    const clock = new THREE.Clock();
    const tick = () => {
      requestAnimationFrame(tick);
      if (field.paused || uniforms.uFade.value >= 0.999) return;
      const t = clock.getElapsedTime();
      uniforms.uTime.value = reduce ? 0 : t;
      uniforms.uMouse.value.lerp(target, 0.12);
      tilt.x += (target.y * 0.2 - tilt.x) * 0.05; tilt.y += (target.x * 0.3 - tilt.y) * 0.05;
      uniforms.uMorph.value += ((field.morphTarget || 0) - uniforms.uMorph.value) * (reduce ? 1 : 0.03);
      const m = uniforms.uMorph.value;
      // the bunny and the wave read best facing the camera; the ring and sphere keep turning
      // the bunny sways to show its volume; flat shapes stay facing the viewer
      const bw = Math.max(0, 1 - m);
      if (!spin.drag) {
        spin.y += spin.vy; spin.vy += ((reduce ? 0 : 0.004) - spin.vy) * 0.03;   // inertia settles back to a slow turntable
        spin.x += (0 - spin.x) * 0.04;
      }
      const wrapped = Math.atan2(Math.sin(spin.y), Math.cos(spin.y));
      group.rotation.x = tilt.x * 0.5 * (1 - bw) + bw * spin.x;
      points.rotation.y = bw * wrapped + tilt.y * 0.6 * (1 - bw) + (1 - uniforms.uIntro.value) * 2.4;
      group.getWorldPosition(center); center.project(camera);
      const dxp = (target.x - center.x) * camera.aspect, dyp = target.y - center.y;
      spin.hover = bw > 0.5 && Math.hypot(dxp, dyp) < 0.55 * layout.s;
      uniforms.uDroop.value += ((spin.hover || spin.drag ? 1 : 0) - uniforms.uDroop.value) * 0.08;
      const cur = spin.drag ? 'grabbing' : spin.hover ? 'grab' : ''; if (document.body.style.cursor !== cur) document.body.style.cursor = cur;
      group.position.x += (layout.x - group.position.x) * 0.08; group.position.y += (layout.y - group.position.y) * 0.08;
      group.scale.setScalar(layout.s);
      renderer.render(scene, camera);
    };
    tick();
  }

  /* ---------------- skills map: a 3D constellation of skills ---------------- */
  (() => {
    const stage = document.getElementById('skills-stage'), cv = document.getElementById('skills');
    if (!window.THREE || !stage) return;
    const SKILLS = JSON.parse(document.getElementById('skills-data').textContent);
    const HUBS = SKILLS.areas, SK = SKILLS.skills.map((x) => [x.name, x.area, x.note]), CROSS = SKILLS.links;
    const nodes = [], byName = {};
    const tet = [[1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]];
    HUBS.forEach((h, k) => { const v = new THREE.Vector3(...tet[k]).normalize().multiplyScalar(1.05); const n = { name: h.name, hub: true, group: h, pos: v, links: new Set() }; nodes.push(n); byName[h.name] = n; h.node = n; });
    HUBS.forEach((h) => {
      const mine = SK.filter((x) => x[1] === h.id), dir = h.node.pos.clone().normalize();
      mine.forEach(([name, , note], j) => {
        const y = 1 - (j + 0.5) / mine.length * 2, r = Math.sqrt(1 - y * y), th = j * 2.4 + h.node.pos.x * 3;
        const off = new THREE.Vector3(Math.cos(th) * r, y, Math.sin(th) * r).add(dir.clone().multiplyScalar(0.6)).normalize().multiplyScalar(0.8);
        const n = { name, hub: false, group: h, note, pos: h.node.pos.clone().add(off), links: new Set() };
        nodes.push(n); byName[name] = n;
      });
    });
    const edges = [];
    const link = (a, b) => { if (!a || !b) return; edges.push([a, b]); a.links.add(b); b.links.add(a); };
    nodes.filter((n) => !n.hub).forEach((n) => link(n, n.group.node));
    for (let a = 0; a < HUBS.length; a++) for (let b = a + 1; b < HUBS.length; b++) link(HUBS[a].node, HUBS[b].node);
    CROSS.forEach(([a, b]) => link(byName[a], byName[b]));

    const r = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    r.setPixelRatio(Math.min(devicePixelRatio, 2));
    const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(36, 1, 0.1, 50); cam.position.z = 5.4;
    const grp = new THREE.Group(); scene.add(grp);
    // nodes as soft glowing points, with a little dust around them for depth
    const DUST = 420, total = nodes.length + DUST, np = new Float32Array(total * 3), nc = new Float32Array(total * 3), ns = new Float32Array(total);
    nodes.forEach((n, i) => { np.set(n.pos.toArray(), i * 3); const c = new THREE.Color(n.group.col); nc.set(n.hub ? [c.r, c.g, c.b] : [0.94, 0.93, 1], i * 3); ns[i] = n.hub ? 120 : 58; });
    for (let i = nodes.length; i < total; i++) {
      const v = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(1.4 + Math.random() * 1.6);
      np.set(v.toArray(), i * 3); nc.set([0.5, 0.52, 0.66], i * 3); ns[i] = 8 + Math.random() * 12;
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(np, 3)); pg.setAttribute('color', new THREE.BufferAttribute(nc, 3)); pg.setAttribute('aSize', new THREE.BufferAttribute(ns, 1));
    const pm = new THREE.ShaderMaterial({ uniforms: { uPR: { value: r.getPixelRatio() } }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: true,
      vertexShader: `uniform float uPR; attribute float aSize; varying vec3 vC; varying float vA;
        void main() { vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = aSize * uPR / -mv.z;
          vC = color; vA = 0.3 + 0.7 * smoothstep(-8.0, -4.2, mv.z); }`,
      fragmentShader: `varying vec3 vC; varying float vA; void main() { float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard; gl_FragColor = vec4(vC, smoothstep(0.5, 0.1, d) * vA); }` });
    grp.add(new THREE.Points(pg, pm));
    const lp = new Float32Array(edges.length * 6), lc = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => { lp.set([...a.pos.toArray(), ...b.pos.toArray()], i * 6); });
    const lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.BufferAttribute(lp, 3)); lg.setAttribute('color', new THREE.BufferAttribute(lc, 3));
    grp.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false })));

    const wrapEl = document.getElementById('skill-labels'), card = { g: document.getElementById('sc-group'), n: document.getElementById('sc-name'), t: document.getElementById('sc-note') };
    const intro = [card.g.textContent, card.n.textContent, card.t.textContent];
    nodes.forEach((n) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'skill-label' + (n.hub ? ' hub' : ''); b.textContent = n.name;
      b.addEventListener('pointerenter', () => setActive(n)); b.addEventListener('focus', () => setActive(n));
      b.addEventListener('pointerleave', () => setActive(null)); b.addEventListener('blur', () => setActive(null));
      wrapEl.appendChild(b); n.el = b;
    });
    let active = null;
    function paintEdges() {
      edges.forEach(([a, b], i) => {
        const on = active && (a === active || b === active), c = new THREE.Color(on ? active.group.col : a.group === b.group ? a.group.col : '#5a5c70');
        const k = active ? (on ? 1 : 0.12) : (a.hub && b.hub ? 0.35 : 0.5);
        lc.set([c.r * k, c.g * k, c.b * k, c.r * k, c.g * k, c.b * k], i * 6);
      });
      lg.attributes.color.needsUpdate = true;
    }
    function setActive(n) {
      active = n; paintEdges();
      nodes.forEach((m) => { m.el.classList.toggle('is-dim', !!n && m !== n && !n.links.has(m)); m.el.classList.toggle('is-on', m === n); });
      if (n) { card.g.textContent = n.hub ? 'Area' : n.group.name; card.n.textContent = n.name; card.t.textContent = n.hub ? n.group.note : n.note; }
      else { [card.g.textContent, card.n.textContent, card.t.textContent] = intro; }
    }
    paintEdges();

    const rot = { x: 0.35, y: 0, vx: 0, vy: 0.0025, drag: false, lx: 0, ly: 0 };
    stage.addEventListener('pointerdown', (e) => { rot.drag = true; rot.lx = e.clientX; rot.ly = e.clientY; stage.classList.add('dragging'); });
    addEventListener('pointermove', (e) => {
      if (!rot.drag) return;
      const dx = e.clientX - rot.lx, dy = e.clientY - rot.ly; rot.lx = e.clientX; rot.ly = e.clientY;
      rot.vy = dx * 0.006; rot.vx = dy * 0.004; rot.y += rot.vy; rot.x = Math.max(-0.9, Math.min(0.9, rot.x + rot.vx));
    });
    addEventListener('pointerup', () => { rot.drag = false; stage.classList.remove('dragging'); });
    const resize = () => {
      const w = stage.clientWidth, h = stage.clientHeight; r.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix();
      const wide = w > 760; grp.scale.setScalar(wide ? 0.82 : 0.66);
      grp.position.set(wide ? 0.55 : 0, wide ? -0.05 : -0.42, 0);   // leave room for the info card
    };
    resize(); addEventListener('resize', resize);
    let visible = false, raf = 0;
    const v = new THREE.Vector3();
    const frame = () => {
      raf = visible ? requestAnimationFrame(frame) : 0;
      if (!rot.drag) { rot.y += rot.vy; rot.vy += ((reduce || active ? 0 : 0.0025) - rot.vy) * 0.04; }
      grp.rotation.set(rot.x, rot.y, 0); grp.updateMatrixWorld();
      const w = stage.clientWidth, h = stage.clientHeight;
      nodes.forEach((n) => {
        v.copy(n.pos).applyMatrix4(grp.matrixWorld); const depth = v.z; v.project(cam);
        const x = (v.x + 1) / 2 * w, y = (1 - v.y) / 2 * h, s = 0.72 + 0.32 * (depth + 1.3) / 2.6;
        n.el.style.transform = `translate(${(x + (n.hub ? 14 : 9)).toFixed(1)}px, ${(y - 11).toFixed(1)}px) scale(${s.toFixed(3)})`;
        n.el.style.opacity = (0.35 + 0.65 * Math.min(1, Math.max(0, (depth + 1.4) / 2.6))).toFixed(2);
        n.el.style.zIndex = Math.round(100 + depth * 50);
      });
      r.render(scene, cam);
    };
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) frame(); }).observe(stage);
  })();

  /* ---------------- contact bunny: greets, follows the pointer, hops when you copy the email ---------------- */
  (() => {
    const cv = document.getElementById('cbunny'), d = field.bunnyData, sec = document.getElementById('contact');
    if (!window.THREE || !cv || !d) return;
    const M = Math.min(5200, d.bunny.length / 3);
    const r = new THREE.WebGLRenderer({ canvas: cv, antialias: false, alpha: true });
    r.setPixelRatio(Math.min(devicePixelRatio, 2));
    const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(30, 1, 0.1, 20); cam.position.set(0, 0.15, 5.6);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(d.bunny.slice(0, M * 3), 3));
    g.setAttribute('aNorm', new THREE.BufferAttribute(d.bnorm.slice(0, M * 3), 3));
    g.setAttribute('aEar', new THREE.BufferAttribute(d.bear.slice(0, M * 2), 2));
    g.setAttribute('aBCol', new THREE.BufferAttribute(d.bcol.slice(0, M * 3), 3));
    const rr = new Float32Array(M); for (let i = 0; i < M; i++) rr[i] = Math.random(); g.setAttribute('aRand', new THREE.BufferAttribute(rr, 1));
    const u = { uEarL: { value: 0 }, uEarR: { value: 0 }, uPR: { value: r.getPixelRatio() } };
    const mat = new THREE.ShaderMaterial({ uniforms: u, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `uniform float uEarL, uEarR, uPR; attribute vec3 aNorm, aBCol; attribute vec2 aEar; attribute float aRand; varying vec3 vC; varying float vA;
        void main() {
          vec3 q = position;
          if (aEar.x != 0.0) {
            vec3 pivot = vec3(aEar.x * 0.36, 0.26, -0.06);
            float ang = -aEar.x * (aEar.x < 0.0 ? uEarL : uEarR) * (0.55 + 0.95 * aEar.y);
            vec3 v = q - pivot; float c = cos(ang), s = sin(ang); v.xy = vec2(v.x * c - v.y * s, v.x * s + v.y * c); q = pivot + v;
          }
          vec4 mv = modelViewMatrix * vec4(q, 1.0); gl_Position = projectionMatrix * mv;
          gl_PointSize = 15.0 * uPR * (0.4 + aRand * 0.8) / -mv.z;
          vec3 n = normalize(mat3(modelMatrix) * aNorm);
          float light = 0.32 + 0.68 * max(dot(n, normalize(vec3(-0.45, 0.65, 0.75))), 0.0) + 0.25 * pow(1.0 - max(n.z, 0.0), 3.0);
          vC = aBCol * light; vA = (0.35 + 0.65 * aRand) * (0.3 + 0.7 * smoothstep(-6.8, -4.8, mv.z));
        }`,
      fragmentShader: `varying vec3 vC; varying float vA; void main() { float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard; gl_FragColor = vec4(vC, smoothstep(0.5, 0.05, d) * vA); }` });
    const pts = new THREE.Points(g, mat); scene.add(pts);
    const resize = () => { r.setSize(cv.clientWidth, cv.clientHeight, false); cam.aspect = cv.clientWidth / cv.clientHeight; cam.updateProjectionMatrix(); };
    resize(); addEventListener('resize', resize);
    const look = { x: 0, y: 0, tx: 0, ty: 0 }, hop = { y: 0 }, ears = { l: 0, r: 0 };
    let focusEl = null;
    const aim = (px, py) => { const b = cv.getBoundingClientRect(), cx = b.left + b.width / 2, cy = b.top + b.height / 2;
      look.tx = Math.max(-0.8, Math.min(0.8, (px - cx) / 380)); look.ty = Math.max(-0.35, Math.min(0.45, (py - cy) / 420)); };
    sec.addEventListener('pointermove', (e) => { if (!focusEl) aim(e.clientX, e.clientY); });
    sec.addEventListener('pointerleave', () => { if (!focusEl) { look.tx = 0; look.ty = 0; } });
    // a greeting: one ear waves a few times
    const wave = (side = 'r', n = 3) => { if (reduce) return; gsap.timeline().to(ears, { [side]: 0.75, duration: 0.16, ease: 'power2.out', yoyo: true, repeat: n * 2 - 1 }).to(ears, { [side]: 0, duration: 0.2 }); };
    const bounce = (h = 0.22) => { if (reduce) return; gsap.timeline().to(hop, { y: h, duration: 0.18, ease: 'power2.out' }).to(hop, { y: 0, duration: 0.42, ease: 'bounce.out' }); };
    // looking at whatever the visitor is about to click
    sec.querySelectorAll('.mag .btn, #email').forEach((el) => {
      const on = () => { focusEl = el; const b = el.getBoundingClientRect(); aim(b.left + b.width / 2, b.top + b.height / 2); gsap.to(ears, { l: -0.12, r: -0.12, duration: 0.25 }); bounce(0.1); };
      const off = () => { focusEl = null; gsap.to(ears, { l: 0, r: 0, duration: 0.35 }); };
      el.addEventListener('pointerenter', on); el.addEventListener('focus', on); el.addEventListener('pointerleave', off); el.addEventListener('blur', off);
    });
    document.getElementById('copy').addEventListener('click', () => { bounce(0.3); gsap.delayedCall(0.3, () => bounce(0.18)); wave('l', 2); wave('r', 2); });
    let visible = false, raf = 0, greeted = false, idle = null;
    const frame = () => {
      raf = visible ? requestAnimationFrame(frame) : 0;
      look.x += (look.tx - look.x) * 0.08; look.y += (look.ty - look.y) * 0.08;
      pts.rotation.y = look.x; pts.rotation.x = look.y; pts.position.y = hop.y;
      u.uEarL.value = ears.l; u.uEarR.value = ears.r;
      r.render(scene, cam);
    };
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) frame();
      if (visible && !greeted) { greeted = true; gsap.delayedCall(0.4, () => { bounce(0.16); wave('r', 3); }); }
      clearInterval(idle); if (visible) idle = setInterval(() => wave(Math.random() < 0.5 ? 'l' : 'r', 2), 5200);
    }, { threshold: 0.4 }).observe(cv);
  })();

  /* ---------------- smooth scroll ---------------- */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: 0.07, wheelMultiplier: 0.8, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
    lenis.stop();
    document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
      const el = document.querySelector(a.getAttribute('href')); if (!el) return; e.preventDefault(); lenis.scrollTo(el, { offset: -60 });
    }));
  }
  const nav = document.getElementById('nav');
  addEventListener('scroll', () => nav.classList.toggle('is-solid', scrollY > innerHeight * 0.5), { passive: true });

  /* ---------------- returning visit: skip the loader and the gate ---------------- */
  // Once the gate has been passed in this tab, coming back from another page of the site (the Back button,
  // or a link such as Home) goes straight to the page. The sound choice is kept for the first tap.
  const session = { get(k) { try { return sessionStorage.getItem(k); } catch { return null; } }, set(k, v) { try { sessionStorage.setItem(k, v); } catch {} } };
  const navType = (performance.getEntriesByType('navigation')[0] || {}).type;
  const fromSite = (() => { try { return new URL(document.referrer).origin === location.origin; } catch { return false; } })();
  const choice = session.get('bt-gate');
  const returning = !!choice && (navType === 'back_forward' || fromSite);
  addEventListener('pagehide', () => session.set('bt-y', String(Math.round(scrollY))));

  /* ---------------- loader and sound gate: a spiral galaxy around a black hole, under twinkling stars ---------------- */
  // it forms while the counter runs, turns slowly behind the sound choice, and swallows the view on enter
  const voidScene = (() => {
    const api = { progress() {}, mood() {}, toGate() {}, collapse(done) { done(); } };
    const cv = document.getElementById('void');
    if (!window.THREE || !cv || returning) return api;
    const r = new THREE.WebGLRenderer({ canvas: cv, antialias: false, alpha: false });
    r.setPixelRatio(Math.min(devicePixelRatio, 2)); r.setClearColor(0x0e0f13, 1);
    const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(42, 1, 0.05, 100); cam.position.set(0, 0, 7);
    const small = innerWidth < 700, PR = r.getPixelRatio();
    const u = { uTime: { value: 0 }, uSpin: { value: 0 }, uForm: { value: 0 }, uPull: { value: 0 }, uLevel: { value: 0 }, uCalm: { value: 0 }, uPR: { value: PR } };
    const pointsMat = (vs, fs) => new THREE.ShaderMaterial({ uniforms: u, vertexShader: vs, fragmentShader: fs, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });

    // the disc: three spiral arms, a hot inner ring that orbits fast, and a cooler blue outskirts
    const G = small ? 9000 : 22000, gp = new Float32Array(G * 3), ga = new Float32Array(G * 4);
    for (let i = 0; i < G; i++) {
      const inner = i < G * 0.22;
      const rad = inner ? 0.42 + Math.pow(Math.random(), 1.6) * 0.55 : 0.6 + Math.pow(Math.random(), 0.9) * 3.4;
      const arm = Math.floor(Math.random() * 3), spread = (Math.random() - 0.5) * (inner ? 6.3 : 0.55 + rad * 0.12);
      const ang = inner ? Math.random() * 6.283 : arm * 2.094 + rad * 1.9 + spread;
      const thick = (Math.random() - 0.5) * (inner ? 0.025 : 0.06 + rad * 0.05);
      gp.set([rad, ang, thick], i * 3);
      ga.set([Math.random(), inner ? 1 : 0, Math.random(), Math.random()], i * 4);
    }
    const gg = new THREE.BufferGeometry();
    gg.setAttribute('position', new THREE.BufferAttribute(gp, 3)); gg.setAttribute('aInfo', new THREE.BufferAttribute(ga, 4));
    const disc = new THREE.Points(gg, pointsMat(`
      uniform float uTime, uSpin, uForm, uPull, uLevel, uCalm, uPR; attribute vec4 aInfo; varying vec3 vC; varying float vA;
      void main() {
        float rad = position.x, inner = aInfo.y;
        // inner orbits are faster; everything spirals in from far away while loading, and falls in at the end
        float form = clamp(uForm * 1.25 - aInfo.x * 0.25, 0.0, 1.0);
        float rr = rad * mix(3.2, 1.0, form * form * (3.0 - 2.0 * form)) * (1.0 - uPull * (0.92 + aInfo.z * 0.08));
        float speed = 0.55 / pow(rad + 0.15, 1.35) * (1.0 + uPull * 6.0);
        float ang = position.y + uSpin * speed + (1.0 - form) * 2.5;
        // with sound the disc ripples outward like a speaker; silent mode lets it settle flat
        float wave = sin(rad * 7.0 - uTime * 5.0) * 0.07 * uLevel * (1.0 - uPull) * smoothstep(0.4, 1.2, rad);
        vec3 p = vec3(cos(ang) * rr, position.z * (1.0 - uPull) * (1.0 - uCalm * 0.7) + wave, sin(ang) * rr);
        vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv;
        gl_PointSize = (inner > 0.5 ? 24.0 : 18.0) * uPR * (0.5 + aInfo.w * 0.9) / -mv.z;
        vec3 hot = vec3(1.0, 0.86, 0.78), pink = vec3(1.0, 0.61, 0.76), blue = vec3(0.56, 0.7, 1.0);
        vC = inner > 0.5 ? mix(vec3(1.0, 0.95, 0.9), pink, aInfo.z * 0.6) : mix(mix(hot, blue, smoothstep(0.6, 3.0, rad)), pink, step(0.9, aInfo.z) * 0.8);
        float flicker = 0.75 + 0.25 * sin(uTime * (2.0 + aInfo.w * 4.0) + aInfo.z * 40.0);
        vA = (inner > 0.5 ? 0.85 : 0.5) * mix(flicker, 0.9, uCalm) * (0.15 + 0.85 * form) * (1.0 - smoothstep(0.75, 1.0, uPull)) * (1.0 - uCalm * 0.35) * (1.0 + uLevel * 0.25);
      }`, `varying vec3 vC; varying float vA;
      void main() { float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard; gl_FragColor = vec4(vC, smoothstep(0.5, 0.0, d) * vA); }`));
    const tilt = new THREE.Group(); tilt.rotation.set(0.36, 0, -0.18); tilt.add(disc); scene.add(tilt);

    // the event horizon and its photon ring always face the viewer; the ring also bends the far side of the disc over the top
    const ringMat = new THREE.ShaderMaterial({ uniforms: u, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `uniform float uTime, uForm, uPull, uLevel, uCalm; varying vec2 vUv;
        void main() {
          vec2 c = vUv - 0.5; float d = length(c) * 2.0, a = atan(c.y, c.x);
          float ring = exp(-pow((d - 0.38) / 0.035, 2.0)) * mix(0.75 + 0.25 * sin(a * 3.0 - uTime * 2.2), 0.8, uCalm);
          // sound waves leave the horizon as thin expanding rings
          float waves = 0.0;
          for (int k = 0; k < 3; k++) { float ph = fract(uTime * 0.45 + float(k) / 3.0); waves += exp(-pow((d - (0.42 + ph * 0.55)) / 0.012, 2.0)) * (1.0 - ph); }
          float halo = exp(-pow((d - 0.42) / 0.16, 2.0)) * 0.22;
          float lens = exp(-pow((d - 0.5) / 0.07, 2.0)) * smoothstep(-0.1, 0.6, sin(a)) * 0.35;
          vec3 col = mix(vec3(1.0, 0.8, 0.86), vec3(0.75, 0.82, 1.0), 0.5 + 0.5 * sin(a + uTime * 0.6));
          float k = (ring + halo + lens + waves * uLevel * 0.9) * smoothstep(0.0, 0.6, uForm) * (1.0 + uPull * 1.5 + uLevel * 0.3) * (1.0 - uCalm * 0.3);
          gl_FragColor = vec4(col * k, k);
        }` });
    const ring = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 2.4), ringMat); scene.add(ring);
    const hole = new THREE.Mesh(new THREE.CircleGeometry(0.43, 64), new THREE.MeshBasicMaterial({ color: 0x050507 }));
    hole.position.z = 0.01; scene.add(hole);

    // background stars; the brightest ones sparkle with four soft rays
    const S = small ? 700 : 1600, sp = new Float32Array(S * 3), sa = new Float32Array(S * 3);
    for (let i = 0; i < S; i++) {
      const v = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(14 + Math.random() * 20);
      sp.set(v.toArray(), i * 3); sa.set([Math.random(), Math.random(), Math.random() < 0.07 ? 1 : 0], i * 3);
    }
    const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.BufferAttribute(sp, 3)); sg.setAttribute('aInfo', new THREE.BufferAttribute(sa, 3));
    const stars = new THREE.Points(sg, pointsMat(`
      uniform float uTime, uPR, uPull; attribute vec3 aInfo; varying float vA, vBig; varying vec3 vC;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
        float tw = pow(0.5 + 0.5 * sin(uTime * (0.8 + aInfo.x * 2.6) + aInfo.y * 60.0), 3.0);
        vBig = aInfo.z;
        gl_PointSize = (aInfo.z > 0.5 ? 26.0 : 2.0 + aInfo.x * 3.2) * uPR * (0.6 + 0.6 * tw);   // fixed pixel size, so far stars stay visible
        vA = (0.25 + 0.75 * tw) * (aInfo.z > 0.5 ? 1.0 : 0.7) * (1.0 - uPull * 0.6);
        vC = mix(vec3(0.95, 0.94, 1.0), aInfo.y > 0.8 ? vec3(1.0, 0.75, 0.86) : vec3(0.72, 0.8, 1.0), step(0.6, aInfo.y));
      }`, `varying float vA, vBig; varying vec3 vC;
      void main() {
        vec2 c = gl_PointCoord - 0.5; float d = length(c);
        float core = vBig > 0.5 ? exp(-d * d * 160.0) : smoothstep(0.5, 0.1, d);
        float rays = vBig > 0.5 ? (exp(-abs(c.x) * 60.0) * exp(-abs(c.y) * 7.0) + exp(-abs(c.y) * 60.0) * exp(-abs(c.x) * 7.0)) * 0.8 : 0.0;
        float k = (core + rays) * vA; if (k < 0.004) discard;
        gl_FragColor = vec4(vC * k, k);
      }`));
    scene.add(stars);

    const resize = () => { r.setSize(innerWidth, innerHeight, false); cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix(); const s = Math.min(1, cam.aspect * 1.15); tilt.scale.setScalar(s); ring.scale.setScalar(s); hole.scale.setScalar(s); };
    resize(); addEventListener('resize', resize);
    const m = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => { m.tx = e.clientX / innerWidth - 0.5; m.ty = e.clientY / innerHeight - 0.5; };
    addEventListener('pointermove', onMove);
    let raf = 0, last = 0; const clock = new THREE.Clock();
    const mood = { level: 0, calm: 0 };
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const t = clock.getElapsedTime(), dt = Math.min(0.05, t - last); last = t; u.uTime.value = reduce ? 4 : t;
      u.uLevel.value += (mood.level - u.uLevel.value) * 0.05; u.uCalm.value += (mood.calm - u.uCalm.value) * 0.05;
      if (!reduce) u.uSpin.value += dt * (1 + u.uLevel.value * 1.2 - u.uCalm.value * 0.65) * (1 + u.uPull.value * 2);
      m.x += (m.tx - m.x) * 0.04; m.y += (m.ty - m.y) * 0.04;
      cam.position.x = m.x * 0.6; cam.position.y = -m.y * 0.4; cam.lookAt(0, 0, 0);
      ring.quaternion.copy(cam.quaternion); hole.quaternion.copy(cam.quaternion);
      stars.rotation.y = t * 0.004;
      r.render(scene, cam);
    };
    frame();
    const dispose = () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); removeEventListener('pointermove', onMove); [gg, sg].forEach((g) => g.dispose()); r.dispose(); };
    api.progress = (k) => { u.uForm.value = reduce ? 1 : k; };
    api.mood = (level, calm) => { mood.level = level; mood.calm = calm; };
    api.toGate = () => { if (!reduce) gsap.to(tilt.rotation, { x: 0.58, z: -0.08, duration: 3.2, ease: 'power2.inOut' }); };
    // at the end everything spirals into the hole and the camera falls through it
    api.collapse = (done) => {
      if (reduce) { done(); dispose(); return; }
      gsap.timeline({ onComplete: () => { done(); dispose(); } })
        .to(u.uPull, { value: 1, duration: 1.2, ease: 'power3.in' })
        .to(cam.position, { z: 0.6, duration: 0.9, ease: 'power3.in' }, 0.55)
        .to(hole.scale, { x: 1.4, y: 1.4, z: 1.4, duration: 0.9, ease: 'power3.in' }, 0.55);
    };
    return api;
  })();

  /* ---------------- loader ---------------- */
  const num = document.getElementById('loader-num'), bar = document.getElementById('loader-bar'), c = { v: 0 };
  if (returning) loader.classList.add('is-gone');
  else gsap.to(c, { v: 100, duration: reduce ? 0.3 : 3.2, ease: 'power2.inOut',
    onUpdate: () => { num.textContent = Math.round(c.v); bar.style.width = c.v + '%'; voidScene.progress(c.v / 100); },
    onComplete: () => {
      gsap.to('.loader-ui', { opacity: 0, duration: reduce ? 0 : 0.5 });
      voidScene.toGate();
      showGate();
    } });
  function showGate() {
    gate.classList.remove('is-gone');
    gsap.fromTo('.gate-top > *, .gate-bottom > *', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.07, delay: 0.3 });
    if (field.uniforms) gsap.to(field.uniforms.uIntro, { value: 0.35, duration: 2, ease: 'power2.out' });
    document.getElementById('enter-sound').focus({ preventScroll: true });
  }

  /* ---------------- story chapters ---------------- */
  const chapters = gsap.utils.toArray('.chapter');
  const words = chapters.map((ch) => [...ch.querySelectorAll('.w')]);
  const chapNum = document.getElementById('chap-num'), chapBar = document.getElementById('chap-bar');
  let current = -1;
  // the Hello above the welcome line springs out one letter at a time
  const hello = chapters[0].querySelector('.kicker');
  hello.innerHTML = [...hello.textContent].map((ch) => `<span class="pop">${ch}</span>`).join('');
  hello.setAttribute('aria-label', hello.textContent);
  const pops = hello.querySelectorAll('.pop');
  gsap.set(pops, { opacity: 0 });
  function popHello() {
    if (reduce) { gsap.set(pops, { opacity: 1 }); return; }
    gsap.fromTo(pops, { opacity: 0, y: 18, scale: 0.2, rotation: () => gsap.utils.random(-25, 25) },
      { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(3.2)', stagger: 0.07, overwrite: true });
  }
  function setChapter(i) {
    if (i === current) return;
    if (i === 0 && current > 0) popHello();
    current = i; chime();
    chapters.forEach((ch, k) => ch.classList.toggle('is-on', k === i));
    chapNum.textContent = (i + 1) + ' / ' + chapters.length;
    document.getElementById('hint-text').textContent = i === 0 && fine ? 'Hover or drag the bunny · Scroll to continue' : 'Scroll to continue';
  }
  function renderStory(p) {
    const n = chapters.length, x = p * n, i = Math.min(n - 1, Math.floor(x)), local = x - i;
    setChapter(i);
    // words light up as the reader scrolls: the short welcome line over half its chapter, the rest over 70%
    const lit = Math.round(Math.min(1, local / (i === 0 ? 0.5 : 0.7)) * words[i].length);
    words[i].forEach((w, k) => w.classList.toggle('lit', k < lit));
    if (field.uniforms) {
      const c = (v) => Math.max(0, Math.min(1, v));
      // bunny, portrait, then the interface: assembled > layers apart > tested, then bug > check, then the aperture
      const m = [0, c(local / 0.75), 1 + c(local / 0.3) + c((local - 0.34) / 0.22) + c((local - 0.64) / 0.24), 4 + c(local / 0.45) + c((local - 0.52) / 0.4), 6 + c(local / 0.7)][i];
      field.morphTarget = m;   // the field eases toward this, so a quick scroll still plays out slowly
    }
    chapBar.style.width = (p * 100).toFixed(1) + '%';
  }
  renderStory(0);
  words[0].forEach((w) => w.classList.remove('lit'));

  // the two buttons set the galaxy's mood; choosing one sends the view through the black hole
  const stateEl = document.getElementById('gate-state');
  const moods = [['enter-sound', 1, 0, 'Ambient sound on'], ['enter-quiet', 0, 1, 'Silent mode']];
  moods.forEach(([id, level, calm, label]) => {
    const el = document.getElementById(id);
    const on = () => { voidScene.mood(level, calm); stateEl.textContent = label; }, off = () => { voidScene.mood(0, 0); stateEl.textContent = ''; };
    el.addEventListener('pointerenter', on); el.addEventListener('focus', on); el.addEventListener('pointerleave', off); el.addEventListener('blur', off);
  });
  let entered = false;
  function enter(withSound, instant) {
    if (entered) return; entered = true;
    session.set('bt-gate', withSound ? 'sound' : 'quiet');
    if (withSound) startAudio();
    if (!instant) {
      gsap.to('.gate-inner', { opacity: 0, duration: 0.35 });
      voidScene.collapse(() => {
        gate.classList.add('is-gone');
        gsap.to(loader, { opacity: 0, duration: reduce ? 0 : 0.6, onComplete: () => loader.classList.add('is-gone') });
      });
    }
    gsap.delayedCall(reduce || instant ? 0 : 1.9, popHello);
    window.scrollTo(0, 0); if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    document.body.classList.remove('locked'); if (lenis) lenis.start();
    if (field.uniforms) gsap.to(field.uniforms.uIntro, { value: 1, duration: reduce ? 0 : 2.4, ease: 'expo.out', delay: reduce || instant ? 0 : 1.3 });
    ScrollTrigger.create({ trigger: '#story', start: 'top top', end: 'bottom bottom', scrub: true, onUpdate: (s) => renderStory(s.progress) });
    ScrollTrigger.create({ trigger: '.solid', start: 'top 80%', end: 'top 10%', scrub: true,
      onUpdate: (s) => { if (field.uniforms) field.uniforms.uFade.value = s.progress; } });
    ScrollTrigger.refresh();
  }
  document.getElementById('enter-sound').addEventListener('click', () => enter(true));
  document.getElementById('enter-quiet').addEventListener('click', () => enter(false));

  /* ---------------- terminal typing ---------------- */
  const typed = document.getElementById('typed');
  if (!reduce) {
    const full = 'how are you doing, mate?'; let n = 0, timer;
    const run = () => { n = 0; clearInterval(timer); timer = setInterval(() => { typed.textContent = full.slice(0, ++n); if (n >= full.length) { clearInterval(timer); setTimeout(run, 4000); } }, 70); };
    ScrollTrigger.create({ trigger: '.term', start: 'top 85%', once: true, onEnter: run });
  }


  /* ---------------- lens sounds (only while sound is on) ---------------- */
  let noiseBuf = null;
  function noise() {
    if (!audio.ctx) return null;
    if (!noiseBuf) { noiseBuf = audio.ctx.createBuffer(1, audio.ctx.sampleRate, audio.ctx.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
    return noiseBuf;
  }
  function lensClick() {
    if (!audio.on || !noise()) return;
    const now = audio.ctx.currentTime, src = audio.ctx.createBufferSource(), bp = audio.ctx.createBiquadFilter(), g = audio.ctx.createGain();
    src.buffer = noiseBuf; bp.type = 'bandpass'; bp.frequency.value = 2600; bp.Q.value = 6;
    g.gain.setValueAtTime(0.0001, now); g.gain.exponentialRampToValueAtTime(0.5, now + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
    src.connect(bp); bp.connect(g); g.connect(audio.ctx.destination); src.start(now, Math.random() * 0.5); src.stop(now + 0.06);
  }
  let friction = null;
  function frictionLevel(v) {
    if (!audio.on || !noise()) { if (friction) friction.g.gain.value = 0; return; }
    if (!friction) {
      const src = audio.ctx.createBufferSource(), f = audio.ctx.createBiquadFilter(), g = audio.ctx.createGain();
      src.buffer = noiseBuf; src.loop = true; f.type = 'bandpass'; f.frequency.value = 900; f.Q.value = 0.8; g.gain.value = 0;
      src.connect(f); f.connect(g); g.connect(audio.ctx.destination); src.start(); friction = { g };
    }
    friction.g.gain.setTargetAtTime(Math.min(0.08, v * 0.9), audio.ctx.currentTime, 0.05);
  }
  function whoosh() {
    if (!audio.on || !noise()) return;
    const now = audio.ctx.currentTime, src = audio.ctx.createBufferSource(), f = audio.ctx.createBiquadFilter(), g = audio.ctx.createGain();
    src.buffer = noiseBuf; f.type = 'lowpass'; f.frequency.setValueAtTime(300, now); f.frequency.exponentialRampToValueAtTime(4000, now + 0.7);
    g.gain.setValueAtTime(0.0001, now); g.gain.exponentialRampToValueAtTime(0.18, now + 0.3); g.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);
    src.connect(f); f.connect(g); g.connect(audio.ctx.destination); src.start(now); src.stop(now + 1.05);
  }

  /* ---------------- inline lens gallery: each project opens its own page ---------------- */
  const PROJECTS = JSON.parse(document.getElementById('projects-data').textContent);
  const IMGS = [...document.querySelectorAll('#work .teaser-card img')].map((i) => i.src);
  const lensCanvas = document.getElementById('lens');
  const lensTitle = document.getElementById('lens-title'), lensSub = document.getElementById('lens-sub'), lensCount = document.getElementById('lens-count');
  const N = PROJECTS.length, pad = (n) => String(n).padStart(2, '0');
  let lens = null;

  if (window.THREE && !reduce) {
    root.classList.add('js-lens');
    const renderer = new THREE.WebGLRenderer({ canvas: lensCanvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.setClearColor(0x0e0f13, 1);
    const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 5);
    const loader = new THREE.TextureLoader();
    const W = 1.9, H = 1.19, GAP = 0.32, STEP = W + GAP, TOTAL = STEP * N;
    const geo = new THREE.PlaneGeometry(W, H, 48, 24);
    const meshes = PROJECTS.map((p, i) => {
      const tex = loader.load(IMGS[i]); tex.minFilter = THREE.LinearFilter;
      const mat = new THREE.ShaderMaterial({
        transparent: true,
        uniforms: { uTex: { value: tex }, uVel: { value: 0 }, uCurve: { value: 1 }, uAlpha: { value: 1 }, uHover: { value: 0 }, uImgAspect: { value: 16 / 10 }, uPlaneAspect: { value: W / H } },
        vertexShader: `
          uniform float uVel, uCurve; varying vec2 vUv; varying float vEdge;
          void main() {
            vUv = uv;
            vec4 world = modelMatrix * vec4(position, 1.0);
            float x = world.x;
            world.z -= (x * x) * 0.16 * uCurve;
            world.y *= 1.0 + abs(x) * 0.06 * uCurve;
            world.z -= sin(uv.x * 3.14159) * uVel * 1.4;
            vEdge = clamp(abs(x) / 3.2, 0.0, 1.0) * uCurve;
            gl_Position = projectionMatrix * viewMatrix * world;
          }`,
        fragmentShader: `
          uniform sampler2D uTex; uniform float uVel, uAlpha, uHover, uImgAspect, uPlaneAspect; varying vec2 vUv; varying float vEdge;
          void main() {
            vec2 uv = vUv;
            float s = uPlaneAspect / uImgAspect;
            if (s < 1.0) uv.x = (uv.x - 0.5) * s + 0.5; else uv.y = 1.0 - (1.0 - uv.y) / s;
            float shift = uVel * 0.06;
            vec3 col = vec3(texture2D(uTex, uv + vec2(shift, 0.0)).r, texture2D(uTex, uv).g, texture2D(uTex, uv - vec2(shift, 0.0)).b);
            float lum = dot(col, vec3(0.299, 0.587, 0.114));
            col = mix(col, vec3(lum), vEdge * 0.75);
            col *= 1.0 - vEdge * 0.55 + uHover * 0.08;
            gl_FragColor = vec4(col, uAlpha);
          }`,
      });
      const img = new Image(); img.onload = () => { mat.uniforms.uImgAspect.value = img.width / img.height; }; img.src = IMGS[i];
      const m = new THREE.Mesh(geo, mat); m.userData.i = i; scene.add(m); return m;
    });
    const state = { off: 0, scrollBase: 0, drag: 0, dragging: false, lastX: 0, moved: 0, vel: 0, hover: -1, center: -1, open: false, visible: false };
    const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
    const size = () => { const w = innerWidth, h = innerHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.position.z = w < 700 ? 6.8 : 5; camera.updateProjectionMatrix(); };
    addEventListener('resize', size); size();
    const wrapX = (x) => ((x % TOTAL) + TOTAL * 1.5) % TOTAL - TOTAL / 2;
    const layout = () => meshes.forEach((m, i) => { if (!m.userData.locked) { m.position.x = wrapX(i * STEP - state.off); m.position.y = -0.05; } });
    const nearest = () => { let best = 0, bd = 1e9; meshes.forEach((m, i) => { const d = Math.abs(wrapX(i * STEP - state.off)); if (d < bd) { bd = d; best = i; } }); return best; };
    const settle = () => { const t = state.scrollBase + state.drag; state.drag += Math.round(t / STEP) * STEP - t; };
    function setCenter(i) {
      if (i === state.center) return; state.center = i; lensClick();
      lensTitle.textContent = PROJECTS[i].title; lensSub.textContent = PROJECTS[i].type + ' · ' + PROJECTS[i].year; lensCount.textContent = pad(i + 1) + ' / ' + pad(N);
    }
    const toLocal = (e) => { const r = lensCanvas.getBoundingClientRect(); ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); };
    const pick = () => { ray.setFromCamera(ptr, camera); const hit = ray.intersectObjects(meshes)[0]; return hit ? hit.object.userData.i : -1; };

    // scrolling through the pinned section turns the lens through every project
    ScrollTrigger.create({ trigger: '#work', start: 'top top', end: 'bottom bottom', scrub: true,
      onUpdate: (s) => { state.scrollBase = s.progress * (N - 1) * STEP; clearTimeout(state.snapT); state.snapT = setTimeout(settle, 220); } });
    ScrollTrigger.create({ trigger: '#work', start: 'top bottom', end: 'bottom top', onToggle: (s) => { state.visible = s.isActive; if (s.isActive) loop(); else frictionLevel(0); } });

    lensCanvas.addEventListener('pointerdown', (e) => { if (state.open) return; state.dragging = true; state.lastX = e.clientX; state.moved = 0; lensCanvas.setPointerCapture(e.pointerId); lensCanvas.classList.add('dragging'); });
    lensCanvas.addEventListener('pointermove', (e) => {
      toLocal(e);
      if (state.dragging) { const dx = e.clientX - state.lastX; state.lastX = e.clientX; state.moved += Math.abs(dx); state.drag -= dx * (TOTAL / innerWidth) * 0.55; }
      else { state.hover = pick(); lensCanvas.style.cursor = state.hover >= 0 ? 'pointer' : 'grab'; }
    });
    const release = (e) => {
      if (!state.dragging) return; state.dragging = false; lensCanvas.classList.remove('dragging');
      if (state.moved < 6) { toLocal(e); const i = pick(); if (i >= 0) { openProject(i, true); return; } }
      settle();
    };
    lensCanvas.addEventListener('pointerup', release); lensCanvas.addEventListener('pointercancel', release);
    lensCanvas.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { state.drag += STEP; e.preventDefault(); }
      if (e.key === 'ArrowLeft') { state.drag -= STEP; e.preventDefault(); }
      if (e.key === 'Enter') openProject(state.center, true);
    });
    function loop() {
      if (!state.visible && !state.open) return; requestAnimationFrame(loop);
      const prev = state.off; state.off += (state.scrollBase + state.drag - state.off) * 0.09; state.vel = state.off - prev;
      const v = gsap.utils.clamp(-0.6, 0.6, state.vel * 2.2);
      meshes.forEach((m) => { m.material.uniforms.uVel.value += (v - m.material.uniforms.uVel.value) * 0.2; m.material.uniforms.uHover.value += ((m.userData.i === state.hover ? 1 : 0) - m.material.uniforms.uHover.value) * 0.15; });
      frictionLevel(state.open ? 0 : Math.abs(state.vel));
      layout(); if (!state.open) setCenter(nearest());
      renderer.render(scene, camera);
    }
    lens = {
      dive(i, done) {
        state.open = true; loop(); const m = meshes[i]; m.userData.locked = true;
        gsap.to('.lens-top, .lens-bottom', { opacity: 0, duration: 0.3 });
        const dist = camera.position.z - 0.6, vh = 2 * Math.tan((camera.fov * Math.PI) / 360) * dist, vw = vh * camera.aspect;
        const sc = Math.max(vw / W, vh / H) * 1.02;
        meshes.forEach((o) => { if (o !== m) { gsap.to(o.position, { z: -3, duration: 0.9, ease: 'power3.in' }); gsap.to(o.material.uniforms.uAlpha, { value: 0, duration: 0.7 }); } });
        gsap.timeline({ onComplete: done })
          .to(m.material.uniforms.uCurve, { value: 0, duration: 0.5 }, 0)
          .fromTo(m.rotation, { y: m.position.x * -0.25 }, { y: 0, duration: 1.1, ease: 'power3.inOut' }, 0)
          .to(m.position, { x: 0, y: 0, z: 0.6, duration: 1.1, ease: 'power3.inOut' }, 0)
          .to(m.scale, { x: sc, y: sc, duration: 1.1, ease: 'power3.inOut' }, 0.05);
      },
      reset() {
        meshes.forEach((m) => { m.userData.locked = false; gsap.killTweensOf([m.position, m.scale, m.rotation, m.material.uniforms.uAlpha, m.material.uniforms.uCurve]); m.position.z = 0; m.scale.set(1, 1, 1); m.rotation.set(0, 0, 0); m.material.uniforms.uCurve.value = 1; m.material.uniforms.uAlpha.value = 1; });
        state.open = false; gsap.to('.lens-top, .lens-bottom', { opacity: 1, duration: 0.5 }); loop();
      },
    };
  }

  // each project has its own page: the lens dives into the chosen image, then the browser goes there
  function openProject(i, fromLens) {
    const go = () => { location.href = PROJECTS[i].url; };
    whoosh();
    if (fromLens && lens) lens.dive(i, go); else go();
  }
  // coming back with the browser's back button can restore the page mid dive, so put the gallery back
  addEventListener('pageshow', (e) => { if (e.persisted && lens) lens.reset(); });

  if (returning) {
    enter(false, true);
    session.set('bt-gate', choice);
    // browsers only start sound after a tap, so a visitor who chose sound gets it back on their first one
    if (choice === 'sound') {
      const resume = (e) => {
        removeEventListener('pointerdown', resume); removeEventListener('keydown', resume);
        if (!soundBtn.contains(e.target) && !audio.on) startAudio();
      };
      addEventListener('pointerdown', resume); addEventListener('keydown', resume);
    }
    // with the Back button, land where the visitor left off, usually the project gallery
    const y = navType === 'back_forward' ? Number(session.get('bt-y')) || 0 : 0;
    if (y) requestAnimationFrame(() => { ScrollTrigger.refresh(); window.scrollTo(0, y); if (lenis) lenis.scrollTo(y, { immediate: true, force: true }); });
  }

  if (reduce) return;
  /* ---------------- hover tilt, cursor, magnetic buttons ---------------- */
  if (fine) {
    document.querySelectorAll('[data-tilt]').forEach((el) => {
      el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; el.style.transform = `rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg)`; });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
    const ring = document.querySelector('.cursor');
    const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' }), ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
    addEventListener('pointermove', (e) => { rx(e.clientX); ry(e.clientY); });
    document.querySelectorAll('a, button, #lens').forEach((el) => { el.addEventListener('pointerenter', () => ring.classList.add('is-hover')); el.addEventListener('pointerleave', () => ring.classList.remove('is-hover')); });
    document.querySelectorAll('.mag').forEach((m) => {
      const qx = gsap.quickTo(m, 'x', { duration: 0.5, ease: 'elastic.out(1, 0.4)' }), qy = gsap.quickTo(m, 'y', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      m.addEventListener('pointermove', (e) => { const r = m.getBoundingClientRect(); qx((e.clientX - r.left - r.width / 2) * 0.35); qy((e.clientY - r.top - r.height / 2) * 0.35); });
      m.addEventListener('pointerleave', () => { qx(0); qy(0); });
    });
  }
})();

document.getElementById('copy').addEventListener('click', async (e) => {
  const btn = e.currentTarget;
  try { await navigator.clipboard.writeText(document.getElementById('email').textContent.trim()); btn.textContent = 'Email copied'; }
  catch { const r = document.createRange(); r.selectNodeContents(document.getElementById('email')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); btn.textContent = 'Email selected below'; }
  setTimeout(() => { btn.textContent = 'Copy email'; }, 2200);
});
