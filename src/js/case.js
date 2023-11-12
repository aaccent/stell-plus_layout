import { handleSwipe } from "./modules/swipe-hint.js"

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

let projectsSwiper = new Swiper(".projects-slider .swiper", {
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
    // on: {
    //     touchStart: function(swiper) {
    //         if (isMobile.any()) {
    //             return
    //         }
    //         swiper.el.querySelector(".swiper-swipe").classList.add("swiper-swipe_grab")
    //     },
    //     touchMove: function(swiper, event) {
    //         if (isMobile.any()) {
    //             return
    //         }

    //         let swipeHint = swiper.el.querySelector(".swiper-swipe")

    //         let coordX = event.screenX - swipeHint.offsetWidth * 0.4;
    //         let coordY = event.clientY - swipeHint.offsetHeight * 0.4;

    //         if (!swipeHint.classList.contains("swiper-swipe_show")) {
    //             swipeHint.classList.add("swiper-swipe_show")
    //         }
    //         swipeHint.style.cssText = `
    //             position: fixed;
    //             top: ${coordY}px;
    //             left: ${coordX}px;
    //         `            
    //     },
    //     touchEnd: function(swiper) {
    //         if (isMobile.any()) {
    //             return
    //         }
    //         swiper.el.querySelector(".swiper-swipe").classList.remove("swiper-swipe_grab")
    //     }
    // }
})

handleSwipe(projectsSwiper)

// let projectsHint = projectsSwiper.el.querySelector(".swiper-swipe")

// projectsSwiper.wrapperEl.addEventListener("mouseenter", () => {
//     if (isMobile.any()) {
//         return
//     }
//     projectsHint.classList.add("swiper-swipe_show")
// })

// projectsSwiper.wrapperEl.addEventListener("mousemove", e => {
//     if (isMobile.any()) {
//         return
//     }
//     let coordX = e.clientX - projectsHint.offsetWidth * 0.4;
//     let coordY = e.clientY - projectsHint.offsetHeight * 0.4;

//     projectsHint.style.cssText = `
//         position: fixed;
//         top: ${coordY}px;
//         left: ${coordX}px;
//     `
// })

// projectsSwiper.wrapperEl.addEventListener("mouseleave", () => {
//     if (isMobile.any()) {
//         return
//     }
//     projectsHint.classList.remove("swiper-swipe_show")
// })

