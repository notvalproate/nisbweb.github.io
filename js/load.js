let overlay = document.querySelector('.overlay');
let nav = document.querySelector('.header-overlay');
let content = document.querySelector('.bodyContent');

nav.style.opacity = 0;
// content.style.opacity = 0;

setInterval(() => {
    nav.style.opacity = 1 - overlay.style.opacity;
    // content.style.opacity = 1 - overlay.style.opacity - 0.5;
}, 100);