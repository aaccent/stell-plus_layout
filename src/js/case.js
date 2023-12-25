import { handleSwipe } from "./modules/swipe-hint.js"
import { imgOpacityAnimation, imgScaleAnimation } from "./modules/animation-templates.js"

if (document.querySelector(".section__images")) {
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
}

if (document.querySelector(".equipments-section")) {
    new Swiper(".equipments-slider", {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        breakpoints: {
            480: {
                slidesPerView: 2,
                spaceBetween: 16,
            },
            768: {
                slidesPerView: 3
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
}

if (document.querySelector(".results-section")) {
    new Swiper(".results-slider .swiper", {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
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
}

if (document.querySelector(".projects-section")) {
    let projectsSwiper = new Swiper(".projects-slider .swiper", {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        breakpoints: {
            860: {
                slidesPerView: 2
            }
        },
        navigation: {
            nextEl: ".projects-section .swiper-button-next",
            prevEl: ".projects-section .swiper-button-prev",
        },
    })
    
    handleSwipe(projectsSwiper)
}


// animations
let bannerTimeline = gsap.timeline()

bannerTimeline
    .from(".banner-section__content", {
        opacity: 0,
        duration: 0.9,
        ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
        onStart: () => document.querySelector(".banner-section").style.opacity = 1,
    })
    .from(".banner-section__img", imgScaleAnimation, "<")
    .from(".banner-section__logo", imgOpacityAnimation, 0.5)

    
let sectionImgEls = gsap.utils.toArray(".section__img")
sectionImgEls.forEach(sectionImgEl => {
    let imgTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: sectionImgEl,
            start: "top 90%"
        }
    })

    let img = sectionImgEl.querySelector("img")

    imgTimeline
        .from(img, imgScaleAnimation)
        .from(sectionImgEl, imgOpacityAnimation, "<")
})

gsap.from(".equipments-section .swiper-buttons", {
    scrollTrigger: {
        trigger: ".equipments-section .section__header",
        start: "top 80%"
    },
    yPercent: 10,
    opacity: 0,
    duration: 0.6
})

gsap.from(".equipments-slider", {
    scrollTrigger: {
        trigger: ".equipments-slider",
        start: "top 80%"
    },
    yPercent: 10,
    opacity: 0,
    duration: 0.6
})


let resultImgEls = gsap.utils.toArray(".results-slider .swiper-slide")
resultImgEls.forEach(resultImgEl => {
    let imgTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".results-slider",
            start: "top 90%"
        }
    })

    let img = resultImgEl.querySelector("img")

    imgTimeline
        .from(img, imgScaleAnimation)
        .from(resultImgEl, imgOpacityAnimation, "<")
})

gsap.from(".projects-section .swiper-buttons", {
    scrollTrigger: {
        trigger: ".projects-section .section__header",
        start: "top 80%"
    },
    yPercent: 10,
    opacity: 0,
    duration: 0.6
})

let projectEls = gsap.utils.toArray(".project")
projectEls.forEach((projectEl, i) => {
    let timeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".projects-slider",
            start: "top 80%"
        },
    })
    timeline
        .from(projectEl.querySelector(".project__img"), imgScaleAnimation)
        .from(projectEl.querySelector(".project__img"), imgOpacityAnimation, "<")
        .from(projectEl.querySelector(".project__content"), {
            opacity: 0,
            duration: 0.5
        }, 0.5)
        .from(projectEl.querySelector(".project__logo"), {
            scale: 0.7,
            opacity: 0,
            duration: 0.5,
            ease: "back.out"
        }, "<")
})
