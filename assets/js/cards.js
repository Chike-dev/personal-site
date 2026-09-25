// Shared project card renderer, used by both the home page and portfolio page.

window.renderProjectCard = function (p) {
  const escapeHtml = (str) => String(str).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  const num = escapeHtml(p.number || '');
  const title = escapeHtml(p.title || 'Untitled');
  const descHtml = p.description
    ? `<p class="deck__desc">${escapeHtml(p.description)}</p>`
    : '';
  const statusHtml = p.status
    ? `<p class="deck__status"><span class="deck__status-dot" aria-hidden="true"></span>${escapeHtml(p.status)}&hellip;</p>`
    : '';

  const image = p.image
    ? `<img class="deck__image" src="${escapeHtml(p.image)}" alt="${title}">`
    : `<div class="deck__image deck__image--empty">N&ordm;&nbsp;${num}</div>`;

  const tags = (p.tags && p.tags.length)
    ? `<div class="deck__tags">${p.tags.map((t) => `<span>${escapeHtml(t)}</span>`).join('')}</div>`
    : '';

  const links = [];
  if (p.github) links.push(`<a href="${escapeHtml(p.github)}" target="_blank" rel="noopener">GitHub &rarr;</a>`);
  if (p.live)   links.push(`<a href="${escapeHtml(p.live)}" target="_blank" rel="noopener">Live &nearr;</a>`);
  const linksHtml = links.length ? `<div class="deck__links">${links.join('')}</div>` : '';

  return `
    <article class="deck">
      ${image}
      <div class="deck__body">
        <p class="deck__num">N&ordm;&nbsp;${num}</p>
        <h3 class="deck__title">${title}</h3>
        ${statusHtml}
        ${descHtml}
        ${tags}
        ${linksHtml}
      </div>
    </article>
  `;
};
