const preloaderElement = document.querySelector(".preloader");
const popupElement = document.querySelector(".popup");
const popupContent = document.querySelector(".popup__content");
let pageHeight = window.innerHeight;
// eslint-disable-next-line no-unused-vars
function afterLoad() {
  document.addEventListener("resize", orientationHandler());
  orientationHandler();

  console.log("loaded");
  preloaderElement.classList.add("hidden");
  document.querySelector(".app").classList.add("animate");
}

function orientationHandler() {
  if (window.innerWidth < window.innerHeight) {
    showPopup("Измените ориентацию вашего устройства.");
    return false;
  }
  hidePopup();
}
function showPopup(message = "") {
  popupElement.classList.add("active");
  popupContent.textContent = message;
}
function hidePopup() {
  popupElement.classList.remove("active");
}
