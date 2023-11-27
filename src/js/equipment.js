import LocomotiveScroll from "locomotive-scroll";
import { linesAnimation } from "./modules/animation-templates.js";

const scroll = new LocomotiveScroll();

const clearTagEl = document.querySelector(".tag_clear")

document.querySelectorAll(".tag").forEach(tagEl => {
    tagEl.addEventListener("click", e => {
        const targetEl = e.currentTarget;
        if (targetEl.classList.contains("tag_clear")) {
            let activeTagEls = document.querySelectorAll(".tag_selected")
            for (let i = 0; i < activeTagEls.length; i++) {
                activeTagEls[i].classList.remove("tag_selected")
            }
            tagEl.classList.add("tag_disabled")
        // клик по фильтру
        } else {
            targetEl.classList.toggle("tag_selected")
            if (!document.querySelectorAll(".tag_selected").length) {
                clearTagEl.classList.add("tag_disabled")
            } else if (clearTagEl.classList.contains("tag_disabled")) {
                clearTagEl.classList.remove("tag_disabled")
            }
        }
    })
})


// animations

let heroTitleSplit = new SplitType(".hero-section__title",{
    types: "lines",
    tagName: "div"
});
let heroTimeline = gsap.timeline()
heroTimeline
    .from(".hero-section__model video", {
        opacity: 0,
        duration: 0.6,
        ease: "power1.out",
        onStart: () => { 
            // let duration = getComputedStyle(document.querySelector(".hero-section__running-line .running-line__wrapper")).animationDuration
            // duration = parseInt(duration) * document.querySelector(".hero-section__running-line").offsetWidth / document.querySelector(".hero-section__running-line .running-line__wrapper").offsetWidth
            document.querySelector(".hero-section__content").style.opacity = 1;
            // document.querySelector(".hero-section__running-line").style = `
            //     transform: translate(-50%, -50%);
            //     transition-property: transform;
            //     transition-timing-function: linear;
            //     transition-duration: ${duration}s;
            // `
            // document.querySelector(".hero-section__running-line .running-line__wrapper").style = `
            //     animation-delay: ${duration}s;
            //     animation-play-state: running
            // `
        }
    })
    .from(heroTitleSplit.lines, linesAnimation, "<0.3")
    .from(".hero-section__stat-value", {
        yPercent: 50,
        opacity: 0,
        duration: 0.4,
        ease: "power1.out",
        stagger: {
            amount: 0.3
        }
    })
    .from(".hero-section__stat-unit", {
        yPercent: 100,
        opacity: 0,
        duration: 0.4,
        ease: "power1.out",
        stagger: {
            amount: 0.3
        }
    }, "<0.2")


gsap.to("[data-speed]", {
    y: (i, el) => parseFloat(el.getAttribute("data-speed")) * ScrollTrigger.maxScroll(window) ,
    ease: "none",
    scrollTrigger: {
        start: 0,
        end: "max",
        invalidateOnRefresh: true,
        scrub: 0
    }
})

gsap.from(".filter-panel", {
    scrollTrigger: {
        trigger: ".equipment__header",
        start: "top 80%"
    },
    yPercent: 50,
    opacity: 0,
    duration: 0.5,
})


let equipmentEls = gsap.utils.toArray(".equipment-item")
let mm = gsap.matchMedia()
let paddingValue = window.innerWidth - document.documentElement.clientWidth;

mm.add({
    oneColumn: `(max-width: ${675 + paddingValue}px)`,
    twoColumn: `(max-width: ${1002 + paddingValue}px)`,
    threeColum: `(max-width: ${1327 + paddingValue}px)`,
    fourColumn: `(min-width: ${1328 + paddingValue}px)`
}, context => {
    let { oneColumn, twoColumn, threeColum } = context.conditions
    equipmentEls.forEach((equipmentEl, i) => {
        gsap.from(equipmentEl, {
            scrollTrigger: {
                trigger: equipmentEl,
                start: "top 80%"
            },
            y: 100,
            opacity: 0,
            duration: 0.5,
            delay: () => {
                if (oneColumn) {
                    return 0
                }
                if (twoColumn) {
                    return 0.2 * (i % 2)
                }
                if (threeColum) {
                    return 0.2 * (i % 3)
                }
                return 0.2 * (i % 4)
            },
            // stagger: {
            //     amount: 0.4
            // }
        })
    })
})

gsap.from(".equipment__more", {
    scrollTrigger: {
        trigger: ".equipment__grid",
        start: "bottom 80%"
    },
    scale: 0.65,
    opacity: 0.5,
    duration: 1,
    ease: "back.out(2)",
})


ScrollTrigger.create({
    trigger: ".hero-section",
    start: "top top",
    pin: true,
    pinSpacing: false,
})