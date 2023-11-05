new Swiper (".section__images.swiper", {
    slidesPerView: 1.1,
    spaceBetween: 16,
    watchOverflow: true,
    breakpoints: {
        768: {
            slidesPerView: 2
        }
    },
})

new Swiper(".equipments-slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
        480: {
            slidesPerView: "2",
            spaceBetween: 16,
        },
        768: {
            slidesPerView: "3"
        },
        1024: {
            slidesPerView: 4
        }
    },
    navigation: {
        nextEl: ".equipments-section .swiper-button-next",
        prevEl: ".equipments-section .swiper-button-prev",
    },
})

new Swiper(".results-slider .swiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    pagination: {
        el: ".results-slider .swiper-pagination",
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
        nextEl: ".results-slider .swiper-button-next",
        prevEl: ".results-slider .swiper-button-prev",
    },
})

new Swiper(".projects-slider .swiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    breakpoints: {
        860: {
            slidesPerView: 2
        }
    },
    navigation: {
        nextEl: ".projects-section .swiper-button-next",
        prevEl: ".projects-section .swiper-button-prev",
    },
    on: {
        touchMove: function(swiper, event) {
            let swipeHint = swiper.el.querySelector(".swiper-swipe")

            if (swipeHint) {
                swipeHint.style.cssText = `
                    opacity: 0;
                    visibility: hidden;
                    transform: scale(0.65);
                `
                swipeHint.addEventListener("transitionend", (e) => {
                    e.target.remove()
                }, { once: true })
            }
        },
    }
})