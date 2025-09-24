/* ---------- AUDIO ---------- */
function getAudioMuted() {
  try {
    return sessionStorage.getItem("audioMuted") === "true";
  } catch (e) {
    return true;
  }
}

function setAudioMuted(state) {
  try {
    sessionStorage.setItem("audioMuted", state ? "true" : "false");
  } catch (e) { }
  window.audioMuted = state;
}

/* ---------- utility: tryPlay (works for Vimeo.Player too) ---------- */
function tryPlay(playerLike) {
  return new Promise((resolve) => {
    if (!playerLike || typeof playerLike.play !== 'function') return resolve(false);
    try {
      const p = playerLike.play();
      if (!p || typeof p.then !== 'function') return resolve(true);
      p.then(() => resolve(true)).catch(() => resolve(false));
    } catch (err) {
      return resolve(false);
    }
  });
}

/* ---------- DATA ---------- */
const PROJECTS = {
  "1": {
    id: "1",
    title: "MASSIMO VIGNELLI",
    year: "Editorial 2023",
    extraInfo: ``,
    description: `
      <p class="context-2"><br>
       The project features a cover dedicated to the life and work of Massimo Vignelli. Organised through a precise 
       division of data, it traces his trajectory from his Italian origins to the innovations that established him as 
       a design icon. Graphic elements such as railway lines, colour hierarchies and structural grids evoke his creative 
       approach, transforming information into a compelling visual narrative. Once opened, a portrait of Vignelli 
       emerges in the centre, a symbolic reminder of his lasting influence on generations of designers.
      </p>
      <p class="context">Supervisor Fulvia Lepori and Michela Linder</p>
      <br>
    `,
    images: [
      "../assets/img/vignelli/1.jpg",
      "../assets/img/vignelli/2.jpg",
      "../assets/img/vignelli/3.jpg",
      "../assets/img/vignelli/4.jpg",
      "../assets/img/vignelli/5.jpg"
    ]
  },
  "2": {
    id: "2",
    title: "KINETIC ART",
    year: "Editorial 2023",
    extraInfo: ``,
    description: `
      <p class="context-2"><br>
        Designed for the Mendrisio Art Museum, this poster celebrates kinetic art, a discipline merging light, 
        form, and movement to sharpen perception. Inspired by artists such as Almir Mavignier and Peter Megert, 
        it translates the dynamic essence of the movement into a meticulously composed visual experience. 
        The layout bridges tradition and modernity, embodying the spirit of innovation central to kinetic art.
      </p>
      <p class="context">Supervisor Marco Zürcher and Sidi Vanetti <br> Co-author Simone Scardovi</p>
      <br>
    `,
    images: [
      "../assets/img/kinetic_art/1.jpg",
      "../assets/img/kinetic_art/2.jpg",
      "../assets/img/kinetic_art/3.jpg",
      "../assets/img/kinetic_art/4.jpg"
    ]
  },
  "3": {
    id: "3",
    title: "C0°RD’1N.A”TE",
    year: "Editorial 2024",
    extraInfo: `<br>
     Selected for Where Flowers Bloom Magazine 2025
    `,
    description: `
      <p class="context-2"><br>
        C0°RD'1N.A ’TE is an editorial project on monumental and dystopian Brutalist architecture in former Yugoslavia. 
        Each building is documented with metadata, especially its coordinates, marking its exact location. Structured 
        with striking covers, concise texts, analyses, images sourced online and pictograms, the publication balances 
        clarity with atmosphere, engaging younger audiences while honoring architecture’s expressive power.
      </p>
      <p class="context"> Supervisor Roberto Schneeberger <br><br> Clip Alex Bokov <br> Audio Hildur Guðnadóttir </p>
      <br>
    `,
    images: [
      "VIMEO:1121345311",
      "../assets/img/coordinate/1.jpg",
      "../assets/img/coordinate/2.jpg",
      "../assets/img/coordinate/3.jpg",
      "../assets/img/coordinate/4.jpg",
      "../assets/img/coordinate/5.jpg",
      "../assets/img/coordinate/6.jpg",
      "../assets/img/coordinate/7.jpg",
      "../assets/img/coordinate/8.jpg"
    ]
  },
  "4": {
    id: "4",
    title: "MK-97",
    year: "Type Design 2025",
    extraInfo: ``,
    description: `
      <p class="context-2"><br>
        MK-97 reinterprets an archival font designed in 1897 for the US Government Printing Office. Through research, 
        digitisation, and redesign, the forgotten typeface acquires a renewed presence, fusing historical resonance 
        with contemporary graphic expression. A printed specimen accompanies the project, highlighting the font’s 
        essential forms and enhancing them with silver textures and low-resolution imagery that enrich its visual 
        and narrative dimension.
      </p>
      <p class="context">Supervisor Luca Pellegrini <br><br> Audio Haxan Cloak</p>
      <br>
    `,
    images: [
      "VIMEO:1121344903",
      "../assets/img/mk-97/1.jpg",
      "../assets/img/mk-97/2.jpg",
      "../assets/img/mk-97/3.jpg",
      "../assets/img/mk-97/4.jpg",
      "../assets/img/mk-97/5.jpg",
      "../assets/img/mk-97/6.jpg",
      "../assets/img/mk-97/7.jpg",
      "../assets/img/mk-97/8.jpg"
    ]
  },
  "5": {
    id: "5",
    title: "ГОША",
    year: "Co-Design AI - 2025",
    extraInfo: `<br>
    Photo Schweiz 2025<br>
      Zurich`,
    description: `
      <p class="context-2"><br>
        This project explores the use of artificial intelligence and machine learning to create the
        identity of an imaginary fashion brand set in 2064. In a context marked by social and environmental crises, but
        also by rapid technological transformations, the AI-generated images combine minimalism and futurism. The result
        is a visual identity that addresses issues such as identity, resilience and the delicate balance between
        humanity and technology, offering an innovative and coherent vision of the future of fashion.
      </p>
      <p class="context">Supervisor Leonardo Angelucci <br><br> Audio BFRND, Ufo361 & Sonus030 </p>
      <br>
    `,
    images: [
      "VIMEO:1072980885",
      "../assets/img/rowa/1.jpg",
      "../assets/img/rowa/2.jpg",
      "../assets/img/rowa/3.jpg",
      "../assets/img/rowa/4.jpg",
      "../assets/img/rowa/5.jpg",
      "../assets/img/rowa/6.jpg",
      "../assets/img/rowa/7.jpg",
      "../assets/img/rowa/8.jpg",
      "../assets/img/rowa/9.jpg"
    ]
  },
  "6": {
    id: "6",
    title: "SYNC",
    year: "IxD - 2025",
    extraInfo: `<br>
    Milano Design Week 2025<br> 
    House of Switzerland`,
    description: `
      <p class="context-2"><br>
        SYNC is an interactive exploration of the intersection between body, technology, and visual art. 
        Drawing from Bauhaus dance principles, the project employs accelerometers to capture performers’ 
        gestures and translate them into real-time audiovisual compositions. An immersive interface synchronises 
        movement, sound, and imagery, where dynamic lines and sound generated inspired by Ryoji Ikeda evolve in harmony, 
        offering a contemporary reinterpretation of Bauhaus through a constantly shifting language.
      </p>
      <p class="context">Supervisor Leonardo Angelucci</p>
      <br>
    `,
    images: [
      "VIMEO:1072983962",
      "../assets/img/sync/1.jpg",
      "../assets/img/sync/2.jpg",
      "../assets/img/sync/3.jpg",
      "../assets/img/sync/4.jpg",
      "../assets/img/sync/5.jpg",
      "../assets/img/sync/6.jpg",
      "../assets/img/sync/7.jpg"
    ]
  },
  "7": {
    id: "7",
    title: "SENSE<br>Visual sistem for smart roads",
    year: "IxD · Type · Editorial 2025",
    extraInfo: `<br>
    Talent Award 2025<br>
      SUPSI Visual Comunication
    `,
    description: `
      <p class="context-2"><br>
        SENSE is a road signage system for bidirectional reading: readable and interpretable by humans and automated
        systems. It combines a shared visual grammar of typographic and pictographic communication with a multicultural
        dataset and ML validation. The manual and a variable typeface make the system adaptable to urban, extra-urban
        and logistical contexts, enhancing safety and human-machine cooperation.</p>
      <p class="context">Supervisor Michael Zehnder <br><br> Audio emptyset </p>
      <br>
    `,
    images: [
      "VIMEO:1121218692",
      "../assets/img/sense/1.jpg",
      "../assets/img/sense/2.jpg",
      "../assets/img/sense/3.jpg",
      "../assets/img/sense/4.jpg",
      "../assets/img/sense/5.jpg",
      "../assets/img/sense/6.jpg",
      "../assets/img/sense/7.jpg"
    ]
  }
};

/* ---------- helper: crea sezione immagine/video/vimeo e la aggiunge allo scroll-container ---------- */
function extractVimeoId(str) {
  if (!str || typeof str !== 'string') return null;
  const s = str.trim();
  let m = s.match(/^vimeo:\s*(\d+)$/i);
  if (m) return m[1];
  m = s.match(/^(\d{6,})$/);
  if (m) return m[1];
  m = s.match(/vimeo\.com\/(?:.*\/)?(\d+)/i);
  if (m) return m[1];
  return null;
}

/* ---------- helper: crea sezione (Vimeo iframe) o immagine ---------- */
function createMediaSection(src, projectTitle, index) {
  const section = document.createElement('section');
  section.className = 'image-section';

  const vimeoId = extractVimeoId(src);
  if (vimeoId) {
    const wrapper = document.createElement('div');
    wrapper.className = 'vimeo-wrapper';

    const iframe = document.createElement('iframe');
    iframe.className = 'vimeo-iframe';
    iframe.setAttribute('draggable', 'false');

    iframe.src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&background=1&title=0&byline=0&portrait=0&playsinline=1`;
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
    iframe.dataset.vimeoId = vimeoId;
    iframe.id = `vimeo-${vimeoId}-${index || Math.floor(Math.random() * 100000)}`;

    wrapper.appendChild(iframe);
    section.appendChild(wrapper);
    return section;
  }

  const img = document.createElement('img');
  img.src = src;
  img.alt = projectTitle;
  img.draggable = false;
  section.appendChild(img);
  return section;
}

/* ---------- Vimeo players management ---------- */
window._vimeoPlayers = window._vimeoPlayers || [];

function destroyVimeoPlayers() {
  if (!window._vimeoPlayers || !window._vimeoPlayers.length) return;
  window._vimeoPlayers.forEach(player => {
    try { if (typeof player.unload === 'function') player.unload().catch(() => { }); } catch (e) { }
    try { if (typeof player.destroy === 'function') player.destroy(); } catch (e) { /* silent */ }
  });
  window._vimeoPlayers = [];
}

function initVimeoPlayers(scrollContainer) {
  destroyVimeoPlayers();

  const iframes = Array.from(scrollContainer.querySelectorAll('iframe.vimeo-iframe'));
  if (!iframes.length) return;

  if (typeof Vimeo === 'undefined' && typeof window.Vimeo === 'undefined') {
    console.warn('Vimeo player API not found. Include https://player.vimeo.com/api/player.js');
    return;
  }

  iframes.forEach((iframe) => {
    try {
      const player = new Vimeo.Player(iframe, {
        autopause: false,
        background: true,
        loop: true,
        muted: true
      });

      player.play().catch(() => { /* autoplay potrebbe essere bloccato ma dovrebbe partire se muted */ });

      window._vimeoPlayers.push(player);
    } catch (e) {
      console.warn('init Vimeo player error', e);
    }
  });
}

/* ---------- applica stato audio (solo Vimeo in questa versione) ---------- */
function applyAudioStateToVideos() {
  const scrollContainer = document.querySelector('.scroll-container');
  if (!scrollContainer) return;

  if (window._vimeoPlayers && window._vimeoPlayers.length) {
    window._vimeoPlayers.forEach(p => {
      try {
        if (typeof p.setVolume === 'function') p.setVolume(0).catch(() => { });
        else if (typeof p.setMuted === 'function') p.setMuted(true).catch(() => { });
        if (typeof p.play === 'function') p.play().catch(() => { });
      } catch (e) { }
    });
  }

  // scegli il primo player (se presente)
  const firstPlayer = (window._vimeoPlayers && window._vimeoPlayers.length) ? window._vimeoPlayers[0] : null;
  if (!firstPlayer) return;

  tryPlay(firstPlayer).then(played => {
    if (!played) return;

    if (window.audioMuted) {
      if (window._vimeoPlayers && window._vimeoPlayers.length) {
        window._vimeoPlayers.forEach(p => {
          try {
            if (typeof p.setVolume === 'function') p.setVolume(0).catch(() => { });
            else if (typeof p.setMuted === 'function') p.setMuted(true).catch(() => { });
          } catch (e) { }
        });
      }
    } else {
      window._vimeoPlayers.forEach((p, i) => {
        try {
          if (i === 0) {
            if (typeof p.setVolume === 'function') p.setVolume(1).catch(() => { });
            else if (typeof p.setMuted === 'function') p.setMuted(false).catch(() => { });
            if (typeof p.play === 'function') p.play().catch(() => { });
          } else {
            if (typeof p.setVolume === 'function') p.setVolume(0).catch(() => { });
            else if (typeof p.setMuted === 'function') p.setMuted(true).catch(() => { });
          }
        } catch (e) { }
      });
    }
  }).catch(() => { });
}

/* ---------- setup audio toggle (click globale) ---------- */
function setAudioStateImmediate(muted) {
  try { sessionStorage.setItem('audioMuted', muted ? 'true' : 'false'); } catch (e) { }
  window.audioMuted = muted;

  const htmlVideos = Array.from(document.querySelectorAll('.scroll-container video'));
  htmlVideos.forEach((v, i) => {
    try {
      v.muted = muted ? true : (i === 0 ? false : true);
      if (!muted && i === 0) {
        try { v.play().catch(() => { }); } catch (e) { }
      }
    } catch (e) { }
  });

  // Vimeo players: setVolume / setMuted immediatamente (devono essere chiamati dentro il click)
  if (window._vimeoPlayers && window._vimeoPlayers.length) {
    window._vimeoPlayers.forEach((p, i) => {
      try {
        if (!muted && i === 0) {
          if (typeof p.setVolume === 'function') {
            p.setVolume(1).catch(() => { });
          } else if (typeof p.setMuted === 'function') {
            p.setMuted(false).catch(() => { });
          }
          if (typeof p.play === 'function') p.play().catch(() => { });
        } else {
          if (typeof p.setVolume === 'function') {
            p.setVolume(0).catch(() => { });
          } else if (typeof p.setMuted === 'function') {
            p.setMuted(true).catch(() => { });
          }
        }
      } catch (e) { }
    });
  }
}

function setupAudioToggle() {
  applyAudioStateToVideos();

  if (window._audioClickBound) return;
  const audioStatus = document.getElementById('audio-status');

  document.addEventListener('click', (ev) => {
    if (ev.target.closest('a, button, input, textarea, select, #image-gallery')) return;

    const newState = !window.audioMuted;
    setAudioStateImmediate(newState);
    setAudioMuted(newState);

    if (audioStatus) {
      audioStatus.textContent = window.audioMuted ? 'AUDIO OFF' : 'AUDIO ON';
      audioStatus.style.color = window.audioMuted ? 'red' : 'white';
      audioStatus.style.mixBlendMode = window.audioMuted ? 'normal' : 'difference';
      audioStatus.style.opacity = '1';
      setTimeout(() => { audioStatus.style.opacity = '0'; }, 2000);
    }

  });

  window._audioClickBound = true;
}


/* ---------- loadProject (solo Vimeo + immagini) ---------- */
function loadProject(projectId) {
  const project = PROJECTS[String(projectId)] || PROJECTS["1"];

  const titleEl = document.getElementById('project-title');
  const yearEl = document.getElementById('project-year');
  const extraEl = document.getElementById('project-extra');
  const descEl = document.getElementById('description-content');
  const scrollContainer = document.querySelector('.scroll-container');
  const descButton = document.getElementById('description-button');
  const buttonLabel = descButton ? descButton.querySelector('.button-label') : null;

  if (!titleEl || !yearEl || !descEl || !scrollContainer) return;

  titleEl.innerHTML = project.title.replace(/\n/g, '<br>');
  yearEl.textContent = project.year;
  if (extraEl) extraEl.innerHTML = project.extraInfo || '';
  if (descEl) descEl.innerHTML = project.description || '';

  destroyVimeoPlayers();

  scrollContainer.innerHTML = '';
  project.images.forEach((src, idx) => {
    const section = createMediaSection(src, project.title, idx);
    scrollContainer.appendChild(section);
  });

  initVimeoPlayers(scrollContainer);

  if (typeof window.currentImageIndex !== 'undefined') window.currentImageIndex = 0;
  const sections = scrollContainer.querySelectorAll('.image-section');
  if (sections.length) {
    sections.forEach(s => s.classList.remove('active'));
    sections[0].classList.add('active');
  }

  const prevAudioState = sessionStorage.getItem("audioMuted");

  applyAudioStateToVideos();

  const hasVimeo = project.images.some(src => !!extractVimeoId(src));
  if (hasVimeo && prevAudioState === "false") {
    const audioStatus = document.getElementById("audio-status");
    if (audioStatus) {
      audioStatus.textContent = "AUDIO OFF";
      audioStatus.style.color = "red";
      audioStatus.style.mixBlendMode = "normal";
      audioStatus.style.opacity = "1";
      setTimeout(() => { audioStatus.style.opacity = "0"; }, 2000);
    }
  }

  requestAnimationFrame(() => {
    if (typeof scrollContainer.scrollTo === 'function') {
      scrollContainer.scrollTo({ left: 0, top: 0, behavior: 'auto' });
    } else {
      scrollContainer.scrollLeft = 0; scrollContainer.scrollTop = 0;
    }
  });

  const gallery = document.getElementById('image-gallery');
  if (gallery) {
    gallery.querySelectorAll('.project-item').forEach(a => {
      const id = a.dataset.id;
      const name = a.querySelector('.project-name');
      const info = a.querySelector('.project-info');
      if (String(id) === String(project.id)) {
        if (name) name.classList.add('project-active');
        if (info) info.classList.add('project-active');
      } else {
        if (name) name.classList.remove('project-active');
        if (info) info.classList.remove('project-active');
      }
    });
  }

  try { sessionStorage.setItem('lastProject', String(project.id)); } catch (e) { }

  applyAudioStateToVideos();
  setupAudioToggle();

  // description handling (come prima)
  if (descButton && descButton.classList.contains('open')) {
    descEl.style.maxHeight = descEl.scrollHeight + 'px';
    descButton.setAttribute('aria-expanded', 'true');
    if (buttonLabel) buttonLabel.textContent = 'CLOSE';
  } else {
    descEl.style.maxHeight = '0px';
    if (descButton) {
      descButton.classList.remove('open');
      descButton.setAttribute('aria-expanded', 'false');
    }
    if (buttonLabel) buttonLabel.textContent = 'DESCRIPTION';
  }
}

/* ---------- wire project links, init, animations e UI (preservati) ---------- */
function wireProjectListLinks() {
  const gallery = document.getElementById('image-gallery');
  if (!gallery) return;
  gallery.querySelectorAll('.project-item').forEach(a => {
    a.addEventListener('click', function (ev) {
      if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
      ev.preventDefault();
      const id = a.dataset.id || (new URL(a.href, location.href).searchParams.get('project'));
      if (id) {
        history.pushState({ project: id }, '', `?project=${id}`);
        loadProject(id);
      }
    });
  });
}

function initProjectFromUrlOrSession() {
  const params = new URLSearchParams(window.location.search);
  const urlProj = params.get('project');
  const last = sessionStorage.getItem('lastProject');
  const start = urlProj || last || "1";
  loadProject(start);
}

/* animateText, toggles, cursor, description toggle etc. (mantengo come prima) */
function animateText(element, newText, duration, callback) {
  let currentText = element.textContent;
  const maxLength = Math.max(currentText.length, newText.length);
  currentText = currentText.padEnd(maxLength, " ");
  newText = newText.padEnd(maxLength, " ");

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

/* ---------- DOMContentLoaded: init generale ---------- */
document.addEventListener("DOMContentLoaded", () => {
  window.audioMuted = getAudioMuted();

  wireProjectListLinks();
  initProjectFromUrlOrSession();

  setupAudioToggle();

  const gallery = document.getElementById("image-gallery");
  const projectLink = document.querySelector("#nav-project a");
  const isMobile = window.innerWidth <= 769;

  if (gallery && projectLink && sessionStorage.getItem("galleryOpen") === "true") {
    projectLink.style.transition = "none";
    projectLink.style.transform = isMobile ? "translateX(-32vw)" : "translateX(-16vw)";
    gallery.classList.remove("hidden");
    gallery.classList.add("visible");
    projectLink.textContent = "CLOSE";
    requestAnimationFrame(() => { projectLink.style.transition = ""; });
  }

  const navName = document.getElementById("nav-name");
  if (navName) { navName.style.opacity = "1"; navName.style.transition = "opacity 0s ease"; }

  const navContainer = document.querySelector('.nav-info');
  const navHomeLink = navContainer ? navContainer.querySelector('#nav-home a') : null;
  if (navContainer && navHomeLink) {
    if (sessionStorage.getItem("fromHome") === "true") {
      animateText(navHomeLink, "HOME", 2000, () => {
        setTimeout(() => {
          const bottomCont = document.querySelector("#bottom-cont");
          const bottomContInfo = document.querySelector("#bottom-cont-info");
          if (bottomCont) { bottomCont.style.opacity = "1"; bottomContInfo.style.opacity = "1"; }
        }, 500);
      });
      sessionStorage.removeItem("fromHome");
    } else {
      navHomeLink.textContent = "HOME";
      navContainer.style.opacity = "1";
    }
  }

  setTimeout(() => {
    try { document.querySelector(".scroll-container").style.opacity = "1"; } catch (e) { }
    try { document.querySelector(".project-description").style.opacity = "1"; } catch (e) { }
  }, 500);

  document.querySelectorAll('img, iframe').forEach(el => {
    el.addEventListener('contextmenu', (e) => e.preventDefault());
  });
});

/* COORDINATE CURSOR - track sempre, mostra cursor solo su non-touch (project page) */
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".custom-cursor");
  if (!cursor) {
  }

  const isTouchDevice = document.documentElement.classList.contains('is-touch') ||
    ('ontouchstart' in window) ||
    (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0) ||
    (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

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
    if (cursor) cursor.style.transition = "transform 0.3s ease", cursor.style.transform = "translate(-50%, -50%) rotate(135deg)";
  }
  function onPointerUp(e) {
    if (e.pointerType && e.pointerType === 'touch') return;
    if (cursor) cursor.style.transition = "transform 0.3s ease", cursor.style.transform = "translate(-50%, -50%) rotate(0deg)";
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

/* helper: aggiorna gli angoli (se non presente, aggiungi; altrimenti mantieni la tua versione) */
function updateCoordinates(x, y) {
  const w = window.innerWidth, h = window.innerHeight;
  const tl = document.querySelector(".top-left"), tr = document.querySelector(".top-right");
  const bl = document.querySelector(".bottom-left"), br = document.querySelector(".bottom-right");
  if (tl) tl.textContent = String(Math.floor((x / w) * 99)).padStart(2, '0');
  if (tr) tr.textContent = String(Math.floor((y / h) * 99)).padStart(2, '0');
  if (bl) bl.textContent = String(Math.floor(((w - x) / w) * 99)).padStart(2, '0');
  if (br) br.textContent = String(Math.floor(((h - y) / h) * 99)).padStart(2, '0');
}

/* description toggle (preservato) */
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("description-button");
  if (!button) return;
  const buttonLabel = button.querySelector(".button-label");
  const content = document.getElementById("description-content");
  if (!buttonLabel || !content) return;

  button.setAttribute("aria-expanded", "false");
  content.style.maxHeight = "0px";
  content.style.overflow = "hidden";
  content.style.transition = "max-height 0.6s var(--transition-ease-in-out)";

  button.addEventListener("click", () => {
    const willOpen = !button.classList.contains("open");
    button.classList.toggle("open", willOpen);
    button.setAttribute("aria-expanded", String(willOpen));

    const isMobile = window.innerWidth <= 769;
    const sc = document.querySelector('.scroll-container');

    if (isMobile && sc) {
      sc.classList.toggle('dimmed', willOpen);
    }

    const coords = document.querySelector('.corner-values-info') || document.querySelector('.corner-values');
    if (isMobile && coords) {
      if (willOpen) {
        coords.style.transition = 'filter 0.25s ease';
        coords.style.webkitFilter = 'blur(4px) brightness(0.6)';
        coords.style.filter = 'blur(4px) brightness(0.6)';
      } else {
        coords.style.filter = '';
        coords.style.webkitFilter = '';
      }
    }

    if (willOpen) {
      animateText(buttonLabel, "CLOSE", 600);
      requestAnimationFrame(() => { content.style.maxHeight = content.scrollHeight + "px"; });
    } else {
      animateText(buttonLabel, "DESCRIPTION", 600);
      content.style.maxHeight = "0px";
    }
  });

  window.addEventListener("resize", () => {
    if (button.classList.contains("open")) content.style.maxHeight = content.scrollHeight + "px";
  });
});

function toggleImageGallery(forceState) {
  const gallery = document.getElementById("image-gallery");
  const projectLink = document.querySelector("#nav-project a");
  const isMobile = window.innerWidth <= 769;
  const visible = gallery.classList.contains("visible");
  const willOpen = (typeof forceState === 'boolean') ? forceState : !visible;

  if (willOpen) {
    projectLink.style.transform = isMobile ? "translateX(-32vw)" : "translateX(-16vw)";
    animateText(projectLink, "CLOSE", 2000);
    setTimeout(() => {
      gallery.classList.remove("hidden"); gallery.classList.add("visible");
      try { sessionStorage.setItem('galleryOpen', 'true'); } catch (e) { }
    }, 2000);
  } else {
    projectLink.style.transform = "translateX(0)";
    animateText(projectLink, "PROJECT", 2000);
    gallery.classList.remove("visible"); gallery.classList.add("hidden");
    try { sessionStorage.removeItem('galleryOpen'); } catch (e) { }
  }
}

window.addEventListener('popstate', function () {
  const params = new URLSearchParams(window.location.search);
  const proj = params.get('project') || sessionStorage.getItem('lastProject') || "1";
  loadProject(proj);
});

document.addEventListener('dragstart', e => e.preventDefault());