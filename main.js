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
    text: ".slider__text",
    counter: ".slider__navigation-page",
    prevButton: ".slider__navigation-prev",
    nextButton: ".slider__navigation-next",
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
}
// #endregion

// #region: Slider state and constants
const sliderState = {
  currentSlideIndex: 0,
  interval: null,
};

const SLIDER_LENGTH = sliderConfig.slides.length;

// #endregion

// #region: Functins
  const updateSlider = () => {
    const currentSlide = sliderConfig.slides[sliderState.currentSlideIndex];

    if(elements.image) {
      elements.image.src = currentSlide.src;
    }

    if(elements.text) {
      elements.text.textContent = currentSlide.text;
    }

    if(elements.counter) {
      elements.counter.textContent = `${sliderState.currentSlideIndex + 1} / ${SLIDER_LENGTH}`;
    }
  };

  const nextSlide = () => {
    sliderState.currentSlideIndex = (sliderState.currentSlideIndex + 1) % SLIDER_LENGTH; 
    updateSlider();


  };

  const prevSlide = () => {
    sliderState.currentSlideIndex = (sliderState.currentSlideIndex - 1 + SLIDER_LENGTH ) % SLIDER_LENGTH;
    updateSlider();
  };

  const autoPlayStart = (delay = 5000) => {
    autoPlayStop();
    sliderState.interval = setInterval(nextSlide, delay);
  };

  const autoPlayStop = () => {
    if(sliderState.interval) {
      clearInterval(sliderState.interval);
      sliderState.interval = null;
    }
  };

  const sliderNavigation = () => {
    if(elements.prevButton) {
      elements.prevButton.addEventListener('click', () => {
        autoPlayStop();
        prevSlide();
      })
    }

    if(elements.nextButton) {
      elements.nextButton.addEventListener('click', () => {
        autoPlayStop();
        nextSlide();
      })
    }
  }

  const initializeSlider = () => {
    updateSlider();
    sliderNavigation();
    autoPlayStart();
  };

  initializeSlider();
// #endregion

// #region: Animations

const bannerLogoTL = gsap.timeline({ defaults: { duration: 1.5 } });

// Samsung logo animation
bannerLogoTL
  .from('.banner__logo', {
    x: -300,
  })
  .to('.banner__logo', {
    y: -100,
  });


// Permanent elements animations

gsap.from('.banner__special-offer-product', {
  x: -300,
  duration: 1.5,
});

gsap.from('.banner__special-offer-price', {
  x: -300,
  duration: 1.5,
});

gsap.from('.banner__main-text-line', {
  x: -1000,
  duration: 1.5,
  stagger: 0.5,
  delay: 1,
});

gsap.to('.banner__main-image', {
  width: '0',
  duration: 1,
  delay: 3,
});

gsap.to('.banner__white-space', {
  width: '55%', 
  delay: 3,
  duration: 1,
});

// Slider animations

gsap.to('.banner__slider-image', {
  width: '45%',
  delay: 3,
  duration: 1,
});

gsap.to('.banner__special-offer-product', {
  display: 'none',
  duration: 0.1,
  delay: 3, 
});

gsap.to('.banner__special-offer-price', {
  display: 'none',
  duration: 0.1,
  delay: 3,
});

// Note animation
const noteTL = gsap.timeline({defaults: {opacity: 1}});

noteTL.to('.banner__note', {
  opacity: 0,
  delay: 3,
  duration: 0.5,
})
.to('.banner__note', {
  opacity: 1,
  duration: 1,
  delay: 1,
});


// #endregion
