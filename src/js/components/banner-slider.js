import { handleSwipe } from "../modules/swipe-hint.js"

const innerBannerSwiper = new Swiper(".banner-slider_inner .swiper", {
    slidesPerView: 1,
    loop: true,
    // observer: true,
    // observeParents: true,
    // resizeObserver: true,
    speed: 800,
    effect: "fade",
    fadeEffect: {
        crossFade: true,
    },
    preventInteractionOnTransition: true,
    pagination: {
        el: ".banner-section .swiper-pagination",
        type: "fraction",
        formatFractionCurrent: function(current) {
            return current < 10 ? "0" + current : current
        },
        formatFractionTotal: function(total) {
            return total < 10 ? "0" + total : total
        },
        renderFraction: function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span>' +
            '<span class="swiper-pagination-divider"> — </span>' +
            '<span class="' + totalClass + '"></span>';
        },
    },
    navigation: {
        nextEl: ".banner-section .swiper-button-next",
        prevEl: ".banner-section .swiper-button-prev",
    },
})

const outerBannerSwiper = new Swiper(".banner-slider_outer .swiper", {
    slidesPerView: 1,
    loop: true,
    speed: 800,
})

outerBannerSwiper.controller.control = innerBannerSwiper;
innerBannerSwiper.controller.control = outerBannerSwiper;

handleSwipe(outerBannerSwiper, { x: 0.5, y: 0.5 })