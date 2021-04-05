document
  .querySelector(".item-slider-intro__btn_load button")
  .addEventListener("click", function () {
    this.classList.toggle("load");
  });

// Slider =======================================================

if (document.querySelector(".slider-intro__body")) {
  let myProductSlider = new Swiper(".slider-intro__body", {
    loop: true,
    speed: 800,
    effect: "fade",
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

    pagination: {
      el: ".slider-intro__pagination",
      type: "bullets",
      clickable: true,
    },

    autoplay: {
      delay: 10000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
  });
}
