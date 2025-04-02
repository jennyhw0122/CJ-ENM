// ------------------------------
// Lenis 부드러운 스크롤 (선택)
// ------------------------------
if (window.Lenis) {
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
}

// ------------------------------
// Fade-in Observer
// ------------------------------
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".fade-in").forEach((el) => fadeObserver.observe(el));

// ------------------------------
// 다크모드 드롭다운 (로컬스토리지 기반)
// ------------------------------
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

// 외부 클릭 시 드롭다운 닫기
document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target) && !toggleBtn.contains(e.target)) {
    dropdown.classList.remove("open");
  }
});

// ------------------------------
// 도넛 애니메이션
// ------------------------------
function animateDonut(container) {
  const value = parseFloat(container.dataset.value);
  const circle = container.querySelector('.donut-segment');
  const label = container.querySelector('.donut-percent');

  const radius = 15.915;
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = `${circumference}`;
  circle.style.strokeDashoffset = circumference;

  let current = 0;
  const interval = setInterval(() => {
    if (current >= value) {
      label.textContent = `${value.toFixed(1)}%`;
      clearInterval(interval);
    } else {
      current += 0.5;
      label.textContent = `${current.toFixed(1)}%`;
    }
    const offset = circumference - (current / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }, 20);
}

// ------------------------------
// 정량 점수 애니메이션
// ------------------------------
function animateScore(el, target) {
  let current = 0;
  const interval = setInterval(() => {
    if (current >= target) {
      el.textContent = target.toFixed(2);
      clearInterval(interval);
    } else {
      current += 0.05;
      el.textContent = current.toFixed(2);
    }
  }, 20);
}

// ------------------------------
// 사용자 조사 영역 진입 시 실행
// ------------------------------
const insightObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains("animated")) {
      entry.target.classList.add("animated");

      const donut = entry.target.querySelector(".donut-container");
      if (donut) animateDonut(donut);

      entry.target.querySelectorAll(".score").forEach(score => {
        const target = parseFloat(score.dataset.score);
        animateScore(score, target);
      });

      insightObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".insight-card").forEach(card => insightObserver.observe(card));

// ------------------------------
// 저장된 테마 불러오기
// ------------------------------
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
  themeItems?.forEach((item) => {
    item.classList.toggle("active", item.getAttribute("data-theme") === savedTheme);
  });
}