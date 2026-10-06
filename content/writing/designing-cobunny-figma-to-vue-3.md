---
title: "Designing CoBunny, from Figma to Vue 3"
date: 2025-12-10
tag: UX
summary: "A short devlog about designing the booking flow for CoBunny, what I learned from user feedback, why I reduced the booking steps, and how Figma-first development changed my workflow."
---
CoBunny started as a university project, a co-working space booking platform built with Vue 3 and Supabase. What I didn't expect was how much the design process would shape the final product, and how much I'd learn from three short user interviews before writing a single line of code.

I interviewed three uni students about how they currently find and book study or co-working spaces. The common thread: they didn't mind paying, but they hated complexity. Every existing tool had too many steps, confusing availability calendars, and no way to see their past bookings without digging through confirmation emails. That feedback became the brief.

From there I mapped the full user journey, discover, compare, book, manage, and used it to decide exactly which screens I needed. Before opening VS Code, I designed the full flow in Figma: low-fidelity wireframes first to test the structure, then a hi-fi pass once the layout felt right. This order mattered: by the time I started coding, every component already had a defined purpose.

The original booking flow had five steps. After showing the Figma prototype to a friend, it became clear that steps three and four were redundant, the user was being asked to confirm information they'd already entered. I collapsed them, and the flow went from five steps to three. That's the kind of change that's trivial to make in Figma and painful to refactor mid-implementation.

The final result was a mobile-first interface with real-time availability and persistent booking history. Users I showed it to called it 'straightforward', which, given how cluttered the alternatives were, felt like exactly the right outcome.
