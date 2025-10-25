let events = ["mousemove", "touchmove"];

function isTouchDevice() {
    try {
        document.createEvent("TouchEvent");
        return true;
    }
    catch(e) {
        return false;
    }
}

// Initialiser le positionnement des eyeballs
window.addEventListener('load', () => {
    eyeballs.forEach((eyeball) => {
        eyeball.style.position = 'absolute';
        eyeball.style.left = '50%';
        eyeball.style.top = '50%';
        eyeball.style.transform = 'translate(-50%, -50%)';
    });
});

events.forEach(eventType => {
    document.body.addEventListener(eventType, 
        (event) => {
            eyeballs.forEach((eyeball, index) => {
                let eye = eyes[index];
                let eyeRect = eye.getBoundingClientRect();
                let eyeCenterX = eyeRect.left + eyeRect.width / 2;
                let eyeCenterY = eyeRect.top + eyeRect.height / 2;
                
                let mouseX = !isTouchDevice() ? event.clientX : event.touches[0].clientX;
                let mouseY = !isTouchDevice() ? event.clientY : event.touches[0].clientY;
                
                let deltaX = mouseX - eyeCenterX;
                let deltaY = mouseY - eyeCenterY;
                let angle = Math.atan2(deltaY, deltaX);
                
                let maxDistance = Math.min(eyeRect.width, eyeRect.height) * 0.3;
                
                let pupilX = Math.cos(angle) * maxDistance;
                let pupilY = Math.sin(angle) * maxDistance;
                
                eyeball.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
            });
        }
    );
});

window.onload = function() {
    simpsonsface.classList.add('active');
    simpsons_logo.classList.add('active');
    eyeballs.forEach((eye) => {
        eye.classList.remove('eyeball_mario', 'eyeball_pokemon', 'eyeball_simpsons');
        eye.classList.add('eyeball_simpsons');
        // Centrer l'eyeball
        eye.style.position = 'absolute';
        eye.style.left = '50%';
        eye.style.top = '50%';
        eye.style.transform = 'translate(-50%, -50%)';
    });
    eyes.forEach((eye) => {
        eye.classList.remove('eye_mario', 'eye_pokemon', 'eye_simpsons');
        eye.classList.add('eye_simpsons');
        // S'assurer que eye est en position relative
        eye.style.position = 'relative';
    });
    eyewrapper.classList.add('eyes-wrapper_simpsons');
};

const marioface = document.querySelector('.mario_face');
const simpsonsface = document.querySelector('.simpsons_face');
const pokemonface = document.querySelector('.pokemon_face');

const mario_logo = document.querySelector('.mario_logo');
const simpsons_logo = document.querySelector('.simpsons_logo');
const pokemon_logo = document.querySelector('.pokemon_logo');

const eyeballs = document.querySelectorAll('.eyeball');
const eyes = document.querySelectorAll('.eye');
const eyewrapper = document.querySelector('.eyes-wrapper');

function setFace(activeFace, activeLogo, eyeballClass, eyeClass, eyeswrapperClass) {
    marioface.classList.remove('active');
    simpsonsface.classList.remove('active');
    pokemonface.classList.remove('active');
    mario_logo.classList.remove('active');
    simpsons_logo.classList.remove('active');
    pokemon_logo.classList.remove('active');
    activeFace.classList.add('active');
    activeLogo.classList.add('active');

    eyeballs.forEach((eye) => {
        eye.classList.remove('eyeball_mario', 'eyeball_pokemon', 'eyeball_simpsons');
        eye.classList.add(eyeballClass);
    });

    eyes.forEach((eye) => {
        eye.classList.remove('eye_mario', 'eye_pokemon', 'eye_simpsons');
        eye.classList.add(eyeClass);
    });

    eyewrapper.classList.remove('eyes-wrapper_mario', 'eyes-wrapper_pokemon', 'eyes-wrapper_simpsons');
    eyewrapper.classList.add(eyeswrapperClass);
}

mario_logo.addEventListener('click', () => {
    setFace(marioface, mario_logo, 'eyeball_mario', 'eye_mario', 'eyes-wrapper_mario');
});

simpsons_logo.addEventListener('click', () => {
    setFace(simpsonsface, simpsons_logo, 'eyeball_simpsons', 'eye_simpsons', 'eyes-wrapper_simpsons');
});

pokemon_logo.addEventListener('click', () => {
    setFace(pokemonface, pokemon_logo, 'eyeball_pokemon', 'eye_pokemon', 'eyes-wrapper_pokemon');
});