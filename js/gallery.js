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

document.addEventListener('DOMContentLoaded', () => {
  // ── Gallery collage ───────────────────────────────
  const collage = document.getElementById('collage');
  if (collage) {
    const lightboxEl = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    images.forEach((img, i) => {
      const item = document.createElement('div');
      item.className = 'collage-item';
      item.innerHTML = `<img src="${img.src}" alt="${img.caption}" loading="${i < 6 ? 'eager' : 'lazy'}">`;
      item.addEventListener('click', () => {
        activeIndex = i;
        lightboxImg.src = img.src;
        lightboxEl.classList.add('open');
      });
      collage.appendChild(item);
    });

    // Close lightbox
    lightboxEl.addEventListener('click', (e) => {
      if (e.target === lightboxEl || e.target.classList.contains('lightbox-close')) {
        lightboxEl.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!lightboxEl.classList.contains('open')) return;
      if (e.key === 'Escape') lightboxEl.classList.remove('open');
      if (e.key === 'ArrowRight') {
        activeIndex = (activeIndex + 1) % images.length;
        lightboxImg.src = images[activeIndex].src;
      }
      if (e.key === 'ArrowLeft') {
        activeIndex = (activeIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[activeIndex].src;
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
