import "./components/banner-slider.js"
import { handleSwipe } from "./modules/swipe-hint.js"

let timelineSwiper = new Swiper(".timeline-slider .swiper", {
    slidesPerView: 1,
    spaceBetween: 55,
    scrollbar: {
        el: ".timeline-slider .swiper-scrollbar",
    }
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

// let mm = gsap.matchMedia();
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
//         start: "end -90px",
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

let certificateSwiper = new Swiper(".certificates-section__slider .swiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    breakpoints: {
        576: {
            slidesPerView: "auto"
        },
    },
    on: {
        // lock: function(swiper, event) {
        //     const swiperHintEl = swiper.el.querySelector(".swiper-swipe")
        //     if (swiperHintEl) {
        //         console.log("!!!")
        //         swiperHintEl.remove()
        //     }
        // }
    },
    // pagination: {
    //     el: ".swiper-pagination",
    //     // type: "progressbar",
    // },
    scrollbar: {
        el: ".swiper-scrollbar"
    }
})

handleSwipe(certificateSwiper)

