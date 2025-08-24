(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.menu-toggle');
    const nav = document.getElementById('site-nav');
    if (menuButton && nav) {
      menuButton.addEventListener('click', function() {
        const isOpen = nav.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(isOpen));
      });
    }

    // Active nav link
    const currentPath = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.site-nav a').forEach(function(link) {
      const linkPath = link.getAttribute('href') || '';
      if (linkPath.endsWith(currentPath)) {
        link.classList.add('active');
      }
    });

    // Footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    const base = document.body.getAttribute('data-base') || '.';

    // Shows grid renderer
    const showsGrid = document.getElementById('shows-grid');
    if (showsGrid) {
      const limitAttr = Number(showsGrid.getAttribute('data-limit') || '0');
      fetch(`${base}/data/shows.json`, { cache: 'no-cache' })
        .then(function(r) { return r.json(); })
        .then(function(data) {
          const shows = Array.isArray(data.shows) ? data.shows : [];
          const toRender = limitAttr > 0 ? shows.slice(0, limitAttr) : shows;
          showsGrid.innerHTML = toRender.map(function(show) {
            const thumb = show.thumbnail || `${base}/assets/images/logo.svg`;
            return (
              `<article class="card">` +
              `  <div class="card-media">` +
              `    <img src="${thumb}" alt="${escapeHtml(show.title)}">` +
              `  </div>` +
              `  <div class="card-body">` +
              `    <h3 class="card-title">${escapeHtml(show.title)}</h3>` +
              `    <p class="card-text">${escapeHtml(show.description || '')}</p>` +
              `  </div>` +
              `</article>`
            );
          }).join('');
        })
        .catch(function(err) { console.error('Failed to load shows', err); });
    }

    // Schedule renderer
    const scheduleList = document.getElementById('schedule-list');
    if (scheduleList) {
      fetch(`${base}/data/shows.json`, { cache: 'no-cache' })
        .then(function(r) { return r.json(); })
        .then(function(data) {
          const showsById = new Map();
          (data.shows || []).forEach(function(show) { showsById.set(show.id, show); });
          const schedule = Array.isArray(data.schedule) ? data.schedule : [];
          scheduleList.innerHTML = schedule.map(function(slot) {
            const show = showsById.get(slot.showId) || { title: 'TBA' };
            return (
              `<tr>` +
              `  <td>${escapeHtml(slot.time)}</td>` +
              `  <td>${escapeHtml(show.title)}</td>` +
              `</tr>`
            );
          }).join('');
        })
        .catch(function(err) { console.error('Failed to load schedule', err); });
    }

    // Service worker registration
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(`${base}/service-worker.js`).catch(function(err) {
        console.warn('SW registration failed', err);
      });
    }
  });

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
})();