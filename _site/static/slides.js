(function slides() {
  function getCurrentSlide() {
    const slideId = window.location.hash && window.location.hash.slice(1);

    return slideId
      ? document.getElementById(slideId)
      : document.querySelector(".slide");
  }

  function goToNextSlide(direction) {
    let nextSlide;
    const currentSlide = document.querySelector(".slide[aria-current]");

    if (direction === "forward") {
      nextSlide = currentSlide.nextElementSibling;
    } else if (direction === "backward") {
      nextSlide = currentSlide.previousElementSibling;
    }

    if (nextSlide) {
      window.location = window.location.pathname + "#" + nextSlide.id;
    }
  }

  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowLeft": {
        event.preventDefault();
        goToNextSlide("backward");
        break;
      }
      case "ArrowRight": {
        event.preventDefault();
        goToNextSlide("forward");
        break;
      }
    }
  });

  function focusSlide() {
    const currentSlide = getCurrentSlide();
    const previousSlide = document.querySelector(".slide[aria-current]");

    if (previousSlide) {
      previousSlide.removeAttribute("aria-current");
      previousSlide.removeAttribute("tabindex");
      previousSlide.setAttribute("aria-hidden", true);
      previousSlide.setAttribute("hidden", true);
    }

    currentSlide.setAttribute("aria-current", true);
    currentSlide.setAttribute("tabindex", 0);
    currentSlide.removeAttribute("aria-hidden");
    currentSlide.removeAttribute("hidden");

    currentSlide.focus();
  }

  const buttonControls = document.querySelectorAll(
    "button[data-slide-controls]"
  );
  const progressElement = document.querySelector(
    "progress[data-slide-controls]"
  );
  const selectControl = document.querySelector("select[data-slide-controls]");
  function setSlideControls() {
    const {
      dataset: { index },
      id,
    } = getCurrentSlide();
    progressElement.value = index;
    progressElement.textContent = `Slide ${index} out of ${progressElement.max}`;

    selectControl.value = "#" + id;

    buttonControls.forEach((node) => node.removeAttribute("disabled"));

    if (index == 1) {
      buttonControls[0].disabled = true;
    } else if (index == progressElement.max) {
      buttonControls[1].disabled = true;
    }
  }

  focusSlide();
  setSlideControls();

  window.addEventListener("hashchange", focusSlide);
  window.addEventListener("hashchange", setSlideControls);

  buttonControls.forEach((node) => {
    node.addEventListener("click", (event) => {
      event.preventDefault();

      goToNextSlide(node.dataset.direction);
    });
  });

  selectControl.addEventListener("change", (event) => {
    event.preventDefault();

    if (event.target.value[0] === "#") {
      window.location = window.location.pathname + event.target.value;
    } else {
      window.location.replace(event.target.value);
    }
  });
})();
