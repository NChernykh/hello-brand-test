const initSlider = () => {
  let swiper = new Swiper('[data-reviews-slider]', {
    speed: 2000,
    loop: true,
    slidesPerView: 1,
    watchOverflow: true,

    autoplay: {
      delay: 2000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },

    navigation: {
      nextEl: '.reviews__next',
      prevEl: '.reviews__prev',
    },
    allowTouchMove: true,
    breakpoints: {
      0: {
        slidesPerView: 1.15,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    },
  });
};

export {initSlider};
