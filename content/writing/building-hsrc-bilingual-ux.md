---
title: "Building HSRC: designing for two languages and two audiences"
date: 2026-05-15
tag: Case study
summary: "Notes on designing a bilingual website for a Vietnamese research organisation, and how I built the five petal 3D lotus on the landing page with Three.js."
---
[HSRC](https://www.hsrc.vn/), the Human Sciences Research Centre, is a Vietnamese organisation working on something they call Wholebeing Science: an interdisciplinary approach to human flourishing that sits between psychology, philosophy, and education. When they approached me to design and build their website, the first challenge was figuring out who the site was actually for.

After talking with the HSRC team, two distinct audiences emerged: Vietnamese academics and researchers who already knew the organisation, and international partners, institutions, collaborators, and potential funders, who were encountering it for the first time. These two groups had very different mental models and different goals. The Vietnamese audience wanted depth; the international audience needed context. A single page structure couldn't serve both equally.

I designed two parallel navigation structures in Figma before building anything. The bilingual toggle isn't just a text swap, in several sections the Vietnamese and English versions present information in a different order because the cultural starting point is different. This meant every component had to be designed twice, with both languages reviewed against the brand voice before implementation.

The brand itself was a translation challenge. HSRC's visual identity is grounded in SPIRE, their core research framework, which has a specific symbolic geometry. I worked with the team to extract a set of design tokens: colours, type scales, and spacing values that felt true to the brand without being derivative. The result is a site that looks designed for HSRC, not just built on top of their logo.

## Building the 3D lotus

The part I enjoyed most was the landing page. The HSRC logo is a lotus with five petals, one for each part of SPIRE: Spiritual, Physical, Intellectual, Relational and Emotional. I wanted that lotus to come alive, so I rebuilt it in 3D with Three.js. As you scroll, the petals float apart, travel through the story, and come back together at the end.

![The 3D lotus on the HSRC landing page](images/projects/hsrc/lotus.png "The five SPIRE petals as a 3D lotus, floating over a night sky.")

### One petal shape, five colours

Every petal uses the same 3D shape. Only the colours change. I started from the designer's sketch of a petal, measured how wide it is at 60 points from the base to the tip, and saved those numbers in a list. Then I built the petal as a grid of points. Going up the grid moves from base to tip, and going across moves from one edge to the other. Here it is, slightly shortened:

```js
function buildPetalGeometry() {
  const SU = 90, SV = 48, pos = [], uv = [], idx = [];
  for (let i = 0; i <= SU; i++) {
    const u = i / SU;                       // 0 at the base, 1 at the tip
    const hw = halfW(u), mc = midLine(u), fl = foldLine(u);
    for (let j = 0; j <= SV; j++) {
      const v = j / SV * 2 - 1;             // -1 on one edge, 1 on the other
      const x = mc + v * hw, y = PB + u * PL;
      // cupped across, a soft ridge along the fold, tip lifting forward
      const z = 0.11 * hw * v * v
              + 0.018 * Math.tanh((v - fl) * 5) * Math.sin(Math.PI * u)
              + 0.05 * u * u * u;
      pos.push(x, y, z); uv.push((v + 1) / 2, u);
    }
  }
  // two triangles for every square in the grid
  for (let i = 0; i < SU; i++) for (let j = 0; j < SV; j++) {
    const a = i * (SV + 1) + j, b = a + SV + 1;
    idx.push(a, b, a + 1, b, b + 1, a + 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx); g.computeVertexNormals();
  return g;
}
```

The `x` and `y` lines draw the flat outline of the petal. The `z` line is what makes it feel real. It bends the petal into a gentle cup, adds a soft fold down the middle like the one in the logo, and lifts the tip slightly forward. Three small formulas, and a flat shape turns into something that looks like it grew.

### Painting the petals

Instead of using image files, each petal's colour is painted in code onto a small canvas, pixel by pixel. The fold splits every petal into a deep side and a bright side, the base glows warmly, and the edges fade out so the five petals blend where they meet. Each SPIRE colour comes from the brand: deep blue for Spiritual, teal for Physical, purple for Intellectual, orange for Relational and yellow for Emotional.

Then the painted canvas goes onto a glassy material:

```js
const m = new THREE.MeshPhysicalMaterial({
  map: tx, emissiveMap: tx,
  emissive: new THREE.Color(0xffffff), emissiveIntensity: 0.62,
  roughness: 0.22, clearcoat: 0.45,
  iridescence: 0.3,                     // a soft rainbow shine as it turns
  transmission: 0.22, thickness: 0.08,  // a little see through, like glass
  side: THREE.DoubleSide, transparent: true, depthWrite: false,
});
```

`emissive` makes the petal glow on its own, so it still looks bright against the dark sky. `iridescence` adds a soft rainbow shine as the petal turns, and `transmission` lets a bit of light pass through. I also added a few lines of shader code that make tiny sparkles flash across the surface, so the petals twinkle a little as they move.

### Putting the flower together

To build the flower, I give each petal an angle, taken from where it sits in the logo. Spiritual points straight up at 90 degrees, and the others are spaced 72 degrees apart. To place a petal, I turn it to its angle and, when the flower opens, push it out along that same direction:

```js
const SPIRE = [
  { key: 'spiritual',    axis: 90,  mid: '#1F3C88' },
  { key: 'physical',     axis: 162, mid: '#1ABC9C' },
  { key: 'intellectual', axis: 18,  mid: '#6C5CE7' },
  { key: 'relational',   axis: 234, mid: '#F39C12' },
  { key: 'emotional',    axis: 306, mid: '#F4C542' },
];

function inFlower(i, cx, cy, R, o = {}) {
  const a = rad(SPIRE[i].axis), ex = o.explode || 0;
  return { x: cx + Math.cos(a) * ex, y: cy - Math.sin(a) * ex, R, rz: a - Math.PI / 2 };
}
```

When `explode` is 0, all five petals meet in the middle and you see the lotus. Make it bigger and the flower opens up.

### Making them move smoothly

The petals never jump to a new spot. Each one acts like it is on a spring, so it speeds up gently, glides, and slows down before it stops. Each petal also has a slightly softer spring than the one before it, so they follow each other one by one instead of moving all at once:

```js
const kS = 26 - i * 2.6, dS = 2 * Math.sqrt(kS) * 0.92;
c.vx += ((t.x - c.x) * kS - c.vx * dS) * dt;
c.vy += ((t.y - c.y) * kS - c.vy * dS) * dt;
c.x += c.vx * dt; c.y += c.vy * dt;
```

While a petal is flying, it also tilts a little into the direction it is moving, like a leaf in the wind. People who have trouble with motion can turn on reduced motion on their device, and the petals then go straight to their places without the floating.

Getting all of this to feel natural took many rounds of small changes. The numbers in the code look random, but each one was tuned by watching the petals move again and again until it felt right.

You can see the live site at [hsrc.vn](https://www.hsrc.vn/).
