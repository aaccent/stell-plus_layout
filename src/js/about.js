import "./components/banner-slider.js"
import { handleSwipe } from "./modules/swipe-hint.js"

let timelineSwiper = new Swiper(".timeline-slider .swiper", {
    slidesPerView: 1,
    spaceBetween: 55,
    pagination: {
        el: ".timeline-slider .swiper-pagination",
        type: "progressbar",
    },
})

handleSwipe(timelineSwiper)


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
    },
    on: {
        touchMove: function(swiper, event) {
            const swiperHintEl = swiper.el.querySelector(".swiper-hint")
            if (swiperHintEl) {
                swiperHintEl.addEventListener("animationiteration", () =>  swiperHintEl.remove())
            }
        }
    }
})

let certificateSwiper = new Swiper(".certificates-section__slider .swiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    breakpoints: {
        576: {
            slidesPerView: "auto"
        },
    },
    pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
    },
})

handleSwipe(certificateSwiper)