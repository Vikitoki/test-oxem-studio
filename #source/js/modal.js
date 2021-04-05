const calculatorBtn = document.querySelector(".footer-calculator__btn"),
  modalBtn = document.querySelector(".form__btn_request"),
  modalCloseBtn = document.querySelector(".request-modal__close"),
  modalWindow = document.querySelector(".request-modal"),
  headerBtns = document.querySelectorAll(".header__btns button"),
  modalTelInput = document.querySelector(".form__item_tel input"),
  modalTel = document.querySelector(".form__item_tel");
let prevEventLength = 2;

window.addEventListener("resize", closeModal);

headerBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    closeMenu();
    openModal();
  });
});

calculatorBtn.addEventListener("click", openModal);
modalCloseBtn.addEventListener("click", closeModal);

modalTelInput.addEventListener("input", function (event) {
  if (event.target.value.length <= 2) {
    this.value = `+7`;
    modalTel.classList.remove("hide");
  } else if (event.target.value.length > 2) modalTel.classList.add("hide");
});

new IMask(modalTelInput, {
  mask: "+{7} (000) 000 00 00",
});

function closeModal() {
  modalWindow.classList.remove("active");
  document.body.classList.remove("lock");
}

function openModal() {
  modalWindow.classList.add("active");
  document.body.classList.add("lock");
}
