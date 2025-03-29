document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".custom-cursor");
  const cursorText = cursor.querySelector(".cursor-text");
  const hoverTargets = document.querySelectorAll(".hover-target");

  document.addEventListener("mousemove", (e) => {
    cursor.style.display = "flex";
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
  });

  document.addEventListener("mouseleave", () => {
    cursor.style.display = "none";
  });

  hoverTargets.forEach(target => {
    target.addEventListener("mouseenter", () => {
      cursor.classList.add("active");
      cursorText.style.opacity = 1;
    });
    target.addEventListener("mouseleave", () => {
      cursor.classList.remove("active");
      cursorText.style.opacity = 0;
    });
  });
});