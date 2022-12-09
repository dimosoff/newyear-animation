const preloader = () => {
  const preloaderElement = document.querySelector(".preloader");
  const preloaderCounter = document.querySelector(".preloader__counter");
  let preloaderInterval = null;

  
  document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "interactive") {
      startPreloader();
    } else if (event.target.readyState === "complete") {
      hidePreload();
    }
  });

  function startPreloader() {
    preloaderInterval = setInterval(function () {
      const counterValue = parseInt(preloaderCounter.textContent, 10);
      preloaderCounter.textContent = `${counterValue + 1}%`;
      if (counterValue < 96) return;
      clearInterval(preloaderInterval);
    }, 20);
  }
  function hidePreload() {
    preloaderCounter.textContent = "98%";
    clearInterval(preloaderInterval);
    preloaderCounter.textContent = "100%";
    preloaderElement.classList.add("hidden");
    document.querySelector(".app").classList.add("animate");
  }
};

preloader();
