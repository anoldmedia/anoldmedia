function initLivePlayer(videoElementId, sourceUrl) {
  var video = document.getElementById(videoElementId);
  if (!video) {
    console.error('Video element not found:', videoElementId);
    return;
  }
  if (window.Hls && window.Hls.isSupported()) {
    var hls = new Hls({
      maxLiveSyncPlaybackRate: 1.5,
      enableWorker: true
    });
    hls.loadSource(sourceUrl);
    hls.attachMedia(video);
    hls.on(Hls.Events.ERROR, function(event, data) {
      console.warn('HLS.js error', data);
    });
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = sourceUrl;
  } else {
    console.warn('HLS not supported in this browser');
  }
}