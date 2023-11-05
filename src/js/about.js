import "./components/banner-slider.js"

new Swiper(".timeline-slider .swiper", {
    slidesPerView: 1,
    spaceBetween: 55,
    pagination: {
        el: ".timeline-slider .swiper-pagination",
        type: "progressbar",
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

new Swiper(".certificates-section__slider .swiper", {
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
        lock: function(swiper, event) {
            swiper.el.querySelector(".swiper-swipe").remove()
        }
    }
})