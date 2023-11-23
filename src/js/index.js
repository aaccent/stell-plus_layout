
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

// sliders
new Swiper(".hero-section__slider .swiper", {
    slidesPerView: 1,
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

// animations
let heroTitleSplit = new SplitType(".hero-slide__title",{
    types: "lines",
    tagName: "div"
});

let heroDescSplit = new SplitType(".hero-slide__desc",{
    types: "lines",
    tagName: "div"
});
  
const heroSlideEls = document.querySelectorAll(".hero-slide")


heroSlideEls.forEach(heroSlideEl => {
    let tl = gsap.timeline({
        onStart: () => heroSlideEl.querySelector(".hero-slide__content").style.opacity = 1
    })

    tl
        .from(heroSlideEl.querySelectorAll(".hero-slide__title .line"), {
            yPercent: 100,
            opacity: 0,
            duration: 0.4,
            stagger: {
                amount: 0.3
            }
        }, )
        .from(heroSlideEl.querySelectorAll(".hero-slide__desc .line"), {
            yPercent: 100,
            opacity: 0,
            duration: 0.4,
            stagger: {
                amount: 0.3
            }
        })
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

let sectionInfoEls = gsap.utils.toArray(".section__info")

sectionInfoEls.forEach(sectionInfoEl => {
    let children = sectionInfoEl.children;
    gsap.from(children, {
        scrollTrigger: {
            trigger: sectionInfoEl,
            start: "top 80%"
        },
        yPercent: 30,
        opacity: 0,
        stagger: {
            amount: 0.4
        }
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
    tl.from(bannerSlideEl.querySelector("img"), {
        scale: 1.3,
        duration: 2.25,
        ease: "cubic-bezier(0.38, 0.005, 0.215, 1)"
    })
    tl.from(bannerSlideEl.querySelector("img"), {
        opacity: 0,
        duration: 0.9,
        ease: "cubic-bezier(0.38, 0.005, 0.215, 1)"
    }, "<")
})

let aboutBgTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".about-section__stats",
        start: "top 80%"
    },
})

aboutBgTimeline.from(".about-section__bg", {
    scale: 1.3,
    duration: 2.25,
    ease: "cubic-bezier(0.38, 0.005, 0.215, 1)"
})
aboutBgTimeline.from(".about-section__bg", {
    opacity: 0,
    duration: 0.9,
    ease: "cubic-bezier(0.38, 0.005, 0.215, 1)"
}, "<")

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

import "./components/service.js"
import "./components/banner-slider.js"


