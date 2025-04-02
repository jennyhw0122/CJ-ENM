document.addEventListener("DOMContentLoaded", () => {
  // Lenis 스크롤
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Fade-in Observer
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade-in").forEach((el) => {
    fadeObserver.observe(el);
  });

  // Theme 변경
  const root = document.documentElement;
  const toggleBtn = document.getElementById("theme-dropdown-btn");
  const dropdown = document.getElementById("theme-dropdown");
  const themeItems = dropdown?.querySelectorAll("li");

  toggleBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("open");
  });

  themeItems?.forEach((item) => {
    item.addEventListener("click", () => {
      const selectedTheme = item.getAttribute("data-theme");
      root.setAttribute("data-theme", selectedTheme);
      localStorage.setItem("theme", selectedTheme);

      themeItems.forEach((el) => el.classList.remove("active"));
      item.classList.add("active");
      dropdown.classList.remove("open");
    });
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && !toggleBtn.contains(e.target)) {
      dropdown.classList.remove("open");
    }
  });

  // 숫자 애니메이션
  function animateScore(el, target, duration = 1000) {
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const count = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const current = (target * progress).toFixed(2);
      el.textContent = current;

      if (frame === totalFrames) {
        el.textContent = target.toFixed(2);
        clearInterval(count);
      }
    }, frameRate);
  }

  // 도넛 애니메이션
  function animateDonut(container) {
    const value = parseFloat(container.dataset.value);
    const segment = container.querySelector(".donut-segment");
    const percent = container.querySelector(".donut-percent");

    let frame = 0;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(1000 / frameRate);

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const current = (value * progress).toFixed(1);

      segment.setAttribute("stroke-dasharray", `${current} ${100 - current}`);
      percent.textContent = `${current}%`;

      if (frame === totalFrames) {
        percent.textContent = `${value}%`;
        clearInterval(counter);
      }
    }, frameRate);
  }

  // 스크롤 트리거
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 숫자
        document.querySelectorAll(".score").forEach((score) => {
          const target = parseFloat(score.dataset.score);
          animateScore(score, target);
        });

        // 도넛
        const donut = document.querySelector(".donut-container");
        if (donut) animateDonut(donut);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const section = document.querySelector(".user-insight");
  if (section) observer.observe(section);
});