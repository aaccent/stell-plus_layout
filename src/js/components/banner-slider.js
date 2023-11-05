const innerBannerSwiper = new Swiper(".banner-slider_inner .swiper", {
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    resizeObserver: true,
    speed: 300,
    pagination: {
        el: ".banner-section .swiper-pagination",
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
        nextEl: ".banner-section .swiper-button-next",
        prevEl: ".banner-section .swiper-button-prev",
    },
})

const outerBannerSwiper = new Swiper(".banner-slider_outer .swiper", {
    slidesPerView: 1,
})

outerBannerSwiper.controller.control = innerBannerSwiper;
innerBannerSwiper.controller.control = outerBannerSwiper;