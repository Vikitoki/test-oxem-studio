const calculatorBtn = document.querySelector(".footer-calculator__btn"),
  modalBtn = document.querySelector(".form__btn_request"),
  modalCloseBtn = document.querySelector(".request-modal__close"),
  modalWindow = document.querySelector(".request-modal"),
  headerBtns = document.querySelectorAll(".header__btns button"),
  introBtns = document.querySelectorAll(".item-slider-intro__btn button");


window.addEventListener("resize", closeModal);

introBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    openModal();
  });
});

headerBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    closeMenu();
    openModal();
  });
});

calculatorBtn.addEventListener("click", openModal);
modalCloseBtn.addEventListener("click", closeModal);

function closeModal() {
  modalWindow.classList.remove("active");
  document.body.classList.remove("lock");
}

function openModal() {
  modalWindow.classList.add("active");
  document.body.classList.add("lock");
}
