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

let mm = gsap.matchMedia();
let scrollTriggerInstance;

mm.add("(min-width: 577px)", () => {
    if (scrollTriggerInstance) scrollTriggerInstance.kill()
    scrollTriggerInstance = ScrollTrigger.create({
        trigger: ".equipment-section",
        start: "top -10%",
        end: () => `+=${getScrollAmount() * -1}`,
        ease: "none",
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        markers: false,
    })
})

mm.add("(max-width: 576px)", () => {
    if (scrollTriggerInstance) scrollTriggerInstance.kill()
    scrollTriggerInstance = ScrollTrigger.create({
        trigger: ".equipment-section",
        start: "top -25%",
        end: () => `+=${getScrollAmount() * -1}`,
        ease: "none",
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        markers: false,
    })
})

window.addEventListener("resize", () => scrollTriggerInstance.refresh())
// window.addEventListener("scroll", () => {
//     let start = scrollContainerEl.offsetTop;
//     let end = start - amountToScroll;
//     let scrollOffset;

//     console.log(amountToScroll )
//     if (window.pageYOffset < start) {
//         scrollOffset = 0
//     }
//     if (window.pageYOffset >= start && window.pageYOffset < end) {
//         scrollOffset = window.pageYOffset - start
//     } 
//     if (window.pageYOffset > end) {
//         scrollOffset = -amountToScroll
//     }

//     document.querySelector(".equipment-section__slider .swiper-wrapper").style.transform = `translate3d(${-scrollOffset}px, 0px, 0px)`
// })

import "./components/service.js"
import "./components/banner-slider.js"


