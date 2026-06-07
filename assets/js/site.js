// Hover-to-play for thumbnails that have a .thumb-anim video.
// The MP4 has preload="none", so it's only fetched on first hover.
document.querySelectorAll('.thumb').forEach(function (thumb) {
  var video = thumb.querySelector('video.thumb-anim');
  if (!video) return;

  thumb.addEventListener('mouseenter', function () {
    thumb.classList.add('is-playing');
    var p = video.play();
    if (p && p.catch) p.catch(function () {});
  });

  thumb.addEventListener('mouseleave', function () {
    thumb.classList.remove('is-playing');
    video.pause();
    try { video.currentTime = 0; } catch (e) {}
  });
});
