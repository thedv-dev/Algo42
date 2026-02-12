document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('nav')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // Fade-in animation on scroll
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Gallery Filter Functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryGrids = document.querySelectorAll('.gallery-grid');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        galleryGrids.forEach(grid => {
          const category = grid.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            grid.style.display = 'grid';
          } else {
            grid.style.display = 'none';
          }
        });
      });
    });
  }
});

// Lightbox functions (global for onclick attributes)
function openLightbox(src, caption, isVideo = false) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const video = document.getElementById('lightbox-video');
  const captionEl = document.getElementById('lightbox-caption');

  if (!lightbox) return;

  if (isVideo) {
    if (img) img.style.display = 'none';
    if (video) {
      video.style.display = 'block';
      video.src = src;
    }
  } else {
    if (video) {
      video.style.display = 'none';
      video.pause();
    }
    if (img) {
      img.style.display = 'block';
      img.src = src;
      img.alt = caption;
    }
  }

  if (captionEl) captionEl.textContent = caption;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  const video = document.getElementById('lightbox-video');

  if (lightbox) {
    lightbox.classList.remove('active');
    if (video) video.pause();
    document.body.style.overflow = 'auto';
  }
}

// Close lightbox on background click or Escape key
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target.id === 'lightbox') {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
});
