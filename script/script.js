"use strict";

var preloaderElement = document.querySelector(".preloader");
var popupElement = document.querySelector(".popup");
var popupWishElement = document.querySelector(".popup-wish");
// const popupContent = document.querySelector(".popup__content");
var presents = document.querySelectorAll(".present-hover");
var finishButton = document.getElementById("finish");
var confettiElement = document.querySelector(".confetti");
var logoElement = document.querySelector(".logo");
var deviceOrient = null,
  // eslint-disable-next-line no-unused-vars
  prevPopupMessage = "",
  appState = false;
var popupMessages = {
  m1: "В 2023 году самые амбициозные планы воплотятся в жизнь, а удача будет сопутствовать во всех начинаниях!",
  m2: "Наступающий год будет годом финансовой стабильности, свежих идей и новых свершений!",
  m3: "Наступающий год подарит гармонию в душе и впечатляющие суммы на банковском счете!",
  m4: "В наступающем году исполнятся заветные мечты: вас ждут новые победы, яркие впечатления и море улыбок!",
  m5: "В 2023 году работа будет приносить удовольствие, а ваши труды будут вознаграждены по достоинству (например, отпуском на райских островах)!",
  wrongOrientation: "Измените ориентацию вашего устройства.",
  noticeToChoose: "Выберите подарок и узнайте, что вас ждет в 2023 году!"
};

// let service = document.createElement("div");
// service.classList.add("service");
// document.body.append(service);
// service.textContent = window.innerWidth + " x " + window.innerHeight;

window.addEventListener("resize", function () {
  if (!appState && orientationState()) {
    appState = true;
    afterLoad();
  }
  orientationState();
  windowWidth();

  // service.textContent = window.innerWidth + " x " + window.innerHeight;
});

// eslint-disable-next-line no-unused-vars
function afterLoad() {
  windowWidth();
  if (!orientationState()) togglePopup(popupMessages.wrongOrientation);
  if (!orientationState()) return;
  preloaderElement.classList.add("hidden");
  setTimeout(function () {
    document.body.classList.add("animate");
  }, 2000);
  setTimeout(function () {
    togglePopup(popupMessages.noticeToChoose);
  }, 14000);
  presents.forEach(function (present) {
    return present.addEventListener("click", function (event) {
      var messageCode = event.currentTarget.dataset.message;
      logoElement.classList.add("hidden");
      togglePopup();
      togglePopup(popupMessages[messageCode], popupWishElement);
    });
  });
  finishButton.addEventListener("click", function () {
    confettiElement.classList.add("active");
    popupWishElement.classList.add("finished");
  });
}
function orientationState() {
  if (window.innerWidth < window.innerHeight && deviceOrient != "mobile") {
    togglePopup(popupMessages.wrongOrientation);
    deviceOrient = "mobile";
  }
  if (window.innerWidth >= window.innerHeight && deviceOrient != "pc") {
    togglePopup();
    deviceOrient = "pc";
  }
  return deviceOrient === "pc" ? true : false;
}
function togglePopup() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var popup = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : popupElement;
  prevPopupMessage = message;
  if (message === "") {
    popup.classList.remove("active");
    return false;
  }
  popup.querySelector(".popup__content").textContent = message;
  popup.classList.add("active");
  return true;
}
function windowWidth() {
  document.body.style = "--windowWidth:" + window.innerWidth;
}