let lock = false
function openYouTubeVideo(videoEl) {
    if (lock) {
        return 
    }

    const videoContainer = document.getElementById("youtube-container")
    let iframe = videoContainer.querySelector("iframe")
    const src = videoEl.getAttribute("href");

    lock = true
    document.body.classList.add("body_lock")

    videoContainer.classList.add("_open")
    videoContainer.addEventListener("transitionend", () => {
        lock = false
        iframe.setAttribute("src", src + "?&autoplay=1&mute=1")
    }, { once: true })
}

function closeYouTubeVideo(videoEl) {
    if (lock) {
        return 
    }
    videoEl.querySelector("iframe").setAttribute("src", "")
    videoEl.classList.remove("_open")
    document.body.classList.remove("body_lock")
}

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


document.querySelectorAll(".hero-slide__video").forEach(videoEl => {
    videoEl.addEventListener("click", e => {
        e.preventDefault()
        const videoContainer = document.getElementById("youtube-container")

        openYouTubeVideo(videoEl)
        videoContainer.addEventListener("click", e => {
            if (!e.target.closest(".youtube-wrapper")) {
                closeYouTubeVideo(videoContainer)
            }
        })
    })
})

document.addEventListener("keydown", (e) => {
    const openVideoEl = document.querySelector("#youtube-container._open")
    if (e.which === 27 && openVideoEl) {
        closeYouTubeVideo(openVideoEl)
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

import "./components/service.js"
import "./components/banner-slider.js"


