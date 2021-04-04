const calculatorBtn = document.querySelector(".footer-calculator__btn"),
  modalBtn = document.querySelector(".form__btn_request"),
  modalCloseBtn = document.querySelector(".request-modal__close"),
  modalWindow = document.querySelector(".request-modal");

window.addEventListener("resize", closeModal);

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