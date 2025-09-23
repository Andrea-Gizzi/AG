/* ---------- utility: animate text ---------- */
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

/* ---------- audio toast (ora con opzioni colore / mixBlendMode) ---------- */
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

/* ---------- helper: rileva se il background è mutuato (supporta <video> e iframe Vimeo) ---------- */
function isBgMutedState() {
  // controlla prima un <video> nativo dentro #bg-video
  const nativeVideo = document.querySelector('#bg-video video, #bg-video > video');
  if (nativeVideo) {
    return !!nativeVideo.muted;
  }

  // poi controlla iframe Vimeo: se l'iframe ha ?muted=1 nel src consideralo muted per sync visivo
  const iframe = document.getElementById('bg-video-iframe');
  if (iframe && iframe.src) {
    try {
      const url = new URL(iframe.src, window.location.href);
      const mutedParam = url.searchParams.get('muted');
      if (mutedParam !== null) {
        return mutedParam === '1' || mutedParam === 'true';
      }
    } catch (e) {
      // se non riusciamo a parse, fallback a true per sicurezza visiva
      return true;
    }
  }

  // fallback: se non riusciamo a determinare, ritorna true (mostriamo il toast per invitare l'utente)
  return true;
}

/* =========================
   DOM READY: NAV, START, NEWS
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  // Imposta sessionStorage quando clicchi sui progetti
  document.querySelectorAll('#image-gallery .project-item').forEach(link => {
    link.addEventListener('click', (ev) => {
      if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
      sessionStorage.setItem('fromHome', 'true');
    });
  });

  const navEntries = performance.getEntriesByType("navigation");
  const hasReferrer = document.referrer && document.referrer !== "";
  const isInternal = hasReferrer && document.referrer.includes(window.location.hostname);

  // NAV-NAME POSITION UNIFICATA (responsive inclusa)
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

  // Funzione per chiudere la news e aggiornare nav-name
  const closeButton = document.querySelector('.news-close');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      if (newsEl) newsEl.style.display = 'none';
      try { sessionStorage.setItem("newsClosed", "true"); } catch (e) { }
      updateNavNamePosition();
    });
  }

  // Aggiorna posizione al resize
  window.addEventListener("resize", updateNavNamePosition);

  // helper: mostra toast sincronizzato quando la nav compare (come in codice 0)
  function maybeShowMutedToastOnReveal() {
    const bgEl = document.getElementById('bg-video');
    // se lo stato è muted (o non determinabile) mostriamo il toast
    if (isBgMutedState()) {
      showAudioToast("click to enable audio", { duration: 2000, color: 'white', mixBlendMode: 'difference' });
    }
  }

  // GESTIONE ANIMAZIONE INIZIALE O DIRETTA
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

          // --- sincronizza il toast con la comparsa della nav (stessa tempistica)
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

    // --- sincronizza anche qui (caricamento diretto senza animazione)
    maybeShowMutedToastOnReveal();
  }

  // DISABILITA CONTEXT MENU su immagini, video e iframe
  document.querySelectorAll('img, video, iframe').forEach(el => {
    el.addEventListener('contextmenu', (e) => e.preventDefault());
  });
});

/* =========================
   COORDINATE CURSOR - track sempre, mostra cursor solo su non-touch
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".custom-cursor");

  // determina una sola volta se siamo su dispositivo touch (fonte di verità)
  const isTouchDevice = document.documentElement.classList.contains('is-touch') ||
                        ('ontouchstart' in window) ||
                        (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
                        (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0) ||
                        (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

  // evita flicker: assicurati che il cursore parta nascosto
  if (cursor) {
    cursor.style.opacity = isTouchDevice ? '0' : '0'; // visibile solo via JS successivamente per desktop
    cursor.style.visibility = isTouchDevice ? 'hidden' : 'hidden';
    cursor.style.pointerEvents = 'none';
  }

  // funzione che muove il cursore visibile (usata solo su non-touch)
  function moveCursor(x, y) {
    if (!cursor) return;
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    cursor.style.visibility = 'visible';
    cursor.style.opacity = '1';
  }

  // funzione che aggiorna solo le coordinate (sempre chiamata)
  // throttling con rAF per ottimizzare
  let latestX = 0, latestY = 0, rafPending = false;
  function scheduleUpdate() {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      updateCoordinates(latestX, latestY);
      // Se NON siamo su touch, sincronizziamo anche il cursore visibile
      if (!isTouchDevice) moveCursor(latestX, latestY);
      rafPending = false;
    });
  }

  // handler unico che prende coordinate da pointer o da touch fallback
  function handleMoveEvent(e) {
    // support pointer events (clientX/clientY)
    let x = 0, y = 0;
    if (typeof e.clientX === 'number' && typeof e.clientY === 'number') {
      x = e.clientX;
      y = e.clientY;
    } else if (e.touches && e.touches[0]) {
      // fallback touch event
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      return;
    }

    latestX = x;
    latestY = y;
    scheduleUpdate();
  }

  // pointerdown/up: animazioni del cursore visibile (solo non-touch)
  function onPointerDown(e) {
    if (e.pointerType && e.pointerType === 'touch') return; // non animiamo per touch
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

  // registra i listener:
  if (window.PointerEvent) {
    // pointermove copre mouse/pen/touch — ma noi non filtriamo qui: usiamo handleMoveEvent sempre
    document.addEventListener("pointermove", handleMoveEvent, { passive: true });
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);
  } else {
    // fallback: mouse + touch
    document.addEventListener("mousemove", handleMoveEvent, { passive: true });
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("mouseup", onPointerUp);
    document.addEventListener("touchmove", handleMoveEvent, { passive: true });
  }

  // hover su link/btn: solo modifica visuale del cursore (in desktop)
  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("mouseenter", () => {
      if (!isTouchDevice && cursor) cursor.style.transform = "translate(-50%, -50%) rotate(135deg)";
    });
    el.addEventListener("mouseleave", () => {
      if (!isTouchDevice && cursor) cursor.style.transform = "translate(-50%, -50%) rotate(0deg)";
    });
  });

  // cleanup
  window.addEventListener("beforeunload", () => {
    if (window.PointerEvent) {
      document.removeEventListener("pointermove", handleMoveEvent);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
    }
  });
});


function updateCoordinates(x, y) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const tl = document.querySelector(".top-left");
  const tr = document.querySelector(".top-right");
  const bl = document.querySelector(".bottom-left");
  const br = document.querySelector(".bottom-right");
  if (tl) tl.textContent = String(Math.floor((x / w) * 99)).padStart(2, '0');
  if (tr) tr.textContent = String(Math.floor((y / h) * 99)).padStart(2, '0');
  if (bl) bl.textContent = String(Math.floor(((w - x) / w) * 99)).padStart(2, '0');
  if (br) br.textContent = String(Math.floor(((h - y) / h) * 99)).padStart(2, '0');
}

/* =========================
   CLOSE NEWS AL CARICAMENTO + aggiorna nav-name
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const newsSection = document.querySelector('.news');
  const navName = document.getElementById("nav-name");

  try {
    if (sessionStorage.getItem("newsClosed") === "true") {
      if (newsSection) newsSection.style.display = 'none';
    }
  } catch (e) { /* silent */ }

  // aggiorna posizione nav-name anche se la news è chiusa
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

/* =========================
   VIDEO BACKGROUND — singolo video o Vimeo (compatibile con vecchio comportamento)
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const videoElement = document.getElementById("bg-video");
  if (!videoElement) return;

  // se l'elemento è un elemento video HTML nativo — mantieni il comportamento esistente
  if (videoElement.tagName && videoElement.tagName.toLowerCase() === 'video') {
    // --- codice esistente per <video>
    const singleSource = "../assets/video/sense/sense.mp4";
    videoElement.src = singleSource;
    videoElement.preload = "auto";
    videoElement.muted = true;
    videoElement.loop = true;
    videoElement.playsInline = true;

    const savedTime = parseFloat(sessionStorage.getItem('bgVideoTime'));
    videoElement.addEventListener("loadedmetadata", () => {
      if (!isNaN(savedTime) && savedTime > 0 && savedTime < videoElement.duration) {
        try { videoElement.currentTime = savedTime; } catch (e) { /* silent */ }
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
          // AUDIO ON
          showAudioToast("AUDIO ON", { duration: 2000, color: 'white', mixBlendMode: 'difference' });
        } else {
          // AUDIO OFF
          showAudioToast("AUDIO OFF", { duration: 2000, color: 'red', mixBlendMode: 'normal' });
        }
      }
    });

    return; // fine gestione video nativo
  }

  // --- Se invece #bg-video è wrapper per Vimeo (div che contiene iframe: #bg-video-iframe)
  const iframe = document.getElementById("bg-video-iframe");
  if (!iframe || (typeof Vimeo === 'undefined' && typeof window.Vimeo === 'undefined')) {
    console.warn("Vimeo Player API non trovata o iframe mancante. Assicurati di includere https://player.vimeo.com/api/player.js e di avere l'iframe con id 'bg-video-iframe'.");
    return;
  }

  // Crea overlay per intercettare click (cliccare direttamente dentro l'iframe non genera eventi nel parent)
  const overlayId = 'vimeo-click-overlay';
  // rimuovi overlay precedente se presente
  let existingOverlay = document.getElementById(overlayId);
  if (existingOverlay) existingOverlay.remove();

  const overlay = document.createElement('div');
  overlay.id = overlayId;
  overlay.style.position = 'absolute';
  overlay.style.inset = '0';
  overlay.style.cursor = 'pointer';
  overlay.style.pointerEvents = 'auto';

  try {
    // assicurati che il wrapper (#bg-video) sia posizionato per contenere l'overlay
    videoElement.style.position = videoElement.style.position || 'relative';
    videoElement.appendChild(overlay);
  } catch (e) {
  }

  const player = new Vimeo.Player(iframe);

  // inizializza: volume 0 (muted)
  player.setVolume(0).catch(() => { /* ignora errori */ });
  player.setLoop(true).catch(() => { /* ignora */ });

  // ripristina saved time se presente
  const savedTime = parseFloat(sessionStorage.getItem('bgVideoTimeVimeo') || sessionStorage.getItem('bgVideoTime'));
  if (!isNaN(savedTime) && savedTime > 0) {
    player.ready().then(() => {
      player.getDuration().then((duration) => {
        if (savedTime < duration) {
          player.setCurrentTime(savedTime).catch(() => { /* silent */ });
        }
      }).catch(() => { });
    }).catch(() => { });
  }

  // play & gestione Promise (autoplay potrebbe essere bloccato dai browser)
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

  // salva timecode ogni secondo (ottimizzato su getCurrentTime)
  const saveInterval = setInterval(() => {
    player.getPaused().then(paused => {
      if (!paused) {
        player.getCurrentTime().then(time => {
          try { sessionStorage.setItem('bgVideoTimeVimeo', time); } catch (e) { }
        }).catch(() => { });
      }
    }).catch(() => { });
  }, 1000);

  // overlay click: toggle mute tramite volume (Vimeo non espone "muted" boolean)
  overlay.addEventListener("click", (ev) => {
    player.getVolume().then((vol) => {
      const newVol = vol > 0 ? 0 : 1; // toggle 0/1
      player.setVolume(newVol).then(() => {
        if (newVol > 0) {
          showAudioToast("AUDIO ON", { duration: 2000, color: 'white', mixBlendMode: 'difference' });
        } else {
          showAudioToast("AUDIO OFF", { duration: 2000, color: 'red', mixBlendMode: 'normal' });
        }
      }).catch(() => { });
    }).catch(() => { });
  });

  // evita che il menu contestuale appaia sull'overlay
  overlay.addEventListener('contextmenu', e => e.preventDefault());

  // pulizia
  window.addEventListener("beforeunload", () => {
    clearInterval(saveInterval);
  });
});

/* =========================
   IMAGE GALLERY TOGGLE
   ========================= */
function toggleImageGallery(forceState) {
  const gallery = document.getElementById("image-gallery");
  const projectLink = document.querySelector("#nav-project a");
  const isMobile = window.innerWidth <= 769;
  const ANIM_DURATION = 2000;

  if (!gallery || !projectLink) return;

  const visible = gallery.classList.contains("visible");
  const willOpen = (typeof forceState === 'boolean') ? forceState : !visible;

  if (willOpen) {
    try { sessionStorage.setItem('galleryOpen', 'true'); } catch (e) { /* silent */ }

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
      try { sessionStorage.removeItem('galleryOpen'); } catch (e) { /* silent */ }
    } else {
      try { sessionStorage.setItem('galleryOpen', 'true'); } catch (e) { /* silent */ }
    }
  }
}

/* ---------- se arrivo da PROJECT con gallery aperta: anima la chiusura ---------- */
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

// DISABILITA DRAG & DROP
document.addEventListener('dragstart', e => e.preventDefault());