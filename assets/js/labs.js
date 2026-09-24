// Renders lab cards from window.LABS into #labs-grid.
// Similar shape to portfolio cards, but with course/date metadata,
// themed animated covers, PDF-open buttons, and optional group credit.

(function () {
  const grid = document.getElementById('labs-grid');
  if (!grid || !window.LABS) return;

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
  }

  function renderCover(coverType, number) {
    const type = coverType || 'default';
    // The visual is a themed <div> with CSS-driven animation.
    // Each variant is defined in styles.css under .lab-cover--*.
    return `
      <div class="lab-cover lab-cover--${escapeHtml(type)}" aria-hidden="true">
        <span class="lab-cover__num">N&ordm;&nbsp;${escapeHtml(number)}</span>
      </div>
    `;
  }

  function renderLinks(entry) {
    const links = [];
    if (entry.pdf) {
      links.push(`<a class="lab__link" href="${escapeHtml(entry.pdf)}" target="_blank" rel="noopener">Read PDF &rarr;</a>`);
    } else if (!Array.isArray(entry.downloads) || !entry.downloads.length) {
      links.push(`<span class="lab__link lab__link--pending">PDF coming soon</span>`);
    }
    if (Array.isArray(entry.downloads) && entry.downloads.length) {
      links.push(`
        <details class="lab__downloads">
          <summary>Downloads (${entry.downloads.length})</summary>
          <ul>
            ${entry.downloads.map((d) => (
              `<li><a href="${escapeHtml(d.path)}" download>${escapeHtml(d.label)}</a></li>`
            )).join('')}
          </ul>
        </details>
      `);
    }
    return `<div class="lab__links">${links.join('')}</div>`;
  }

  const cards = window.LABS.map((lab) => {
    const meta = [
      lab.course ? escapeHtml(lab.course) : '',
      lab.date   ? escapeHtml(lab.date)   : ''
    ].filter(Boolean).join(' &middot; ');

    const tagsHtml = (lab.tags && lab.tags.length)
      ? `<div class="lab__tags">${lab.tags.map((t) => `<span>${escapeHtml(t)}</span>`).join('')}</div>`
      : '';

    const creditHtml = lab.credit
      ? `<p class="lab__credit">${escapeHtml(lab.credit)}</p>`
      : '';

    return `
      <article class="lab">
        ${renderCover(lab.coverType, lab.number)}
        <div class="lab__body">
          <p class="lab__meta">${meta}</p>
          <h3 class="lab__title">${escapeHtml(lab.title)}</h3>
          ${lab.subtitle ? `<p class="lab__subtitle">${escapeHtml(lab.subtitle)}</p>` : ''}
          <p class="lab__desc">${escapeHtml(lab.description)}</p>
          ${tagsHtml}
          ${creditHtml}
          ${renderLinks(lab)}
        </div>
      </article>
    `;
  }).join('');

  grid.innerHTML = cards;
})();
