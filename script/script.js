const preloaderElement = document.querySelector(".preloader");
const popupElement = document.querySelector(".popup");
const popupWishElement = document.querySelector(".popup-wish");
// const popupContent = document.querySelector(".popup__content");
const presents = document.querySelectorAll(".present-hover");
const finishButton = document.getElementById("finish");
const confettiElement = document.querySelector(".confetti");
const logoElement = document.querySelector(".logo");
let deviceOrient = null,
  // eslint-disable-next-line no-unused-vars
  prevPopupMessage = "",
  appState = false;

const popupMessages = {
  m1: "В 2023 году самые амбициозные планы воплотятся в жизнь, а удача будет сопутствовать во всех начинаниях!",
  m2: "Наступающий год будет годом финансовой стабильности, свежих идей и новых свершений!",
  m3: "Наступающий год подарит гармонию в душе и впечатляющие суммы на банковском счете!",
  m4: "В наступающем году исполнятся заветные мечты: вас ждут новые победы, яркие впечатления и море улыбок!",
  m5: "В 2023 году работа будет приносить удовольствие, а ваши труды будут вознаграждены по достоинству (например, отпуском на райских островах)!",
  wrongOrientation: "Измените ориентацию вашего устройства.",
  noticeToChoose: "Выбери подарок и узнай предсказание на 2023 год",
};

// let service = document.createElement("div");
// service.classList.add("service");
// document.body.append(service);
// service.textContent = window.innerWidth + " x " + window.innerHeight;

window.addEventListener("resize", () => {
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

  setTimeout(() => {
    document.body.classList.add("animate");
  }, 2000);
  setTimeout(() => {
    togglePopup(popupMessages.noticeToChoose);
  }, 10000);

  presents.forEach((present) =>
    present.addEventListener("click", (event) => {
      const messageCode = event.currentTarget.dataset.message;
      logoElement.classList.add("hidden");
      togglePopup(popupMessages[messageCode], popupWishElement);
    })
  );

  finishButton.addEventListener("click", () => {
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

function togglePopup(message = "", popup = popupElement) {
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
