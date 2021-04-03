// Slider =======================================================

if (document.querySelector(".slider-intro__body")) {
  let myProductSlider = new Swiper(".slider-intro__body", {
    loop: true,
    speed: 800,
    autoHeight: true,
    observer: true,
    observeParents: true,
    slidesPerGroup: 1,
    slidesPerView: 1,

    grabCursor: false,
    slideToClickedSlide: false,

    navigation: {
      nextEl: ".navigations-intro__arrow_next",
      prevEl: ".navigations-intro__arrow_prev",
    },

    // Пагинация
    pagination: {
      el: ".slider-intro__pagination",
      // Буллеты
      type: "bullets",
      clickable: true,
    },

  });
}
