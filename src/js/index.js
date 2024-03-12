
import { handleEquipmentCard } from "./modules/equipment-item.js"
import { linesAnimation, imgScaleAnimation, imgOpacityAnimation, textAnimation } from "./modules/animation-templates.js"

let videoEl = document.querySelector(".hero-section__video video")

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

// sliders

new Swiper(".hero-section__slider .swiper", {
    slidesPerView: 1,
    loop: true,
    speed: 800,// (getComputedStyle(document.documentElement).getPropertyValue('--screen-diff') && 0),
    observer: true,
    // parallax: true,
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


if (document.querySelector(".equipment-section")) {
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
    
    handleEquipmentCard("equipment-section__slider-wrapper")
}

// animations
// page preloader animation
gsap.timeline({
    onStart: () => {
        let paddingValue = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.setProperty('--padding-value', `${paddingValue}px`);        
        document.body.style.cssText = `
            height: 100vh;
            overflow: hidden
        `
    },
    onComplete: () => {
        setTimeout(() => {
            document.documentElement.style.setProperty('--padding-value', `${0}px`);        
            document.body.style = "";
            ScrollTrigger.refresh()
        }, 300)
    }
})
.set(".preloader__logo", { opacity: 1 })
.from(".preloader__logo svg", {
    scale: 2,
    duration: 1.5,
}, "scaleLabel")
.from(".preloader__logo svg", {
    rotate: -360,
    duration: 1.5,
    ease: "linear"
}, "<+=1")
.to(".preloader__container", {
    width: () => document.querySelector(".preloader__container").offsetWidth + document.querySelector(".preloader__text").scrollWidth,
    duration: 1,
    onStart: () => {
        document.querySelector(".preloader__container").style.overflow = "hidden"
    },
}, "<+=0.5")
.to(".preloader__text", {
    opacity: 1,
    duration: 0
}, "<")
.to(".preloader", {
    backgroundColor: "#333",
    duration: 0.5,
    onStart: () => document.querySelector(".preloader").classList.add("preloader_dark"),
})
.to(".preloader", {
    yPercent: -110,
    duration: 0.8,
    delay: 0.3,
})

new SplitType(".hero-slide__title",{
    types: "lines",
    tagName: "div"
});
  
gsap.from(".hero-section__video video ", {
    opacity: 0,
    duration: 0.9,
    ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
    onStart: () => document.querySelector(".hero-section__video").style.opacity = 1,
    onComplete: () => document.querySelector(".hero-section__blur").style.opacity = 1
})

const heroSlideEls = document.querySelectorAll(".hero-slide")
heroSlideEls.forEach(heroSlideEl => {
    let tl = gsap.timeline({
        onStart: () => heroSlideEl.querySelector(".hero-slide__content").style.opacity = 1
    })

    tl
        .from(heroSlideEl.querySelectorAll(".hero-slide__title .line"), linesAnimation)
        .from(heroSlideEl.querySelectorAll(".hero-slide__desc"), textAnimation)
        .from(heroSlideEl.querySelector(".hero-slide__actions"), {
            yPercent: 50,
            opacity: 0,
            duration: 0.4,
        })
})


gsap.from(".equipment-section__info", {
    scrollTrigger: {
        trigger: ".equipment-section__info",
        start: "top 80%"
    },
    yPercent: 20,
    opacity: 0
})

gsap.from(".equipment-section__slider", {
    scrollTrigger: {
        trigger: ".equipment-section__slider",
        start: "top 80%"
    },
    opacity: 0,
    duration: 0.6
})

gsap.to(".equipment-section__header, .equipment-section__body", {
    y: 0.15 * ScrollTrigger.maxScroll(window) ,
    ease: "none",
    scrollTrigger: {
        trigger: ".services-section",
        start: "top 80%",
        end: "max",
        invalidateOnRefresh: true,
        scrub: 0
    }
});



let serviceEls = gsap.utils.toArray(".service")
serviceEls.forEach(serviceEl => {
    gsap.from(serviceEl, {
        scrollTrigger: {
            trigger: serviceEl,
            start: "top 80%"
        },
        yPercent: 20,
        opacity: 0,
    })
})



let bannerSlideEls = gsap.utils.toArray(".banner-slide")
bannerSlideEls.forEach((bannerSlideEl, i) => {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: bannerSlideEl,
            start: "top 90%"
        },
        onStart: () => {
            if (i === 0) {
                gsap.from(".banner-slider_inner", {
                    opacity: 0,
                    duration: 0.9,
                    delay: 0.5
                })
            }
        }
    })
    tl.from(bannerSlideEl.querySelector("img"), imgScaleAnimation)
    tl.from(bannerSlideEl.querySelector("img"), imgOpacityAnimation, "<")
})


let aboutBgTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".about-section__stats",
        start: "top 80%"
    },
})
aboutBgTimeline.from(".about-section__bg", imgScaleAnimation)
aboutBgTimeline.from(".about-section__bg", imgOpacityAnimation, "<")


let mm = gsap.matchMedia()
mm.add({
    isPhone: "(max-width: 576px)",
    isTablet: "(max-width: 768px)",
    isDesktop: "(min-width: 769px)",
  }, (context) => {
    let { isPhone, isTablet, isDesktop } = context.conditions;

    if (isPhone) {
        let numberCardEls = gsap.utils.toArray(".number-card")
      
        numberCardEls.forEach(numberCardEl => {
            gsap.from(numberCardEl, {
                scrollTrigger: {
                    trigger: numberCardEl,
                    start: "top 80%"
                },
                yPercent: 15,
                opacity: 0,
                duration: 0.4,
            })
        })
    } else {
        gsap.from(".number-card", {
            scrollTrigger: {
                trigger: ".about-section__stats",
                start: isTablet ? "top 80%" : "20% center"
            },
            yPercent: 15,
            opacity: 0,
            duration: 0.4,
            stagger: {
                amount: 0.3
            }
        })

    }
  })

ScrollTrigger.create({
    trigger: document.querySelector("aside"),
    start: () => {
        let remValue = parseInt(getComputedStyle(document.documentElement).fontSize)
        return `top+=${remValue} top`
    },
    pin: true,
    pinSpacing: false,
})

import "./components/service.js"
import "./components/banner-slider.js" 


