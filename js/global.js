document.addEventListener('DOMContentLoaded', () => {
  // Lenis
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Fade-in
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Scroll Section
  const scrollSection = document.querySelector(".scroll-top-section");
  if (scrollSection) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollSection.classList.add("visible");
      } else {
        scrollSection.classList.remove("visible");
      }
    });
  }

  // Theme toggle
  const root = document.documentElement;
  const toggleBtn = document.getElementById('theme-dropdown-btn');
  const dropdown = document.getElementById('theme-dropdown');
  const themeItems = dropdown?.querySelectorAll('li');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
    themeItems?.forEach(el => {
      if (el.getAttribute('data-theme') === savedTheme) {
        el.classList.add('active');
      }
    });
  }

  toggleBtn?.addEventListener('click', () => {
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  });

  themeItems?.forEach(item => {
    item.addEventListener('click', () => {
      const selectedTheme = item.getAttribute('data-theme');
      root.setAttribute('data-theme', selectedTheme);
      localStorage.setItem('theme', selectedTheme);

      themeItems.forEach(el => el.classList.remove('active'));
      item.classList.add('active');
      dropdown.style.display = 'none';
    });
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && e.target !== toggleBtn) {
      dropdown.style.display = 'none';
    }
  });
});