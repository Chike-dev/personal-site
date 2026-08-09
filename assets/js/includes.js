// Loads partials referenced by <div data-include="path/to/file.html"></div>,
// then hydrates site info into any [data-hydrate="key"] elements, marks the
// active nav link, and wires up the theme toggle button.

async function loadIncludes() {
  const nodes = document.querySelectorAll('[data-include]');
  await Promise.all([...nodes].map(async (el) => {
    const path = el.getAttribute('data-include');
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(res.status);
      const html = await res.text();
      el.outerHTML = html;
    } catch (e) {
      console.warn('include failed:', path, e);
    }
  }));

  hydrateSite();
  markActiveNav();
  bindThemeToggle();
}

function hydrateSite() {
  if (!window.SITE) return;
  document.querySelectorAll('[data-hydrate]').forEach(el => {
    const key = el.getAttribute('data-hydrate');
    const val = window.SITE[key];
    if (val == null) { el.remove(); return; }

    if (el.tagName === 'A') {
      if (key === 'email') {
        el.href = 'mailto:' + val;
        el.textContent = val;
      } else if (typeof val === 'object' && val.url) {
        el.href = val.url;
        el.textContent = val.handle || val.url;
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
      } else {
        el.href = val;
        el.textContent = val;
      }
    } else {
      el.textContent = typeof val === 'object' ? (val.handle || val.url) : val;
    }
  });
}

function markActiveNav() {
  let page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (page === '') page = 'index.html';
  document.querySelectorAll('.nav__links a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === page) a.classList.add('is-active');
  });
}

function bindThemeToggle() {
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', () => window.toggleTheme && window.toggleTheme());
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadIncludes);
} else {
  loadIncludes();
}
