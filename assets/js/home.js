// Single-page hydration:
//   1. Renders all projects into #projects-grid
//   2. Sets today's date in #today
//   3. Wires the labs "View more" toggle
//   4. Highlights the nav link matching the section currently in view

(function () {
  // Projects grid — render everything (no top-N truncation)
  const projectsGrid = document.getElementById('projects-grid');
  if (projectsGrid && window.PROJECTS && window.renderProjectCard) {
    projectsGrid.innerHTML = window.PROJECTS.map(window.renderProjectCard).join('');
  }

  // Auto-updating date
  const dateEl = document.getElementById('today');
  if (dateEl) {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = [
      'January','February','March','April','May','June',
      'July','August','September','October','November','December'
    ];
    const d = new Date();
    dateEl.textContent = `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  // About "Read more" toggle — brief summary shown; full bio hidden until expanded
  const aboutFull = document.querySelector('.about-bio--full');
  const aboutToggle = document.getElementById('about-toggle');
  if (aboutFull && aboutToggle) {
    aboutToggle.addEventListener('click', () => {
      const expanded = !aboutFull.hasAttribute('hidden') ? false : true;
      if (expanded) {
        aboutFull.removeAttribute('hidden');
        aboutToggle.innerHTML = 'Hide connection <span class="btn__arrow">&uarr;</span>';
      } else {
        aboutFull.setAttribute('hidden', '');
        aboutToggle.innerHTML = 'Read connection <span class="btn__arrow">&darr;</span>';
      }
    });
  }

  // Labs "View more" toggle — first 3 shown, rest hidden until expanded
  bindGridToggle('labs-grid', 'labs-toggle', 'labs');
  // Projects "View more" toggle — first 3 shown, rest hidden until expanded
  bindGridToggle('projects-grid', 'projects-toggle', 'projects');

  function bindGridToggle(gridId, toggleId, sectionId) {
    const grid = document.getElementById(gridId);
    const toggle = document.getElementById(toggleId);
    if (!grid || !toggle) return;
    toggle.addEventListener('click', () => {
      const collapsed = grid.classList.toggle('is-collapsed');
      toggle.innerHTML = collapsed
        ? 'View more <span class="btn__arrow">&darr;</span>'
        : 'Show fewer <span class="btn__arrow">&uarr;</span>';
      if (collapsed) {
        const section = document.getElementById(sectionId);
        section && section.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    });
  }

  // Contact form — click the email link to reveal the message box
  const emailToggle = document.getElementById('email-toggle');
  const contactForm = document.getElementById('contact-form');
  if (emailToggle && contactForm) {
    emailToggle.style.cursor = 'pointer';
    emailToggle.addEventListener('click', (e) => {
      e.preventDefault();
      contactForm.removeAttribute('hidden');
      emailToggle.setAttribute('aria-expanded', 'true');
      contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      contactForm.querySelector('input[name="name"]')?.focus({ preventScroll: true });
    });
  }
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = contactForm.querySelector('.contact-form__status');
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtn = submitBtn.innerHTML;
      status.className = 'contact-form__status';
      status.textContent = 'Sending…';
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending…';
      try {
        const body = new URLSearchParams(new FormData(contactForm)).toString();
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        status.className = 'contact-form__status contact-form__status--ok';
        status.textContent = 'Message sent. I will reply to your email.';
        contactForm.reset();
      } catch (err) {
        status.className = 'contact-form__status contact-form__status--error';
        status.textContent = 'Something went wrong. Please try again or email me directly.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtn;
      }
    });
  }

  // Active-section nav highlight
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const linkByHash = new Map();
    navLinks.forEach(a => linkByHash.set(a.getAttribute('href'), a));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(a => a.classList.remove('is-active'));
          const active = linkByHash.get('#' + entry.target.id);
          if (active) active.classList.add('is-active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(s => observer.observe(s));
  }
})();
