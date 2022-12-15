const preloaderElement = document.querySelector(".preloader");
const popupElement = document.querySelector(".popup");
const popupWishElement = document.querySelector(".popup-wish");
const popupContent = document.querySelector(".popup__content");
const presents = document.querySelectorAll(".present-hover");
const finishButton = document.getElementById("finish");
const confettiElement = document.querySelector(".confetti");
const logoElement = document.querySelector(".logo");
let pageHeight = window.innerHeight;

const popupMessages = {
  m1: "В 2023 году самые амбициозные планы воплотятся в жизнь, а удача будет сопутствовать во всех начинаниях!",
  m2: "Наступающий год будет годом финансовой стабильности, свежих идей и новых свершений!",
  m3: "Наступающий год подарит гармонию в душе и впечатляющие суммы на банковском счете!",
  m4: "В наступающем году исполнятся заветные мечты: вас ждут новые победы, яркие впечатления и море улыбок!",
  m5: "В 2023 году работа будет приносить удовольствие, а ваши труды будут вознаграждены по достоинству (например, отпуском на райских островах)!",
  wrongOrientation: "Измените ориентацию вашего устройства.",
  noticeToChoose: "Выбери подарок и узнай предсказание на 2023 год",
};

// eslint-disable-next-line no-unused-vars
function afterLoad() {
  document.addEventListener("resize", orientationHandler());
  orientationHandler();

  console.log("loaded");
  preloaderElement.classList.add("hidden");

  setTimeout(() => {
    document.querySelector(".app").classList.add("animate");
  }, 2000);
  setTimeout(() => {
    showPopup(popupMessages.noticeToChoose);
  }, 11000);

  presents.forEach((present) =>
    present.addEventListener("click", (event) => {
      const messageCode = event.currentTarget.dataset.message;
      hidePopup();
      logoElement.classList.add("hidden");
      showPopup(popupMessages[messageCode], popupWishElement);
    })
  );

  finishButton.addEventListener("click", () => {
    confettiElement.classList.add("active");
    popupWishElement.classList.add("finished");
  });
}

function orientationHandler() {
  if (window.innerWidth < window.innerHeight) {
    showPopup(popupMessages.wrongOrientation);
    return false;
  }
  hidePopup();
}
function showPopup(message = "", popup = popupElement) {
  popup.classList.add("active");
  popup.querySelector(".popup__content").textContent = message;
}
function hidePopup(popup = popupElement) {
  popup.classList.remove("active");
}
