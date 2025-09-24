/* ---------- UI HELPERS ---------- */
function animateText(element, finalText, duration, callback) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
  const intervalTime = 50;
  const totalSteps = Math.floor(duration / intervalTime);
  let step = 0;

  const timer = setInterval(() => {
    let displayedText = '';
    for (let i = 0; i < finalText.length; i++) {
      if (i < (finalText.length * step) / totalSteps) {
        displayedText += finalText[i];
      } else {
        displayedText += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    }
    element.textContent = displayedText;
    step++;
    if (step > totalSteps) {
      clearInterval(timer);
      element.textContent = finalText;
      if (callback && typeof callback === 'function') {
        callback();
      }
    }
  }, intervalTime);
}

/* ---------- UI HELPERS: Show temporary audio status toast ---------- */
function showAudioToast(text = "click to enable audio", { duration = 2000, color = 'white', mixBlendMode = 'difference' } = {}) {
  const audioStatus = document.getElementById('audio-status');
  if (!audioStatus) return;
  audioStatus.innerHTML = text;
  audioStatus.style.color = color;
  audioStatus.style.mixBlendMode = mixBlendMode;
  audioStatus.style.opacity = '1';
  if (audioStatus._hideTimeout) clearTimeout(audioStatus._hideTimeout);
  audioStatus._hideTimeout = setTimeout(() => {
    audioStatus.style.opacity = '0';
    audioStatus._hideTimeout = null;
  }, duration);
}

/* ---------- UI HELPERS: Check if background video/iframe is muted ---------- */
function isBgMutedState() {
  const nativeVideo = document.querySelector('#bg-video video, #bg-video > video');
  if (nativeVideo) {
    return !!nativeVideo.muted;
  }

  const iframe = document.getElementById('bg-video-iframe');
  if (iframe && iframe.src) {
    try {
      const url = new URL(iframe.src, window.location.href);
      const mutedParam = url.searchParams.get('muted');
      if (mutedParam !== null) {
        return mutedParam === '1' || mutedParam === 'true';
      }
    } catch (e) {
      return true;
    }
  }

  return true;
}

/* ---------- UI INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('#image-gallery .project-item').forEach(link => {
    link.addEventListener('click', (ev) => {
      if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
      sessionStorage.setItem('fromHome', 'true');
    });
  });

  const navEntries = performance.getEntriesByType("navigation");
  const hasReferrer = document.referrer && document.referrer !== "";
  const isInternal = hasReferrer && document.referrer.includes(window.location.hostname);

  const navName = document.getElementById("nav-name");
  const newsEl = document.querySelector(".news");
  function updateNavNamePosition() {
    const isMobile = window.innerWidth <= 769;
    if (!isMobile) {
      if (newsEl && newsEl.style.opacity != 0 && newsEl.style.display !== 'none') {
        navName.style.top = (newsEl.offsetHeight + 10) + "px";
      } else {
        navName.style.top = "10px";
      }
    } else {
      navName.style.top = "8px";
    }
  }

  const closeButton = document.querySelector('.news-close');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      if (newsEl) newsEl.style.display = 'none';
      try { sessionStorage.setItem("newsClosed", "true"); } catch (e) { }
      updateNavNamePosition();
    });
  }

  window.addEventListener("resize", updateNavNamePosition);

  function maybeShowMutedToastOnReveal() {
    const bgEl = document.getElementById('bg-video');
    if (isBgMutedState()) {
      showAudioToast("click to enable audio", { duration: 2000, color: 'white', mixBlendMode: 'difference' });
    }
  }

  if ((navEntries.length > 0 && navEntries[0].type === "reload") || !hasReferrer || !isInternal) {
    const textElement = document.getElementById('text');
    animateText(textElement, 'AG', 2000, () => {
      const startContainer = document.querySelector('.start-container');
      startContainer.style.opacity = '0';
      setTimeout(() => {
        startContainer.style.display = 'none';
        setTimeout(() => {
          const navEl = document.querySelector(".nav");
          const cornerEl = document.querySelector(".corner-values");
          const videoEl = document.querySelector(".video-background");

          if (navEl) navEl.style.opacity = "1";
          if (newsEl) newsEl.style.opacity = "1";
          if (navName) navName.style.opacity = "1";
          updateNavNamePosition();

          maybeShowMutedToastOnReveal();

          setTimeout(() => {
            if (cornerEl) cornerEl.style.opacity = "1";
            if (videoEl) videoEl.style.opacity = "1";
          }, 1000);
        }, 500);
      }, 500);
    });
  } else {
    const startContainer = document.querySelector('.start-container');
    if (startContainer) startContainer.style.display = 'none';

    const navEl = document.querySelector(".nav");
    const cornerEl = document.querySelector(".corner-values");
    const videoEl = document.querySelector(".video-background");

    if (navEl) navEl.style.transition = "none";
    if (newsEl) newsEl.style.transition = "none";
    if (cornerEl) cornerEl.style.transition = "none";
    if (videoEl) videoEl.style.transition = "none";

    if (navEl) navEl.style.opacity = "1";
    if (newsEl) newsEl.style.opacity = "1";
    if (cornerEl) cornerEl.style.opacity = "1";
    if (videoEl) videoEl.style.opacity = "1";

    if (navName) {
      navName.style.transition = navEl ? navEl.style.transition : '';
      navName.style.opacity = "1";
      updateNavNamePosition();
    }

    const navHomeLink = document.querySelector("#nav-home a");
    if (navHomeLink) animateText(navHomeLink, "ABOUT", 2000);

    maybeShowMutedToastOnReveal();
  }

  document.querySelectorAll('img, video, iframe').forEach(el => {
    el.addEventListener('contextmenu', (e) => e.preventDefault());
  });
});

/* ---------- CURSOR & COORDINATES ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".custom-cursor");

  const isTouchDevice = document.documentElement.classList.contains('is-touch') ||
    ('ontouchstart' in window) ||
    (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0) ||
    (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

  if (cursor) {
    cursor.style.opacity = isTouchDevice ? '0' : '0';
    cursor.style.visibility = isTouchDevice ? 'hidden' : 'hidden';
    cursor.style.pointerEvents = 'none';
  }

  function moveCursor(x, y) {
    if (!cursor) return;
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    cursor.style.visibility = 'visible';
    cursor.style.opacity = '1';
  }

  let latestX = 0, latestY = 0, rafPending = false;
  function scheduleUpdate() {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      updateCoordinates(latestX, latestY);
      if (!isTouchDevice) moveCursor(latestX, latestY);
      rafPending = false;
    });
  }

  function handleMoveEvent(e) {
    let x = 0, y = 0;
    if (typeof e.clientX === 'number' && typeof e.clientY === 'number') {
      x = e.clientX;
      y = e.clientY;
    } else if (e.touches && e.touches[0]) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      return;
    }

    latestX = x;
    latestY = y;
    scheduleUpdate();
  }

  function onPointerDown(e) {
    if (e.pointerType && e.pointerType === 'touch') return;
    if (cursor) {
      cursor.style.transition = "transform 0.3s ease";
      cursor.style.transform = "translate(-50%, -50%) rotate(135deg)";
    }
  }
  function onPointerUp(e) {
    if (e.pointerType && e.pointerType === 'touch') return;
    if (cursor) {
      cursor.style.transition = "transform 0.3s ease";
      cursor.style.transform = "translate(-50%, -50%) rotate(0deg)";
    }
  }

  if (window.PointerEvent) {
    document.addEventListener("pointermove", handleMoveEvent, { passive: true });
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);
  } else {
    document.addEventListener("mousemove", handleMoveEvent, { passive: true });
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("mouseup", onPointerUp);
    document.addEventListener("touchmove", handleMoveEvent, { passive: true });
  }

  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("mouseenter", () => {
      if (!isTouchDevice && cursor) cursor.style.transform = "translate(-50%, -50%) rotate(135deg)";
    });
    el.addEventListener("mouseleave", () => {
      if (!isTouchDevice && cursor) cursor.style.transform = "translate(-50%, -50%) rotate(0deg)";
    });
  });

  window.addEventListener("beforeunload", () => {
    if (window.PointerEvent) {
      document.removeEventListener("pointermove", handleMoveEvent);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
    }
  });
});

function updateCoordinates(x, y) {
  const w = (window.visualViewport && window.visualViewport.width) || window.innerWidth;
  const h = (window.visualViewport && window.visualViewport.height) || window.innerHeight;
  const tl = document.querySelector(".top-left");
  const tr = document.querySelector(".top-right");
  const bl = document.querySelector(".bottom-left");
  const br = document.querySelector(".bottom-right");
  if (tl) tl.textContent = String(Math.floor((x / w) * 99)).padStart(2, '0');
  if (tr) tr.textContent = String(Math.floor((y / h) * 99)).padStart(2, '0');
  if (bl) bl.textContent = String(Math.floor(((w - x) / w) * 99)).padStart(2, '0');
  if (br) br.textContent = String(Math.floor(((h - y) / h) * 99)).padStart(2, '0');
}

/* ---------- UI INIT: Close news on load ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const newsSection = document.querySelector('.news');
  const navName = document.getElementById("nav-name");

  try {
    if (sessionStorage.getItem("newsClosed") === "true") {
      if (newsSection) newsSection.style.display = 'none';
    }
  } catch (e) { }

  function updateNavNamePosition() {
    const isMobile = window.innerWidth <= 769;
    if (!isMobile) {
      if (newsSection && newsSection.style.opacity != 0 && newsSection.style.display !== 'none') {
        navName.style.top = (newsSection.offsetHeight + 10) + "px";
      } else {
        navName.style.top = "10px";
      }
    } else {
      navName.style.top = "8px";
    }
  }

  if (navName) updateNavNamePosition();
  window.addEventListener("resize", updateNavNamePosition);
});

/* ---------- VIDEO BACKGROUND ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const videoElement = document.getElementById("bg-video");
  if (!videoElement) return;

  const VIMEO_IDS = [
    1121345311,
    1121344903,
    1072980885,
    1072983962,
    1121218692,
  ];

  function getOrPickIndex() {
    try {
      let saved = sessionStorage.getItem('bgVideoIndex');
      if (saved !== null && !isNaN(parseInt(saved, 10))) {
        return parseInt(saved, 10);
      }
    } catch (e) { }

    const idx = Math.floor(Math.random() * VIMEO_IDS.length);
    try { sessionStorage.setItem('bgVideoIndex', String(idx)); } catch (e) { }
    return idx;
  }

  function vimeoSrcFor(id) {
    return `https://player.vimeo.com/video/${id}?background=1&muted=1&autoplay=1`;
  }

  if (videoElement.tagName && videoElement.tagName.toLowerCase() === 'video') {
    videoElement.preload = "auto";
    videoElement.muted = true;
    videoElement.loop = true;
    videoElement.playsInline = true;

    const savedTime = parseFloat(sessionStorage.getItem('bgVideoTime'));
    videoElement.addEventListener("loadedmetadata", () => {
      if (!isNaN(savedTime) && savedTime > 0 && savedTime < videoElement.duration) {
        try { videoElement.currentTime = savedTime; } catch (e) { }
      }

      const playPromise = videoElement.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(() => {
          if (sessionStorage.getItem('fromHome') === 'true') {
            showAudioToast("click to enable audio", { duration: 2000 });
            sessionStorage.removeItem('fromHome');
          }
        }).then(() => {
          if (sessionStorage.getItem('fromHome') === 'true') {
            if (videoElement.muted) showAudioToast("click to enable audio", { duration: 2000 });
            sessionStorage.removeItem('fromHome');
          }
        });
      } else {
        if (sessionStorage.getItem('fromHome') === 'true' && videoElement.muted) {
          showAudioToast("click to enable audio", { duration: 2000 });
          sessionStorage.removeItem('fromHome');
        }
      }
    }, { once: true });

    setInterval(() => {
      if (videoElement && !videoElement.paused && !videoElement.ended) {
        try { sessionStorage.setItem('bgVideoTime', videoElement.currentTime); } catch (e) { }
      }
    }, 1000);

    videoElement.addEventListener("click", () => {
      videoElement.muted = !videoElement.muted;
      const audioStatus = document.getElementById("audio-status");
      if (audioStatus) {
        if (!videoElement.muted) {
          showAudioToast("AUDIO ON", { duration: 2000, color: 'white', mixBlendMode: 'difference' });
        } else {
          showAudioToast("AUDIO OFF", { duration: 2000, color: 'red', mixBlendMode: 'normal' });
        }
      }
    });

    return;
  }

  const iframe = document.getElementById("bg-video-iframe");
  if (!iframe || (typeof Vimeo === 'undefined' && typeof window.Vimeo === 'undefined')) {
    console.warn("Vimeo Player API non trovata o iframe mancante. Assicurati di includere https://player.vimeo.com/api/player.js e di avere l'iframe con id 'bg-video-iframe'.");
    return;
  }

  const currentIndex = getOrPickIndex();
  const currentId = VIMEO_IDS[currentIndex];

  iframe.src = vimeoSrcFor(currentId);

  const overlayId = 'vimeo-click-overlay';
  let existingOverlay = document.getElementById(overlayId);
  if (existingOverlay) existingOverlay.remove();

  const overlay = document.createElement('div');
  overlay.id = overlayId;
  overlay.style.position = 'absolute';
  overlay.style.inset = '0';
  overlay.style.cursor = 'pointer';
  overlay.style.pointerEvents = 'auto';
  try { videoElement.style.position = videoElement.style.position || 'relative'; videoElement.appendChild(overlay); } catch (e) { }

  const player = new Vimeo.Player(iframe);

  player.setVolume(0).catch(() => { });
  try { player.setLoop(false).catch(() => { }); } catch (e) { }

  try {
    const savedTimePer = parseFloat(sessionStorage.getItem('bgVideoTimeVimeo_' + currentIndex));
    if (!isNaN(savedTimePer) && savedTimePer > 0) {
      player.ready().then(() => {
        player.getDuration().then((duration) => {
          if (savedTimePer < duration) {
            player.setCurrentTime(savedTimePer).catch(() => { });
          }
        }).catch(() => { });
      }).catch(() => { });
    }
  } catch (e) { }

  player.play().then(() => {
    if (sessionStorage.getItem('fromHome') === 'true') {
      player.getVolume().then((vol) => {
        if (vol === 0) showAudioToast("click to enable audio", { duration: 2000, color: 'white', mixBlendMode: 'difference' });
      }).catch(() => { });
      sessionStorage.removeItem('fromHome');
    }
  }).catch((err) => {
    if (sessionStorage.getItem('fromHome') === 'true') {
      showAudioToast("click to enable audio", { duration: 2000, color: 'white', mixBlendMode: 'difference' });
      sessionStorage.removeItem('fromHome');
    }
  });

  const saveInterval = setInterval(() => {
    player.getPaused().then(paused => {
      if (!paused) {
        player.getCurrentTime().then(time => {
          try {
            const idx = parseInt(sessionStorage.getItem('bgVideoIndex') || currentIndex, 10);
            sessionStorage.setItem('bgVideoTimeVimeo_' + idx, time);
          } catch (e) { }
        }).catch(() => { });
      }
    }).catch(() => { });
  }, 1000);

  player.on('ended', () => {
    try {
      let idx = parseInt(sessionStorage.getItem('bgVideoIndex') || currentIndex, 10);
      idx = (idx + 1) % VIMEO_IDS.length;
      sessionStorage.setItem('bgVideoIndex', String(idx));
      try { sessionStorage.removeItem('bgVideoTimeVimeo_' + idx); } catch (e) { }
      const nextId = VIMEO_IDS[idx];
      player.loadVideo(nextId).then(() => {
        player.setCurrentTime(0).catch(() => { });
        player.play().catch(() => { });
      }).catch((e) => {
        console.warn("loadVideo fallito, fallback impostando src:", e);
        iframe.src = vimeoSrcFor(nextId);
      });
    } catch (e) {
      console.error("Errore durante lo swap al video successivo:", e);
    }
  });

  overlay.addEventListener("click", (ev) => {
    player.getVolume().then((vol) => {
      const newVol = vol > 0 ? 0 : 1;
      player.setVolume(newVol).then(() => {
        if (newVol > 0) {
          showAudioToast("AUDIO ON", { duration: 2000, color: 'white', mixBlendMode: 'difference' });
        } else {
          showAudioToast("AUDIO OFF", { duration: 2000, color: 'red', mixBlendMode: 'normal' });
        }
      }).catch(() => { });
    }).catch(() => { });
  });

  overlay.addEventListener('contextmenu', e => e.preventDefault());

  window.addEventListener("beforeunload", () => {
    clearInterval(saveInterval);
  });
});


/* ---------- IMAGE GALLERY TOGGLE ---------- */
function toggleImageGallery(forceState) {
  const gallery = document.getElementById("image-gallery");
  const projectLink = document.querySelector("#nav-project a");
  const isMobile = window.innerWidth <= 769;
  const ANIM_DURATION = 2000;

  if (!gallery || !projectLink) return;

  const visible = gallery.classList.contains("visible");
  const willOpen = (typeof forceState === 'boolean') ? forceState : !visible;

  if (willOpen) {
    try { sessionStorage.setItem('galleryOpen', 'true'); } catch (e) { }

    projectLink.style.transform = isMobile ? "translateX(-32vw)" : "translateX(-16vw)";
    animateText(projectLink, "CLOSE", ANIM_DURATION);

    setTimeout(() => {
      gallery.classList.remove("hidden");
      gallery.classList.add("visible");
    }, ANIM_DURATION);
  } else {
    projectLink.style.transform = "translateX(0)";
    animateText(projectLink, "PROJECT", ANIM_DURATION);

    const isProjectPage = window.location.pathname.includes("/project");

    if (!isProjectPage) {
      gallery.classList.remove("visible");
      gallery.classList.add("hidden");
      try { sessionStorage.removeItem('galleryOpen'); } catch (e) { }
    } else {
      try { sessionStorage.setItem('galleryOpen', 'true'); } catch (e) { }
    }
  }
}

/* ---------- UI INIT: Close gallery if arriving from project page ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const ANIM_DURATION = 2000;

  try {
    if (sessionStorage.getItem('galleryOpen') === 'true') {
      const projectLink = document.querySelector('#nav-project a');
      if (projectLink) {
        const isMobile = window.innerWidth <= 769;

        projectLink.style.transition = 'none';
        projectLink.style.transform = isMobile ? 'translateX(-32vw)' : 'translateX(-16vw)';
        projectLink.textContent = 'CLOSE';

        requestAnimationFrame(() => {
          projectLink.style.transition = '';
          projectLink.style.transform = 'translateX(0)';
          if (typeof animateText === 'function') {
            animateText(projectLink, 'PROJECT', ANIM_DURATION);
          } else {
            setTimeout(() => { projectLink.textContent = 'PROJECT'; }, ANIM_DURATION);
          }
        });
      }
      sessionStorage.removeItem('galleryOpen');
    }
  } catch (e) {
    try { sessionStorage.removeItem('galleryOpen'); } catch (e) { }
  }
});

document.addEventListener('dragstart', e => e.preventDefault());