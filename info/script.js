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
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".custom-cursor");
  document.addEventListener("mousemove", (e) => {
    document.querySelector(".custom-cursor").style.opacity = "1";
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) rotate(135deg)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) rotate(0deg)";
    });
  });
  document.addEventListener("mousedown", () => {
    cursor.style.transition = "transform 0.3s ease";
    cursor.style.transform = "translate(-50%, -50%) rotate(135deg)";
  });

  document.addEventListener("mouseup", () => {
    cursor.style.transition = "transform 0.3s ease";
    cursor.style.transform = "translate(-50%, -50%) rotate(0deg)";
  });
});

document.addEventListener("mousemove", (e) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  document.querySelector(".top-left").textContent = String(Math.floor((e.clientX / width) * 99)).padStart(2, '0');
  document.querySelector(".top-right").textContent = String(Math.floor((e.clientY / height) * 99)).padStart(2, '0');
  document.querySelector(".bottom-left").textContent = String(Math.floor(((width - e.clientX) / width) * 99)).padStart(2, '0');
  document.querySelector(".bottom-right").textContent = String(Math.floor(((height - e.clientY) / height) * 99)).padStart(2, '0');
});

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