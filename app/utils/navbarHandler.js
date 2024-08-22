// src/utils/navbarHandler.js
export function initNavbar() {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
        let currentScrollPos = window.pageYOffset;
        const navbar = document.getElementById("nav-bar");
        const threshold = 33 // Поріг, після якого скролбар має зникнути

        if (prevScrollpos > currentScrollPos || currentScrollPos < threshold) {
            navbar.style.top = "0";
        } else {
            navbar.style.top = "-4rem";
        }
        prevScrollpos = currentScrollPos;
    }
}
