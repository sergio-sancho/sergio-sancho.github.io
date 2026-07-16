// Thumbnail motion for entries that have a .thumb-anim video.
//
//  - Pointer devices (desktop): play the video while the pointer is over the
//    thumbnail (hover), pause + reset on leave.
//  - Touch devices (phones/tablets): as you scroll, autoplay the video of the
//    entry that currently fills most of the screen — only one at a time. When
//    a different entry takes over the viewport, its video plays and the
//    previous one pauses.
//
// The MP4s are muted + playsinline + preload="none", so on mobile they can
// autoplay without a tap and only the active one is ever fetched.
(function () {
  var items = [];
  document.querySelectorAll('.thumb').forEach(function (thumb) {
    var video = thumb.querySelector('video.thumb-anim');
    if (video) items.push({ thumb: thumb, video: video, entry: thumb.closest('.entry') || thumb });
  });
  if (!items.length) return;

  function play(it) {
    it.thumb.classList.add('is-playing');
    var p = it.video.play();
    if (p && typeof p.catch === 'function') p.catch(function () {});
  }
  function stop(it, reset) {
    it.thumb.classList.remove('is-playing');
    it.video.pause();
    if (reset) { try { it.video.currentTime = 0; } catch (e) {} }
  }

  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // ---- Desktop: hover to play -------------------------------------------
  if (canHover) {
    items.forEach(function (it) {
      it.thumb.addEventListener('mouseenter', function () { play(it); });
      it.thumb.addEventListener('mouseleave', function () { stop(it, true); });
    });
    return;
  }

  // ---- Touch: play whichever entry fills most of the viewport -----------
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var active = null;

  function visibleHeight(el) {
    var r = el.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    return Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
  }

  function refresh() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var best = null, bestH = 0;
    for (var i = 0; i < items.length; i++) {
      var h = visibleHeight(items[i].entry);
      if (h > bestH) { bestH = h; best = items[i]; }
    }
    // The winner must occupy a meaningful part of the screen; otherwise (e.g.
    // scrolled to the top bio or the footer) nothing plays.
    if (best && bestH >= 0.25 * vh) {
      if (active !== best) {
        if (active) stop(active, false);
        active = best;
        play(active);
      }
    } else if (active) {
      stop(active, false);
      active = null;
    }
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; refresh(); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  window.addEventListener('orientationchange', onScroll, { passive: true });
  window.addEventListener('load', refresh);
  refresh();
})();
