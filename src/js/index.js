
let videoEl = document.querySelector(".hero-section__video")

document.querySelectorAll(".hero-slide__video").forEach(videoButton => {
    videoButton.addEventListener("click", e => {
        e.preventDefault()
        if (videoEl.requestFullscreen) {
            videoEl.requestFullscreen();
        } else if (videoEl.webkitRequestFullscreen) {
            videoEl.webkitRequestFullscreen();
        } else if (videoEl.mozRequestFullScreen) {
            videoEl.mozRequestFullScreen();
        } else if (videoEl.msRequestFullscreen) {
            videoEl.msRequestFullscreen();
        }
    })
})

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
    allowTouchMove: false,
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
    allowTouchMove: false
})

let swiperWrapperEl = document.querySelector(".equipment-section__slider .swiper-wrapper")
let equipmentEls = document.querySelectorAll(".equipment-section__slider .swiper-slide")

function getScrollAmount() {
	let swiperWidth = document.querySelector(".equipment-section__slider .swiper").offsetWidth;
    let wrapperWidth = 0

    for (let i = 0; i < equipmentEls.length; i++) {
        wrapperWidth += equipmentEls[i].offsetWidth
    }
    
    wrapperWidth += 16 * (equipmentEls.length - 1)

	return swiperWidth - wrapperWidth
}

let tween = gsap.to(swiperWrapperEl, {
	x: getScrollAmount,
	duration: 3,
	ease: "none",
});

let scrollTriggerInstance;

scrollTriggerInstance = ScrollTrigger.create({
    trigger: ".equipment-section",
    start: "bottom bottom",
    end: () => `+=${getScrollAmount() * -1}`,
    ease: "none",
    pin: true,
    animation: tween,
    scrub: 1,
    invalidateOnRefresh: true,
    markers: false,
})

// let mm = gsap.matchMedia();
// let scrollTriggerInstance;

// mm.add("(min-width: 577px)", () => {
//     if (scrollTriggerInstance) scrollTriggerInstance.kill()
//     scrollTriggerInstance = ScrollTrigger.create({
//         trigger: ".equipment-section",
//         start: () => `end ${parseInt(getComputedStyle(document.documentElement).fontSize) * -5.625}px`,
//         end: () => `+=${getScrollAmount() * -1}`,
//         ease: "none",
//         pin: true,
//         animation: tween,
//         scrub: 1,
//         invalidateOnRefresh: true,
//         markers: false,
//     })
// })

// mm.add("(max-width: 576px)", () => {
//     if (scrollTriggerInstance) scrollTriggerInstance.kill()
//     scrollTriggerInstance = ScrollTrigger.create({
//         trigger: ".equipment-section",
//         start: "end -45px",
//         end: () => `+=${getScrollAmount() * -1}`,
//         ease: "none",
//         pin: true,
//         animation: tween,
//         scrub: 1,
//         invalidateOnRefresh: true,
//         markers: false,
//     })
// })

window.addEventListener("resize", () => scrollTriggerInstance.refresh())

import "./components/service.js"
import "./components/banner-slider.js"


