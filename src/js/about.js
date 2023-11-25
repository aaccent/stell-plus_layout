import "./components/banner-slider.js"
import { handleSwipe } from "./modules/swipe-hint.js"
import { handleEquipmentCard } from "./modules/equipment-item.js"

let timelineSwiper = new Swiper(".timeline-slider .swiper", {
    slidesPerView: 1,
    spaceBetween: 55,
    scrollbar: {
        el: ".timeline-slider .swiper-scrollbar",
        draggable: true
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

handleEquipmentCard("equipment-section__slider-wrapper")

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
        el: ".swiper-scrollbar",
        draggable: true
    }
})

handleSwipe(certificateSwiper)

// animations 
let heroTitleSplit = new SplitType(".hero-section__title",{
    types: "lines",
    tagName: "div"
});

let heroDescSplit = new SplitType(".hero-section__desc",{
    types: "lines",
    tagName: "div"
});

let heroTimeline = gsap.timeline()

heroTimeline
    .from(".hero-section__title .line", {
        yPercent: 100,
        opacity: 0,
        duration: 0.4,
        ease: "power1.out",
        stagger: {
            amount: 0.3
        },
        onStart: () => { 
            document.querySelector(".hero-section__content").style.opacity = 1;
        }
    })
    .from(".hero-section__desc .line", {
        yPercent: 100,
        opacity: 0,
        duration: 0.4,
        ease: "power1.out",
        stagger: {
            amount: 0.3
        },
    })
    .from(".hero-section__button", {
        scale: 0.65,
        opacity: 0,
        duration: 0.4,
        ease: "back.out",
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

let roundedSectionEls = gsap.utils.toArray(".hero-section, .suggest-section")

roundedSectionEls.forEach(sectionEl => {
    ScrollTrigger.create({
        trigger: sectionEl,
        start: () => {
            let remValue = getComputedStyle(document.documentElement).fontSize;
            return sectionEl.offsetHeight < window.innerHeight ? `${remValue}  top` : "bottom bottom"
        },
        pin: true,
        pinSpacing: false,
    })
})

let imageTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".section_one .section__images",
        start: "top 80%"
    }
})

imageTimeline
    .from(".section_one img", {
        scale: 1.3,
        duration: 2.25,
        ease: "cubic-bezier(0.38, 0.005, 0.215, 1)"
    })
    .from(".section_one .section__img", {
        opacity: 0,
        duration: 0.9,
        ease: "cubic-bezier(0.38, 0.005, 0.215, 1)"
    }, "<")

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

let suggestDescSplit = new SplitType(".suggest-section__desc",{
    types: "lines",
    tagName: "div"
});

gsap.from(".suggest-section__desc .line", {
    scrollTrigger: {
        trigger: ".suggest-section__desc",
        start: "top 80%"
    },
    yPercent: 100,
    opacity: 0,
    duration: 0.4,
    ease: "power1.out",
    stagger: {
        amount: 0.3
    },
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
 

gsap.from(".timeline-slider .swiper-wrapper", {
    scrollTrigger: { 
        trigger: ".timeline-slider .swiper-wrapper",
        start: "top 80%",
    },
    opacity: 0,
    duration: 0.5,
})

let timelime = gsap.timeline({
    scrollTrigger: {
        trigger: ".timeline-section__img",
        start: "top 80%"
    }
})
timelime
    .from(".timeline-section__img img", {
        scale: 1.3,
        duration: 2.25,
        ease: "cubic-bezier(0.38, 0.005, 0.215, 1)"
    })
    .from(".timeline-section__img", {
        opacity: 0,
        duration: 0.9,
        ease: "cubic-bezier(0.38, 0.005, 0.215, 1)"
    }, "<")

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

gsap.from(".certificates-section__slider .swiper", {
    scrollTrigger: {
        trigger: ".certificates-section__slider",
        start: "top 80%"
    },
    opacity: 0,
    duration: 0.6
})