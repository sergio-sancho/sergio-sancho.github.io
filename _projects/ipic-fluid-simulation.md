---
layout: project
title: "The Impulse Particle-In-Cell Method"
subtitle: "Eurographics 2024 — an interactive write-up"
description: "A short, interactive explanation of the Impulse Particle-In-Cell (IPIC) fluid simulation method."
scripts:
  - /assets/js/projects/ipic-sim.js
module: true
---

Fluid simulation in computer graphics has to balance two things that usually pull
against each other: **stability** (so the simulation doesn't blow up) and
**detail** (the swirling, vortical motion that makes smoke and water look alive).
Classic hybrid solvers like PIC/FLIP buy stability by transferring velocities back
and forth between particles and a background grid — but that transfer quietly
smears away small-scale vorticity.

In **The Impulse Particle-In-Cell (IPIC) Method** we keep the robustness of a
hybrid scheme while preserving much more of that fine detail. The key idea is to
carry an **impulse** (a gauge variable related to velocity) on the particles
instead of the raw velocity, and to periodically reset it against the grid. This
dramatically reduces the numerical dissipation of vorticity, so vortices live
longer and the flow stays lively.

## Try it

The widget below is an interactive placeholder for now — drag inside it to push
the fluid around. I'll replace it with a real in-browser IPIC solver soon, so you
can compare vorticity preservation against a plain PIC baseline directly in your
browser.

<div class="sim-container">
  <canvas id="ipic-canvas" width="640" height="360"></canvas>
  <p class="sim-caption">Interactive IPIC simulation — full WebGL version coming soon.</p>
</div>

## In short

- **Problem:** hybrid fluid solvers are stable but dissipate vorticity.
- **Idea:** advect an *impulse* on particles and reset it against the grid.
- **Result:** much better vorticity preservation at a comparable cost.

For the full details, see the [project page](https://studios.disneyresearch.com/2024/04/25/the-impulse-particle-in-cell-method/),
the [paper](https://assets.studios.disneyresearch.com/app/uploads/2024/04/The-Impulse-Particle-In-Cell-Method-Paper.pdf),
or the [video](https://www.youtube.com/watch?v=cmDSsBZ16MY).
