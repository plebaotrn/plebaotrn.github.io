// Behaviour for the Projects and Writing pages. Every page is fully readable without this script;
// it adds filters, the floating preview, tilt, parallax, search, the reading progress rule and copy link.
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const store = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch {} } };
  const press = (group, btn) => group.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
  const toast = (msg) => { const t = $('#toast'); if (!t) return; t.textContent = msg; t.classList.add('on'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('on'), 1800); };

  /* ---------------- projects index: type filter and Index / Grid view ---------------- */
  const index = $('#index'), grid = $('#grid');
  if (index && grid) {
    const filters = $$('[data-filter]'), views = $$('[data-view]');
    const apply = (type) => $$('[data-type]').forEach((el) => { el.hidden = type !== 'All' && el.dataset.type !== type; });
    filters.forEach((b) => b.addEventListener('click', () => { press(filters, b); apply(b.dataset.filter); }));
    const setView = (v) => { index.hidden = v !== 'list'; grid.hidden = v !== 'grid'; press(views, views.find((b) => b.dataset.view === v)); store.set('bt-view', v); };
    views.forEach((b) => b.addEventListener('click', () => setView(b.dataset.view)));
    setView(store.get('bt-view') === 'grid' ? 'grid' : 'list');

    // a preview card follows the cursor over the index and leans with its speed
    const prev = $('#preview'), img = $('#preview-img'), card = prev && prev.querySelector('.card');
    if (prev && fine && !reduce) {
      const pv = { x: 0, y: 0, tx: 0, ty: 0, vx: 0, raf: 0, active: false };
      const loop = () => {
        const nx = pv.x + (pv.tx - pv.x) * 0.16, ny = pv.y + (pv.ty - pv.y) * 0.16;
        pv.vx += ((nx - pv.x) - pv.vx) * 0.2; pv.x = nx; pv.y = ny;
        const w = prev.offsetWidth, h = prev.offsetHeight;
        const left = Math.min(innerWidth - w - 16, pv.x + 28), top = Math.max(76, Math.min(innerHeight - h - 16, pv.y - h / 2));
        prev.style.transform = `translate(${left}px, ${top}px)`;
        card.style.transform = `rotateY(${Math.max(-18, Math.min(18, pv.vx * 0.9))}deg) rotateZ(${Math.max(-6, Math.min(6, pv.vx * 0.25))}deg)`;
        pv.raf = pv.active || Math.abs(pv.vx) > 0.05 ? requestAnimationFrame(loop) : 0;
      };
      addEventListener('pointermove', (e) => { pv.tx = e.clientX; pv.ty = e.clientY; }, { passive: true });
      $$('.row', index).forEach((row) => {
        row.addEventListener('pointerenter', (e) => {
          if (!pv.raf) { pv.x = pv.tx = e.clientX; pv.y = pv.ty = e.clientY; }
          img.src = row.dataset.preview; prev.classList.add('on'); pv.active = true; if (!pv.raf) loop();
        });
        row.addEventListener('pointerleave', () => { prev.classList.remove('on'); pv.active = false; });
      });
    }
  }

  /* ---------------- tilt for grid cards ---------------- */
  if (fine && !reduce) {
    $$('[data-tilt]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg) translateY(-4px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------------- case file: hero parallax and the contents list ---------------- */
  const hero = $('#hero');
  if (hero) {
    const himg = hero.querySelector('img'), links = $$('[data-sec]');
    const secs = links.map((a) => document.getElementById('s-' + a.dataset.sec));
    links.forEach((a, i) => a.addEventListener('click', (e) => { e.preventDefault(); secs[i].scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); history.replaceState(null, '', a.getAttribute('href')); }));
    let ticking = false;
    const update = () => {
      ticking = false;
      if (!reduce) { const r = hero.getBoundingClientRect(); const k = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / innerHeight)); himg.style.transform = `translateY(${(-9 + k * 9).toFixed(2)}%)`; }
      let cur = 0; secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top < innerHeight * 0.4) cur = i; });
      links.forEach((a, i) => a.classList.toggle('on', i === cur));
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------------- writing: topic filter and search ---------------- */
  const ledger = $('#ledger');
  if (ledger) {
    const chips = $$('[data-tag]').filter((el) => el.tagName === 'BUTTON'), q = $('#q'), feature = $('#feature'), empty = $('#empty');
    const items = $$('li[data-tag]', ledger);
    let tag = 'All';
    const apply = () => {
      const text = q.value.trim().toLowerCase(), filtering = tag !== 'All' || text !== '';
      let shown = 0;
      items.forEach((li) => {
        const match = (tag === 'All' || li.dataset.tag === tag) && (!text || li.dataset.text.includes(text));
        // the latest article sits in the featured card; it joins the list only while filtering
        li.hidden = !match || (!filtering && li.classList.contains('is-featured'));
        if (match) shown++;
      });
      $$('.year', ledger).forEach((y) => { y.hidden = !$$('li', y).some((li) => !li.hidden); });
      if (feature) feature.hidden = filtering;
      empty.hidden = shown > 0;
    };
    chips.forEach((b) => b.addEventListener('click', () => { tag = b.dataset.tag; press(chips, b); apply(); }));
    q.addEventListener('input', apply);
    apply();
  }

  /* ---------------- featured cover: the article's own words as a field of dots ---------------- */
  const cv = $('#fx');
  if (cv) {
    const g = cv.getContext('2d'), dpr = Math.min(devicePixelRatio || 1, 2);
    const seed = [...cv.dataset.seed].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
    const words = (cv.dataset.words || '').split(' ').map((w) => w.replace(/[^\w']/g, '')).filter(Boolean);
    let s = seed; const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    let w = 0, h = 0, dots = [], spots = [], mx = -1e3, my = -1e3, raf = 0, visible = true;
    const size = () => {
      const r = cv.getBoundingClientRect(); w = r.width; h = r.height; cv.width = w * dpr; cv.height = h * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0);
      s = seed;
      dots = Array.from({ length: Math.round(w * h / 900) }, () => ({ x: rnd() * w, y: rnd() * h, r: 0.6 + rnd() * 1.4, c: rnd() < 0.12 ? '#ff9cc2' : rnd() < 0.3 ? '#8fb2ff' : '#f2f1ed', a: 0.25 + rnd() * 0.6, ox: 0, oy: 0 }));
      spots = words.map((wd) => ({ wd, x: rnd() * Math.max(10, w - 80), y: 18 + rnd() * Math.max(10, h - 40) }));
    };
    const frame = () => {
      g.clearRect(0, 0, w, h);
      g.font = '500 11px "IBM Plex Mono", monospace'; g.fillStyle = 'rgba(169,168,180,.22)';
      spots.forEach((p) => g.fillText(p.wd, p.x, p.y));
      dots.forEach((d) => {
        const dx = mx - d.x, dy = my - d.y, dist = Math.hypot(dx, dy), pull = dist < 140 ? (1 - dist / 140) * 14 : 0;
        d.ox += ((dist ? dx / dist : 0) * pull - d.ox) * 0.1; d.oy += ((dist ? dy / dist : 0) * pull - d.oy) * 0.1;
        g.globalAlpha = d.a; g.fillStyle = d.c; g.beginPath(); g.arc(d.x + d.ox, d.y + d.oy, d.r, 0, 6.283); g.fill();
      });
      g.globalAlpha = 1;
      raf = !reduce && visible ? requestAnimationFrame(frame) : 0;
    };
    size(); frame();
    addEventListener('resize', () => { size(); if (!raf) frame(); });
    cv.parentElement.addEventListener('pointermove', (e) => { const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
    cv.parentElement.addEventListener('pointerleave', () => { mx = my = -1e3; });
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) frame(); }).observe(cv);
  }

  /* ---------------- article: reading progress and copy link ---------------- */
  const prose = $('#prose'), bar = $('#progress');
  if (prose && bar) {
    const update = () => { const r = prose.getBoundingClientRect(); const k = Math.max(0, Math.min(1, (innerHeight * 0.35 - r.top) / (r.height - innerHeight * 0.3))); bar.style.transform = `scaleX(${k})`; };
    addEventListener('scroll', update, { passive: true }); addEventListener('resize', update); update();
  }
  const copy = $('#copy-link');
  if (copy) {
    copy.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(copy.dataset.url); toast('Link copied'); }
      catch { toast(copy.dataset.url); }
    });
  }
})();
