// Per-post script for the IPIC write-up. Loaded ONLY on
// /projects/ipic-fluid-simulation/ (declared in that page's front matter).
//
// This is a lightweight placeholder: a field of particles you can push around
// with the mouse. It is NOT the real IPIC solver — it just makes the slot feel
// alive until the WebGL version lands. Replacing it later needs no template
// changes: just swap the body of this file.

const canvas = document.getElementById("ipic-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  // A simple grid of particles with a tiny bit of swirl + mouse forcing.
  const COLS = 48;
  const ROWS = 27;
  const particles = [];
  for (let j = 0; j < ROWS; j++) {
    for (let i = 0; i < COLS; i++) {
      particles.push({
        x: (i + 0.5) * (W / COLS),
        y: (j + 0.5) * (H / ROWS),
        vx: 0,
        vy: 0,
      });
    }
  }

  const mouse = { x: 0, y: 0, px: 0, py: 0, active: false };
  const toLocal = (e) => {
    const r = canvas.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return { x: (t.clientX - r.left) * (W / r.width), y: (t.clientY - r.top) * (H / r.height) };
  };
  const onMove = (e) => {
    const p = toLocal(e);
    mouse.px = mouse.x; mouse.py = mouse.y;
    mouse.x = p.x; mouse.y = p.y;
    if (mouse.active && e.cancelable) e.preventDefault();
  };
  canvas.addEventListener("mousedown", (e) => { const p = toLocal(e); mouse.x = mouse.px = p.x; mouse.y = mouse.py = p.y; mouse.active = true; });
  window.addEventListener("mouseup", () => { mouse.active = false; });
  canvas.addEventListener("mousemove", onMove);
  canvas.addEventListener("touchstart", (e) => { const p = toLocal(e); mouse.x = mouse.px = p.x; mouse.y = mouse.py = p.y; mouse.active = true; }, { passive: true });
  window.addEventListener("touchend", () => { mouse.active = false; });
  canvas.addEventListener("touchmove", onMove, { passive: false });

  function step() {
    ctx.fillStyle = "#0b1021";
    ctx.fillRect(0, 0, W, H);

    const dragX = mouse.x - mouse.px;
    const dragY = mouse.y - mouse.py;

    for (const p of particles) {
      // Mouse forcing within a radius.
      if (mouse.active) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        const r = 70;
        if (d2 < r * r) {
          const f = (1 - Math.sqrt(d2) / r) * 0.6;
          p.vx += dragX * f;
          p.vy += dragY * f;
        }
      }
      // A gentle ambient swirl so it's never fully still.
      p.vx += Math.sin(p.y * 0.01) * 0.02;
      p.vy += Math.cos(p.x * 0.01) * 0.02;

      p.vx *= 0.96;
      p.vy *= 0.96;
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around the edges.
      if (p.x < 0) p.x += W; else if (p.x > W) p.x -= W;
      if (p.y < 0) p.y += H; else if (p.y > H) p.y -= H;

      const speed = Math.min(1, Math.hypot(p.vx, p.vy) / 4);
      const hue = 200 - speed * 160;
      ctx.fillStyle = `hsl(${hue}, 80%, ${40 + speed * 40}%)`;
      ctx.fillRect(p.x - 1, p.y - 1, 2.4, 2.4);
    }

    requestAnimationFrame(step);
  }
  step();
}
