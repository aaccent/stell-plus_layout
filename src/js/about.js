import "./components/banner-slider.js"
import { handleSwipe } from "./modules/swipe-hint.js"
import { handleEquipmentCard } from "./modules/equipment-item.js"
import { imgOpacityAnimation, imgScaleAnimation, linesAnimation, textAnimation } from "./modules/animation-templates.js"
import LocomotiveScroll from "locomotive-scroll"

const scroll = new LocomotiveScroll();
const arrowButton = document.querySelector(".hero-section__button");

arrowButton.addEventListener("click", (e) => {
    e.preventDefault()
    scroll.scrollTo(document.querySelector(".hero-section").parentElement.nextElementSibling, {
        offset: 2 * parseFloat(getComputedStyle(document.documentElement).fontSize)

    })
})

if (document.querySelector(".timeline-section")) {
    let imgSwiper = new Swiper(".img-slider .swiper", {
        slidesPerView: 1,
        speed: 800,
        effect: "fade",
        fadeEffect: {
            crossFade: true,
        },
        allowTouchMove: false
    })

    let timelineSwiper = new Swiper(".timeline-slider .swiper", {
        slidesPerView: 1,
        spaceBetween: 55,
        scrollbar: {
            el: ".timeline-slider .swiper-scrollbar",
            draggable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    })

    // imgSwiper.controller.control = timelineSwiper;
    timelineSwiper.controller.control = imgSwiper;
    handleSwipe(timelineSwiper)
}

if (document.querySelector(".equipment-section")) {
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

    handleEquipmentCard("equipment-section__slider-wrapper")
}


if (document.querySelector(".certificates-section")) {
    let certificateSwiper = new Swiper(".certificates-section__slider .swiper", {
        slidesPerView: 1,
        spaceBetween: 16,
        breakpoints: {
            576: {
                slidesPerView: "auto"
            },
        },
        scrollbar: {
            el: ".swiper-scrollbar",
            draggable: true
        }
    })
    
    handleSwipe(certificateSwiper)
}

// animations 
let heroTitleSplit = new SplitType(".hero-section__title",{
    types: "lines",
    tagName: "div"
});
let heroTimeline = gsap.timeline()
heroTimeline
    .from(heroTitleSplit.lines, {
        ...linesAnimation,
        onStart: () => { 
            document.querySelector(".hero-section__content").style.opacity = 1;
        }
    })
    .from(".hero-section__desc", textAnimation)
    .from(".hero-section__button", {
        scale: 0.65,
        opacity: 0,
        duration: 0.4,
        ease: "back.out",
    })

gsap.to("[data-speed]", {
    y: (i, el) => parseFloat(el.getAttribute("data-speed")) * ScrollTrigger.maxScroll(window) ,
    ease: "none",
    scrollTrigger: {
        start: 0,
        end: "max",
        invalidateOnRefresh: true,
        scrub: 0
    }
});

let roundedSectionEls = gsap.utils.toArray(".hero-section, .suggest-section, .timeline-section")

roundedSectionEls.forEach(sectionEl => {
    ScrollTrigger.create({
        trigger: sectionEl,
        start: () => {
            let remValue = getComputedStyle(document.documentElement).fontSize;
            return sectionEl.offsetHeight < window.innerHeight ? `${remValue}  top` : "bottom bottom"
        },
        pin: true,
        pinSpacing: false,
        onLeave: (self) => self.trigger.classList.contains("._notransform") && self.trigger.classList.remove("_notransform")
    })
})

let imageTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".section_one .section__images",
        start: "top 80%"
    }
})
imageTimeline
    .from(".section_one img", imgScaleAnimation)
    .from(".section_one .section__img", imgOpacityAnimation, "<")



let profileTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".person-info",
        start: "top 85%"
    }
})
profileTimeline
    .from(".person-info__content", {
        yPercent: 35,
        opacity: 0,
        duration: 0.4,
        ease: "power1.out",
    })
    .from(".person-info__avatar img", {
        scale: 1.25,
        opacity: 0,
        duration: 0.4,
        ease: "power1.out",
    })


gsap.from(".suggest-section__desc", {
    scrollTrigger: {
        trigger: ".suggest-section__desc",
        start: "top 80%"
    },
    ...textAnimation,
})

let advantageMatchMedia = gsap.matchMedia();
let advantageEls = gsap.utils.toArray(".suggest-section__advantage-item")

advantageMatchMedia.add({
    isMobile: "(max-width: 576px)",
    isDesktop: "(min-width: 577px)"
}, context => {
    let { isMobile, isDesktop } = context.conditions

    if (isMobile) {
        advantageEls.forEach(advantageEl => 
            gsap.from(advantageEl, {
                scrollTrigger: {
                    trigger: advantageEl,
                    start: "top 80%"
                },
                yPercent: 35,
                opacity: 0,
                duration: 0.4
            })    
        )
    } else {
        gsap.from(advantageEls, {
            scrollTrigger: {
                trigger: ".suggest-section__advantages-list",
                start: "top 80%"
            },
            yPercent: 35,
            opacity: 0,
            duration: 0.5,
            stagger: {
                amount: 0.4
            }
        })
    }
})
 
gsap.from(".timeline-section .swiper-buttons", {
    scrollTrigger: {
        trigger: ".timeline-section .swiper-buttons",
        start: "top 80%"
    },
    yPercent: 25,
    opacity: 0,
    duration: 0.6
})

gsap.from(".timeline-slider .swiper-wrapper", {
    scrollTrigger: { 
        trigger: ".timeline-slider .swiper-wrapper",
        start: "top 80%",
    },
    opacity: 0,
    duration: 0.5,
})

// let timelime = gsap.timeline({
//     scrollTrigger: {
//         trigger: ".timeline-section__img",
//         start: "top 80%"
//     }
// })
// timelime
//     .from(".timeline-section__img img", imgScaleAnimation)
//     .from(".timeline-section__img", imgOpacityAnimation, "<")

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

let bannerSlideEls = gsap.utils.toArray(".banner-slide")
if (bannerSlideEls.length) {
    bannerSlideEls.forEach((bannerSlideEl, i) => {
        console.log(bannerSlideEl)
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
}

gsap.from(".certificates-section__slider .swiper", {
    scrollTrigger: {
        trigger: ".certificates-section__slider",
        start: "top 80%"
    },
    opacity: 0,
    duration: 0.6
})