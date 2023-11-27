import "./components/service.js"
import { handleVideo } from "./modules/fullscreen-video.js"
import LocomotiveScroll from "locomotive-scroll"
import { linesAnimation, textAnimation } from "./modules/animation-templates.js"

const videoEl = document.getElementById("video")
handleVideo(videoEl)
videoEl.pause()
videoEl.currentTime = 0

const scroll = new LocomotiveScroll();

const projects = document.querySelector(".projects-section")
const projectsButton = document.querySelector(".hero-section__projects")

projectsButton.addEventListener("click", (e) => {
    e.preventDefault()
    scroll.scrollTo(projects, {
            duration: 1500,
        }
    )
})

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
    .from(".hero-section__projects", {
        xPercent: 20,
        opacity: 0,
        duration: 0.4,
        ease: "power1.out",
    })
    .from(".hero-section__button", {
        yPercent: -50,
        opacity: 0,
        duration: 0.4,
        ease: "power1.out",
    })

gsap.to("[data-speed]", {
    y: (i, el) => parseFloat(el.getAttribute("data-speed")) * ScrollTrigger.maxScroll(window) ,
    ease: "none",
    scrollTrigger: {
        start: 0,
        end: "max",
        invalidateOnRefresh: true,
        scrub: 1
    }
});


let profileTmeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".person-info",
        start: "top 85%"
    }
})
profileTmeline
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

gsap.from(videoEl.parentElement, {
    scrollTrigger: {
        trigger: videoEl.parentElement,
        start: "top 80%"
    },
    opacity: 0,
    duration: 0.9,
    ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
    onStart: () => videoEl.play()
})


let advantageMatchMedia = gsap.matchMedia()
let advantageEls = gsap.utils.toArray(".advantage")

advantageMatchMedia.add({
    oneColumn: `(max-width: 576px)`,
    twoColumn: `(max-width: 1240px)`,
    threeColum: `(min-width: 1241px)`,
}, context => {
    let { oneColumn, twoColumn, threeColum } = context.conditions
    advantageEls.forEach((advantageEl, i) => {
        gsap.from(advantageEl, {
            scrollTrigger: {
                trigger: advantageEl,
                start: "top 80%"
            },
            y: 50,
            opacity: 0,
            duration: 0.5,
            delay: () => {
                if (oneColumn) {
                    return 0
                }
                if (twoColumn) {
                    return i === 2 && 0.4
                }
                if (threeColum) {
                    return 0.4 * (i % 3)
                }
            },
        })
    })
})


gsap.from(".approach-section__desc", {
    scrollTrigger: {
        trigger: ".approach-section__content",
        start: "top 80%"
    },
    ...textAnimation
})

gsap.from(".approach-section__stats", {
    scrollTrigger: {
        trigger: ".approach-section__content",
        start: "center 70%"
    },
    yPercent: 50,
    opacity: 0,
    duration: 0.4,
    ease: "power1.out",
    stagger: {
        amount: 0.3
    },
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


let projectsMatchMedia = gsap.matchMedia()
let projectEls = gsap.utils.toArray(".project")

projectsMatchMedia.add({
    oneColumn: `(max-width: 920px)`,
    twoColumn: "(min-width: 921px)"
}, context => {
    let { oneColumn } = context.conditions
    projectEls.forEach((projectEl, i) => {
        let timeline = gsap.timeline({
            scrollTrigger: {
                trigger: projectEl,
                start: "top 80%"
            },
            delay: oneColumn ? 0 : i % 2 * 0.2
        })
        timeline
            .from(projectEl.querySelector(".project__img"), {
                scale: 1.3,
                duration: 2.25,
                ease: "cubic-bezier(0.38, 0.005, 0.215, 1)"
            })
            .from(projectEl.querySelector(".project__img"), {
                opacity: 0,
                duration: 0.9,
                ease: "cubic-bezier(0.38, 0.005, 0.215, 1)"
            }, "<")
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
    // let { oneColumn } = context.conditions
    // projectEls.forEach((projectEl, i) => {
    //     gsap.from(projectEl, {
    //         scrollTrigger: {
    //             trigger: projectEl,
    //             start: "top 80%"
    //         },
    //         y: 100,
    //         opacity: 0,
    //         duration: 0.5,
    //         delay: oneColumn ? 0 : i % 2 * 0.2
    //     })
    // })
})

let roundedSectionEls = gsap.utils.toArray(".hero-section, .about-section, .approach-section")

roundedSectionEls.forEach(sectionEl => {
    ScrollTrigger.create({
        trigger: sectionEl,
        start: () => {
            let remValue = parseFloat(getComputedStyle(document.documentElement).fontSize);
            return sectionEl.offsetHeight < window.innerHeight ? `${remValue}  top` : "bottom bottom"
        },
        // end: "+= ",
        pin: true,
        pinSpacing: false,
    })
})

gsap.to(".services-section__header, .services-section__list", {
    y: 0.15 * ScrollTrigger.maxScroll(window),
    ease: "none",
    scrollTrigger: {
        trigger: ".services-section + .pin-spacer",
        start: "top 60%",
        end: "max",
        invalidateOnRefresh: true,
        scrub: 0
    }
})