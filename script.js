document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
});

document.querySelectorAll(".toggle-details").forEach((button) => {
  button.addEventListener("click", () => {
    const option = button.closest(".option");
    option.classList.toggle("show");
    button.textContent = option.classList.contains("show")
      ? "Nascondi Dettagli"
      : "Visualizza Tutto";
  });
});

document.addEventListener("click", (event) => {
  const miceContainer = document.querySelector(".mice-container");
  const mice = document.querySelector(".mice");
  const h1 = document.querySelector("h1");
  const h1Rect = h1.getBoundingClientRect();
  const clickX = event.clientX;
  const clickY = event.clientY;
  const h1CenterX = h1Rect.left + h1Rect.width / 2;

  // Adjust initial position of the mice-container and set it to absolute
  if (!miceContainer.classList.contains("move")) {
    const miceRect = miceContainer.getBoundingClientRect();
    miceContainer.style.left = `${miceRect.left - h1Rect.left}px`;
    miceContainer.style.top = `${miceRect.top - h1Rect.top}px`;
    miceContainer.classList.add("move");
  }

  const currentLeft = parseFloat(miceContainer.style.left);
  const currentTop = parseFloat(miceContainer.style.top);
  const newLeft = clickX - h1Rect.left - miceContainer.offsetWidth / 2;
  const newTop = clickY - h1Rect.top - miceContainer.offsetHeight / 2;

  // Calculate the distance and duration
  const distance = Math.hypot(newLeft - currentLeft, newTop - currentTop);
  const speed = 0.6; // pixels per millisecond
  const duration = distance / speed;

  // Calculate if flipping is necessary based on direction of movement
  const flip = newLeft > currentLeft ? "scaleX(-1)" : "scaleX(1)";

  let angle = 0;
  let moving = true;

  const tilt = () => {
    if (!moving) return;
    angle = angle === 18 ? -18 : 18;
    mice.style.transform = `rotate(${angle}deg)`;
    setTimeout(() => {
      requestAnimationFrame(tilt);
    }, 50);
  };

  // Apply flip immediately
  miceContainer.style.transform = flip;
  requestAnimationFrame(tilt);

  miceContainer.style.transition = `left ${duration}ms linear, top ${duration}ms linear`;
  miceContainer.style.left = `${newLeft}px`;
  miceContainer.style.top = `${newTop}px`;

  setTimeout(() => {
    moving = false;
    mice.style.transform = "";
  }, duration);
});
