const supportsPromises =
  typeof Promise !== "undefined" &&
  Promise.toString().indexOf("[native code]") !== -1;

const preloader = () => {
  const preloaderCounter = document.querySelector(".preloader__counter");
  const preloaderPath = document.querySelector(".preloader__path");
  const preloaderPathLength = preloaderPath.getTotalLength();
  let preloaderInterval = null;

  document.addEventListener("readystatechange", () => {
    if (document.readyState !== "interactive") return;
    startPreloader();
  });
  window.addEventListener("load", () => {
    hidePreload();
  });

  function startPreloader() {
    preloaderPath.setAttribute("stroke-dasharray", preloaderPathLength);

    preloaderInterval = setInterval(function () {
      const counterValue = parseInt(preloaderCounter.textContent, 10);
      preloaderCounter.textContent = `${counterValue + 1}`;
      preloaderPath.setAttribute(
        "stroke-dashoffset",
        preloaderPathLength + 0.01 * preloaderPathLength * counterValue
      );
      if (counterValue < 93) return;
      clearInterval(preloaderInterval);
    }, 30);
  }
  function hidePreload() {
    clearInterval(preloaderInterval);
    preloaderCounter.textContent = "100";
    preloaderPath.setAttribute("stroke-dashoffset", preloaderPathLength * 2);
    preloaderInterval = setInterval(function () {
      // eslint-disable-next-line no-undef
      afterLoad();
      clearInterval(preloaderInterval);
    }, 500);
  }
};

if (supportsPromises) {
  preloader();
} else {
  alert("Your browser is old. Use modern one.");
}
