const mobileIcon = document.querySelector(".header__menu-icon"),
  mobileMenu = document.querySelector(".header__menu"),
  mobileMenuContent = document.querySelector(".header__menu-content"),
  closeMenuBtn = document.querySelector(".header__close");

mobileIcon.addEventListener("click", openMenu);

closeMenuBtn.addEventListener("click", closeMenu);

function closeMenu() {
  mobileMenu.classList.remove("active");
  mobileMenuContent.classList.remove("active");
  document.body.classList.remove("lock");
}

function openMenu() {
  mobileMenu.classList.add("active");
  mobileMenuContent.classList.add("active");
  document.body.classList.add("lock");
}
