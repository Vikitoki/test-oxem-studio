const mobileIcon = document.querySelector(".header__menu-icon"),
  mobileMenu = document.querySelector(".header__menu"),
  mobileMenuContent = document.querySelector(".header__menu-content"),
  closeMenuBtn = document.querySelector(".header__close"),
  introBlock = document.querySelector(".intro"),
  headerBlock = document.querySelector(".header"),
  headerLogo = document.querySelector(".header__logo"),
  headerLising = document.querySelector(".header__leasing"),
  headerActions = document.querySelector(".actions-header");

mobileIcon.addEventListener("click", openMenu);
closeMenuBtn.addEventListener("click", closeMenu);

headerLising.addEventListener("mouseenter", function () {
  if (document.documentElement.clientWidth >= 1024) {
    headerActions.classList.add("active");
  }
});

headerLising.addEventListener("mouseleave", function () {
  if (document.documentElement.clientWidth >= 1024) {
    headerActions.classList.remove("active");
  }
});

window.addEventListener("scroll", function (event) {
  if (
    document.documentElement.scrollTop > introBlock.clientWidth / 5 &&
    document.documentElement.clientWidth <= 768
  ) {
    modifiedHeader(true);
  } else {
    modifiedHeader(false);
  }
});

window.addEventListener("resize", function () {
  closeMenu();
});

function modifiedHeader(bool) {
  if (bool) {
    headerBlock.classList.add("active");
    mobileIcon.classList.add("active");
    headerLogo.classList.add("active");
  } else {
    headerBlock.classList.remove("active");
    mobileIcon.classList.remove("active");
    headerLogo.classList.remove("active");
  }
}

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
