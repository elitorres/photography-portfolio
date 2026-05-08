const images = [
  { src: 'images/IMG_1584.jpg', caption: 'IMG_1584 — Urban Street' },
  { src: 'images/IMG_1531.jpg', caption: 'IMG_1531 — City Bridge' },
  { src: 'images/IMG_1541.jpg', caption: 'IMG_1541 — Architecture' },
  { src: 'images/IMG_1555.jpg', caption: 'IMG_1555 — Canal & River' },
  { src: 'images/IMG_1562.jpg', caption: 'IMG_1562 — Urban Garden' },
  { src: 'images/IMG_1566.jpg', caption: 'IMG_1566 — Downtown' },
  { src: 'images/IMG_1570.jpg', caption: 'IMG_1570 — Street Scene' },
  { src: 'images/IMG_1574.jpg', caption: 'IMG_1574 — City Road' },
  { src: 'images/IMG_1589.jpg', caption: 'IMG_1589 — Yellow Cab' },
  { src: 'images/IMG_1612.jpg', caption: 'IMG_1612 — Floral Detail' },
  { src: 'images/IMG_1615.jpg', caption: 'IMG_1615 — City Street' },
  { src: 'images/IMG_1616.jpg', caption: 'IMG_1616 — Urban Landscape' },
  { src: 'images/IMG_1622.jpg', caption: 'IMG_1622 — Urban Scene' },
  { src: 'images/IMG_1627.jpg', caption: 'IMG_1627 — Urban Scene' },
  { src: 'images/IMG_1636.jpg', caption: 'IMG_1636 — City Bridge' },
];

let activeIndex = 0;

function setFeatured(index, thumbEls, featuredImg, captionEl) {
  const wrap = featuredImg.closest('.featured-wrap');
  wrap.classList.add('loading');

  const newImg = new Image();
  newImg.src = images[index].src;
  newImg.onload = () => {
    featuredImg.src = images[index].src;
    if (captionEl) captionEl.textContent = images[index].caption;
    wrap.classList.remove('loading');
  };

  thumbEls.forEach((t, i) => t.classList.toggle('active', i === index));
  activeIndex = index;
}

document.addEventListener('DOMContentLoaded', () => {
  // ── Gallery page ──────────────────────────────────
  const featuredImg = document.getElementById('featured-img');
  if (featuredImg) {
    const captionEl = document.getElementById('featured-caption');
    const grid = document.getElementById('thumb-grid');
    const lightboxEl = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    const thumbEls = images.map((img, i) => {
      const div = document.createElement('div');
      div.className = 'thumb' + (i === 0 ? ' active' : '');
      div.innerHTML = `<img src="${img.src}" alt="${img.caption}" loading="lazy">`;
      div.addEventListener('click', () => setFeatured(i, thumbEls, featuredImg, captionEl));
      grid.appendChild(div);
      return div;
    });

    // Open lightbox on featured image click
    featuredImg.style.cursor = 'zoom-in';
    featuredImg.addEventListener('click', () => {
      lightboxImg.src = images[activeIndex].src;
      lightboxEl.classList.add('open');
    });

    // Close lightbox
    lightboxEl.addEventListener('click', (e) => {
      if (e.target === lightboxEl || e.target.classList.contains('lightbox-close')) {
        lightboxEl.classList.remove('open');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') lightboxEl.classList.remove('open');
      if (e.key === 'ArrowRight' && lightboxEl.classList.contains('open')) {
        const next = (activeIndex + 1) % images.length;
        setFeatured(next, thumbEls, featuredImg, captionEl);
        lightboxImg.src = images[next].src;
      }
      if (e.key === 'ArrowLeft' && lightboxEl.classList.contains('open')) {
        const prev = (activeIndex - 1 + images.length) % images.length;
        setFeatured(prev, thumbEls, featuredImg, captionEl);
        lightboxImg.src = images[prev].src;
      }
    });
  }

  // ── Home page strip ───────────────────────────────
  const homeGrid = document.getElementById('home-thumb-grid');
  if (homeGrid) {
    images.slice(1, 7).forEach((img) => {
      const div = document.createElement('div');
      div.className = 'thumb';
      div.innerHTML = `<img src="${img.src}" alt="${img.caption}" loading="lazy">`;
      div.addEventListener('click', () => {
        window.location.href = `gallery.html#gallery`;
      });
      homeGrid.appendChild(div);
    });
  }

  // ── Active nav link ───────────────────────────────
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
});
