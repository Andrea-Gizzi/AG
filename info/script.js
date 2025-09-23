// ANIMAZIONI INIZIALI
function animateText(element, newText, duration, callback) {
  let currentText = element.textContent;
  const maxLength = Math.max(currentText.length, newText.length);
  currentText = currentText.padEnd(maxLength, " ");
  newText = newText.padEnd(maxLength, " ");

  // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
  const intervalTime = 50;
  const totalSteps = Math.floor(duration / intervalTime);
  let step = 0;

  const timer = setInterval(() => {
    let displayedText = '';
    for (let i = 0; i < maxLength; i++) {
      if (i < (maxLength * step) / totalSteps) {
        displayedText += newText[i];
      } else {
        displayedText += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    }
    element.textContent = displayedText;
    step++;
    if (step > totalSteps) {
      clearInterval(timer);
      element.textContent = newText.trim();
      if (callback) callback();
    }
  }, intervalTime);
}

document.addEventListener("DOMContentLoaded", () => {
  const navName = document.getElementById("nav-name");
  if (navName) {
    navName.style.opacity = "1";
    navName.style.transition = "opacity 0s ease";
  }

  const navContainer = document.querySelector('.nav-info');
  if (navContainer) {
    navContainer.style.opacity = "1";
    const navHomeLink = navContainer.querySelector('#nav-home a');
    if (navHomeLink) {
      navHomeLink.textContent = "HOME";
      animateText(navHomeLink, "HOME", 2000);
    }
  }

  const scrollContainer = document.querySelector(".scroll-container");
  const bottomCont = document.querySelector("#bottom-cont");
  const bottomContInfo = document.querySelector("#bottom-cont-info");

  if (scrollContainer) scrollContainer.style.opacity = "1";

  setTimeout(() => {
    if (bottomCont) bottomCont.style.opacity = "1";
    if (bottomContInfo) bottomContInfo.style.opacity = "1";
  }, 500);

  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  });

  document.querySelectorAll('video').forEach(video => {
    video.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  });

  document.querySelectorAll('#image-gallery .project-item').forEach(link => {
    link.addEventListener('click', (ev) => {
      if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
      try {
        sessionStorage.setItem('galleryOpen', 'true');
      } catch (e) { /* silent */ }
    });
  });
});

// COORDINATE
/* =========================
   COORDINATE CURSOR - track sempre, mostra cursor solo su non-touch (info page)
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".custom-cursor");

  const isTouchDevice = document.documentElement.classList.contains('is-touch') ||
                        ('ontouchstart' in window) ||
                        (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
                        (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0) ||
                        (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

  // evita flicker: start hidden
  if (cursor) {
    cursor.style.opacity = '0';
    cursor.style.visibility = 'hidden';
    cursor.style.pointerEvents = 'none';
  }

  function moveCursor(x, y) {
    if (!cursor) return;
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    cursor.style.visibility = 'visible';
    cursor.style.opacity = '1';
  }

  // throttling con rAF
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
      x = e.clientX; y = e.clientY;
    } else if (e.touches && e.touches[0]) {
      x = e.touches[0].clientX; y = e.touches[0].clientY;
    } else return;

    latestX = x; latestY = y;
    scheduleUpdate();
  }

  function onPointerDown(e) {
    if (e.pointerType && e.pointerType === 'touch') return;
    if (cursor) { cursor.style.transition = "transform 0.3s ease"; cursor.style.transform = "translate(-50%, -50%) rotate(135deg)"; }
  }
  function onPointerUp(e) {
    if (e.pointerType && e.pointerType === 'touch') return;
    if (cursor) { cursor.style.transition = "transform 0.3s ease"; cursor.style.transform = "translate(-50%, -50%) rotate(0deg)"; }
  }

  if (window.PointerEvent) {
    document.addEventListener("pointermove", handleMoveEvent, { passive: true });
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);
  } else {
    document.addEventListener("mousemove", handleMoveEvent, { passive: true });
    document.addEventListener("touchmove", handleMoveEvent, { passive: true });
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("mouseup", onPointerUp);
  }

  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("mouseenter", () => { if (!isTouchDevice && cursor) cursor.style.transform = "translate(-50%, -50%) rotate(135deg)"; });
    el.addEventListener("mouseleave", () => { if (!isTouchDevice && cursor) cursor.style.transform = "translate(-50%, -50%) rotate(0deg)"; });
  });

  window.addEventListener("beforeunload", () => {
    if (window.PointerEvent) {
      document.removeEventListener("pointermove", handleMoveEvent);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
    }
  });
});

/* helper: aggiorna gli angoli (se non presente nel file, aggiungi; altrimenti mantieni la tua versione) */
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

// FIND MORE
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("description-button");
  if (!button) return;
  const buttonLabel = button.querySelector(".button-label");
  const content = document.querySelector(".button-cont-info");
  if (!buttonLabel || !content) return;

  button.setAttribute("aria-expanded", "false");
  content.style.maxHeight = "0px";
  content.style.overflow = "hidden";
  content.style.transition = "max-height 0.6s var(--transition-ease-in-out)";

  button.addEventListener("click", () => {
    const willOpen = !button.classList.contains("open");

    button.classList.toggle("open", willOpen);
    button.setAttribute("aria-expanded", String(willOpen));

    if (willOpen) {
      animateText(buttonLabel, "CLOSE", 600);
      requestAnimationFrame(() => {
        content.style.maxHeight = content.scrollHeight + "px";
      });
    } else {
      animateText(buttonLabel, "READ MORE", 600);
      content.style.maxHeight = "0px";
    }
  });

  window.addEventListener("resize", () => {
    if (button.classList.contains("open")) {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// /PROJECT
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

    // comportamento speciale: se siamo nella pagina /project vogliamo mantenere il flag
    const isProjectPage = window.location.pathname.includes("/project");

    if (!isProjectPage) {
      gallery.classList.remove("visible");
      gallery.classList.add("hidden");
      try { sessionStorage.removeItem('galleryOpen'); } catch (e) { /* silent */ }
    } else {
      // se siamo su project, manteniamo il flag 'true' per preservare lo stato
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

        // Forza repaint e poi anima la chiusura verso lo stato normale
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

// drug and drop
document.addEventListener('dragstart', e => e.preventDefault());