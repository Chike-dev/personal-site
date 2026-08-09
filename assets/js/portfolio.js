// Renders all portfolio deck cards from window.PROJECTS into #deck-grid.

(function () {
  const grid = document.getElementById('deck-grid');
  if (!grid || !window.PROJECTS || !window.renderProjectCard) return;
  grid.innerHTML = window.PROJECTS.map(window.renderProjectCard).join('');
})();
