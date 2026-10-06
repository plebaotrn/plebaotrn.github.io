---
title: "Building HSRC: designing for two languages and two audiences"
date: 2026-05-15
tag: Case study
summary: "Notes on designing a bilingual website for a Vietnamese research organisation, how I handled bilingual UX, brand translation, and building a 3D interactive section with Three.js."
---
HSRC, the Human Sciences Research Centre, is a Vietnamese organisation working on something they call Wholebeing Science: an interdisciplinary approach to human flourishing that sits between psychology, philosophy, and education. When they approached me to design and build their website, the first challenge was figuring out who the site was actually for.

After talking with the HSRC team, two distinct audiences emerged: Vietnamese academics and researchers who already knew the organisation, and international partners, institutions, collaborators, and potential funders, who were encountering it for the first time. These two groups had very different mental models and different goals. The Vietnamese audience wanted depth; the international audience needed context. A single page structure couldn't serve both equally.

I designed two parallel navigation structures in Figma before building anything. The bilingual toggle isn't just a text swap, in several sections the Vietnamese and English versions present information in a different order because the cultural starting point is different. This meant every component had to be designed twice, with both languages reviewed against the brand voice before implementation.

The brand itself was a translation challenge. HSRC's visual identity is grounded in SPIRE, their core research framework, which has a specific symbolic geometry. I worked with the team to extract a set of design tokens: colours, type scales, and spacing values that felt true to the brand without being derivative. The result is a site that looks designed for HSRC, not just built on top of their logo.

The most technically interesting part was the interactive 3D SPIRE model, built with Three.js and React Three Fiber. The model needed to be explanatory (it had to communicate the framework's structure) and engaging (it's the centrepiece of the homepage). Getting the lighting and camera controls to feel natural on both desktop and mobile took several iterations. The Three.js abstraction in React Three Fiber made it possible to keep the component code readable alongside the rest of the Next.js codebase.
