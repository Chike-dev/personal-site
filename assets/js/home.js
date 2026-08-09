// Home page hydration:
//   1. Renders the top 3 projects into #featured-grid.
//   2. Fills in today's date in #today.

(function () {
  // Featured project cards
  const grid = document.getElementById('featured-grid');
  if (grid && window.PROJECTS && window.renderProjectCard) {
    grid.innerHTML = window.PROJECTS.slice(0, 3).map(window.renderProjectCard).join('');
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
})();
