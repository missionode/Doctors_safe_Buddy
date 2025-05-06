// js/onboard.js
let slideIndex = 0;
let slides = [];
let dots = [];

function initializeCarousel() {
    slides = document.querySelectorAll('.carousel-slide');
    dots = document.querySelectorAll('.dot');
    showSlide(slideIndex); // Show the initial slide after elements are found
}

function showSlide(n) {
    if (slides.length > 0) {
        slides.forEach(slide => slide.style.display = 'none');
        dots.forEach(dot => dot.classList.remove('active'));
        slideIndex = (n + slides.length) % slides.length;
        slides[slideIndex].style.display = 'flex';
        dots[slideIndex].classList.add('active');
    }
}

function nextSlide() {
    showSlide(slideIndex + 1);
}

function prevSlide() {
    showSlide(slideIndex - 1);
}

function currentSlide(n) {
    showSlide(n - 1);
}

document.addEventListener('DOMContentLoaded', initializeCarousel);