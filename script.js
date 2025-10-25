const characters = document.querySelectorAll(".character");
const logos = document.querySelectorAll(".logo");

function isTouchDevice() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}

// Suivi du regard
["mousemove", "touchmove"].forEach((eventType) => {
  document.body.addEventListener(eventType, (event) => {
    const activeCharacter = document.querySelector(".character.visible");
    if (!activeCharacter) return;

    const eyes = activeCharacter.querySelectorAll(".eye");
    const eyeballs = activeCharacter.querySelectorAll(".eyeball");

    eyeballs.forEach((eyeball, index) => {
      const eye = eyes[index];
      const eyeRect = eye.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;

      const mouseX = !isTouchDevice()
        ? event.clientX
        : event.touches[0].clientX;
      const mouseY = !isTouchDevice()
        ? event.clientY
        : event.touches[0].clientY;

      const deltaX = mouseX - eyeCenterX;
      const deltaY = mouseY - eyeCenterY;
      const angle = Math.atan2(deltaY, deltaX);

      const maxDistance = Math.min(eyeRect.width, eyeRect.height) * 0.3;
      const pupilX = Math.cos(angle) * maxDistance;
      const pupilY = Math.sin(angle) * maxDistance;

      eyeball.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
    });
  });
});

function setFace(characterClass, logoElement) {
  characters.forEach((c) => c.classList.remove("visible"));
  logos.forEach((l) => l.classList.remove("active"));

  const activeCharacter = document.querySelector(`.${characterClass}`);
  activeCharacter.classList.add("visible");
  logoElement.classList.add("active");
}

document.querySelector(".mario_logo").addEventListener("click", () => {
  setFace("mario", document.querySelector(".mario_logo"));
});

document.querySelector(".simpsons_logo").addEventListener("click", () => {
  setFace("simpsons", document.querySelector(".simpsons_logo"));
});

document.querySelector(".pokemon_logo").addEventListener("click", () => {
  setFace("pokemon", document.querySelector(".pokemon_logo"));
});
