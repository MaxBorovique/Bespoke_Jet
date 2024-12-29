// #region: Slider configuration
const sliderConfig = {
  slides: [
    {
      src: "./assets/slider-image-1.png",
      text: "“Because it’s so nice-looking, it can live right in the kitchen. No more hauling a vacuum up and down the basement stairs on the daily”",
    },
    {
      src: "./assets/slider-image-2.png",
      text: "“If you’re an over-cleaner, like myself, you’ll nerd out on all of the functions. If you avoid this chore at all costs, you’ll appreciate how simple Samsung makes it.”",
    },
    {
      src: "./assets/slider-image-3.png",
      text: "“Both the floor and pet hair attachments are cleverly designed to eliminate the dreaded hair wrap. (In other words, you’ll never have to tackle hair tangles with a pair of scissors again.)”",
    },
    {
      src: "./assets/slider-image-4.png",
      text: "“When I learned the Samsung Bespoke Vac cleaned itself with amazing technology, that’s when I cried. No more scraping spider legs and hair out of the crevices with my hands. Its suction power is so strong, the canister is left perfectly clean after every use. It’s like a vacuum for your vacuum.”",
    },
    {
      src: "./assets/slider-image-5.png",
      text: "“Because it’s so nice-looking, it can live right in the kitchen. No more hauling a vacuum up and down the basement stairs on the daily”",
    },
  ],
  selectors: {
    image: ".slider__image",
    text: ".slider__text-content",
    counter: ".slider__navigation-page",
    prevButton: ".slider__navigation-prev",
    nextButton: ".slider__navigation-next",
    bannerButton: ".banner__button",
  },
};
// #endregion

// #region: DOM manipulations
const elements = {
  image: document.querySelector(sliderConfig.selectors.image),
  text: document.querySelector(sliderConfig.selectors.text),
  counter: document.querySelector(sliderConfig.selectors.counter),
  prevButton: document.querySelector(sliderConfig.selectors.prevButton),
  nextButton: document.querySelector(sliderConfig.selectors.nextButton),
  bannerButton: document.querySelector(sliderConfig.selectors.bannerButton),
};
// #endregion

// #region: Slider state and constants
const sliderState = {
  currentSlideIndex: 0,
  interval: null,
};

let buttonBreath = null;
const SLIDER_LENGTH = sliderConfig.slides.length;

// #endregion

// #region: Functins
const updateSlider = () => {
  const currentSlide = sliderConfig.slides[sliderState.currentSlideIndex];

  if (elements.image) {
    elements.image.src = currentSlide.src;
  }

  if (elements.text) {
    elements.text.textContent = currentSlide.text;
  }

  if (elements.counter) {
    elements.counter.textContent = `${
      sliderState.currentSlideIndex + 1
    } / ${SLIDER_LENGTH}`;
  }
};

const nextSlide = () => {
  sliderState.currentSlideIndex =
    (sliderState.currentSlideIndex + 1) % SLIDER_LENGTH;
  updateSlider();

  gsap.fromTo(
    '.slider__text-content',
    { x: 100, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, ease: "power1.out" }
  );

  gsap.fromTo(
    ".slider__text-button",
    { x: 100, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, ease: "power1.out" }
  );

  gsap.fromTo(
    ".slider__image",
    { opacity: 0 },
    { opacity: 1, duration: 1, ease: "power1.out" }
  );
};

const prevSlide = () => {
  sliderState.currentSlideIndex =
    (sliderState.currentSlideIndex - 1 + SLIDER_LENGTH) % SLIDER_LENGTH;
  updateSlider();
};

const autoPlayStart = (delay = 5000) => {
  autoPlayStop();
  sliderState.interval = setInterval(nextSlide, delay);
};

const autoPlayStop = () => {
  if (sliderState.interval) {
    clearInterval(sliderState.interval);
    sliderState.interval = null;
  }
};

const sliderNavigation = () => {
  if (elements.prevButton) {
    elements.prevButton.addEventListener("click", () => {
      autoPlayStop();
      prevSlide();
    });
  }

  if (elements.nextButton) {
    elements.nextButton.addEventListener("click", () => {
      autoPlayStop();
      nextSlide();
    });
  }
};

const initializeSlider = () => {
  updateSlider();
  sliderNavigation();
  autoPlayStart();
};

initializeSlider();
// #endregion

// #region: Animations

const buttonBreathingAnimation = () => {
  if (elements.bannerButton) {
    buttonBreath = gsap.to(".banner__button", {
      repeat: -1,
      yoyo: true,
      scale: 1.1,
      duration: 1.5,
      ease: "power1.inOut",
    });
  }
};

const bannerLogoTL = gsap.timeline({ defaults: { duration: 1.5 } });

// Samsung logo animation
bannerLogoTL
  .from(".banner__logo", {
    x: -300,
  })
  .to(".banner__logo", {
    y: -100,
  });

// #region EventListeners
elements.bannerButton.addEventListener("mouseenter", () => {
  buttonBreath.pause();
  gsap.to(sliderConfig.selectors.bannerButton, {
    scale: 1.1,
    duration: 0.5,
  });
});

elements.bannerButton.addEventListener("mouseleave", () => {
  buttonBreath.resume();
});
// #endregion

// Permanent elements animations

gsap.from(".banner__special-offer-product", {
  x: -300,
  duration: 1.5,
});

gsap.from(".banner__special-offer-price", {
  x: -300,
  duration: 1.5,
});

gsap.from(".banner__main-text-line", {
  x: -1000,
  duration: 1.5,
  stagger: 0.5,
  delay: 1,
});

gsap.to(".banner__main-image", {
  width: "0",
  duration: 1,
  delay: 3,
});

gsap.to(".banner__white-space", {
  width: "55%",
  delay: 3,
  duration: 1,
});

// Slider animations

gsap.to(".banner__slider-image", {
  width: "45%",
  delay: 3,
  duration: 1,
});

gsap.to(".banner__special-offer-product", {
  opacity: 0,
  visibility: 'hidden',
  duration: 0.1,
  delay: 3,
});

gsap.to(".banner__special-offer-price", {
  opacity: 0,
  visibility: 'hidden',
  duration: 0.1,
  delay: 3,
});

// Note animation
const noteTL = gsap.timeline({ defaults: { opacity: 1 } });

noteTL
  .to(".banner__note", {
    opacity: 0,
    delay: 3,
    duration: 0.5,
  })
  .to(".banner__note", {
    opacity: 1,
    duration: 1,
    delay: 1,
  });

// breath premanent elements visibility

gsap.to(sliderConfig.selectors.bannerButton, {
  display: "block",
  opacity: 1,
  duration: 1,
  delay: 3,
  onComplete: () => buttonBreathingAnimation(),
});

gsap.to('.banner__slider-text', {
  opacity: 1,
  duration: 1,
  delay: 3,
});

gsap.to('.slider__navigation', {
  opacity: 1,
  duration: 1,
  delay: 3,
});
// #endregion
