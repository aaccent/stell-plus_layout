new Swiper(".hero-section__slider .swiper", {
    slidesPerView: 1,
    speed: 800,// (getComputedStyle(document.documentElement).getPropertyValue('--screen-diff') && 0),
    observer: true,
    parallax: true,
    preventInteractionOnTransition: true,
    pagination: {
        el: ".hero-section .swiper-pagination",
        type: "fraction",
        formatFractionCurrent: function(current) {
            return current < 9 ? "0" + current : current
        },
        formatFractionTotal: function(total) {
            return total < 9 ? "0" + total : total
        },
        renderFraction: function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span>' +
                    '<span class="swiper-pagination-divider"> — </span>' +
                    '<span class="' + totalClass + '"></span>';
        },
    },
    navigation: {
        nextEl: ".hero-section .swiper-button-next",
        prevEl: ".hero-section .swiper-button-prev",
    },
})

new Swiper(".equipment-section__slider .swiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    breakpoints: {
        480: {
            slidesPerView: "2"
        },
        768: {
            slidesPerView: "3"
        },
        1024: {
            slidesPerView: 4
        }
    }
})

import "./components/service.js"
import "./components/banner-slider.js"


