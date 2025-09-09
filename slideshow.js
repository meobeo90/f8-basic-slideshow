const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const slideShow = document.querySelector(".slideshow");
const slides = Array.from(document.querySelectorAll(".slide-item"));
const track = document.querySelector(".track");
const allDots = Array.from(document.querySelectorAll(".slick-dots li"));
const colors = ["#8a0aff", ""];
const originLength = slides.length;

const PREV = -1;
const NEXT = 1;
const firstSlide = slides[0].cloneNode(true);
const lastSlide = slides[slides.length - 1].cloneNode(true);
slides.push(firstSlide);
slides.unshift(lastSlide);

track.append(firstSlide);
track.prepend(lastSlide);

let currentIndex = 1;
let canControl = true;
setNewPosition(true);
updateDots();
function callNewIndex(step) {
  currentIndex = (currentIndex + step + slides.length) % slides.length;
  track.ontransitionend = () => {
    if (currentIndex > originLength) {
      currentIndex -= originLength;
      setNewPosition(true);
    }
    if (currentIndex === 0) {
      currentIndex = originLength;
      setNewPosition(true);
    }
    canControl = true;
  };

  setNewPosition();
  updateDots();
}
function setNewPosition(instant = false) {
  if (!instant) {
    canControl = false;
  }
  track.style.transition = instant ? "none" : "ease 0.5s";
  track.style.translate = `${currentIndex * 100 * -1}%`;
}
prevBtn.addEventListener("click", (e) => {
  if (!canControl) return;
  callNewIndex(PREV);
  resetAutoPlay();
});
nextBtn.addEventListener("click", (e) => {
  if (!canControl) return;
  callNewIndex(NEXT);
  resetAutoPlay();
});

allDots.forEach((dot, dotIndex) => {
  dot.addEventListener("click", () => {
    if (!canControl) return;
    const targetIndex = dotIndex + 1;
    const step = targetIndex - currentIndex;
    callNewIndex(step);
    resetAutoPlay();
  });
});

let autoPlayId;
function enableAutoPlay() {
  autoPlayId = setInterval(() => {
    callNewIndex(NEXT);
  }, 4000);
}

function stopAutoPlay() {
  clearInterval(autoPlayId);
}
function resetAutoPlay() {
  stopAutoPlay();
  enableAutoPlay();
}
enableAutoPlay();
slideShow.addEventListener("mouseenter", () => {
  stopAutoPlay();
});

slideShow.addEventListener("mouseleave", () => {
  enableAutoPlay();
});

function updateDots() {
  allDots.forEach((dot) => {
    dot.classList.remove("slick-active");
  });
  let dotIndex = currentIndex - 1;
  if (currentIndex > originLength) {
    dotIndex = 0;
  }
  if (currentIndex === 0) {
    dotIndex = originLength - 1;
  }
  const activeDot = allDots[dotIndex];
  if (activeDot) {
    activeDot.classList.add("slick-active");
  }
}
