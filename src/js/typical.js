import { handleVideo } from "./modules/fullscreen-video.js"
import LocomotiveScroll from "locomotive-scroll";
import { imgOpacityAnimation, imgScaleAnimation, linesAnimation } from "./modules/animation-templates.js";

const accordionHeaderEls = document.querySelectorAll(".accordion__header");

accordionHeaderEls.forEach(accordionHeaderEl => {
    accordionHeaderEl.addEventListener("click", e => {
        const accordionEl = accordionHeaderEl.parentElement;
        const accordionBodyEl = accordionHeaderEl.nextElementSibling;
        const accordionTextEl = accordionBodyEl.firstElementChild;

        let timeoutId;

        if (accordionEl.classList.contains("accordion_open")) {
            let accordionBodyHeight = accordionBodyEl.offsetHeight;
            accordionBodyEl.style.height = accordionBodyHeight + "px";
            accordionEl.classList.remove("accordion_open")
            timeoutId = setTimeout(() => accordionBodyEl.style.height = "")
        } else {
            clearTimeout(timeoutId)
            accordionEl.classList.add("accordion_open");
            accordionBodyEl.style.height = accordionTextEl.offsetHeight + "px";
            accordionBodyEl.addEventListener("transitionend", () => {
                accordionBodyEl.style.height = "auto"
            }, { once: true })
        }

    })
})

let curSection = 0;
let sectionEls = document.querySelectorAll(".page__content .page-section")
let pageNavEl = document.querySelector(".page__nav")
let pageNavItemEls = pageNavEl.querySelectorAll(".page__menu-item")
let lastPosY = 0

const scroll = new LocomotiveScroll();

pageNavItemEls.forEach(navItem => {
    let linkEl = navItem.querySelector(".page__menu-link")
    let sectionId = linkEl.getAttribute("href")
    const target = document.getElementById(sectionId.slice(1))
    navItem.addEventListener("click", (e) => {
        e.preventDefault()
        scroll.scrollTo(target, {
                offset: -100,
                duration: 800,
            }
        )
    })
})

window.addEventListener("scroll", () => {
    let posY = window.pageYOffset;
    
    if (posY > lastPosY) {
        if (curSection === sectionEls.length - 1)
            return
        let sectionYOffset = sectionEls[curSection + 1].offsetParent.offsetTop + sectionEls[curSection + 1].offsetTop
        if (posY >= sectionYOffset - window.innerHeight / 2) {
            pageNavItemEls[curSection].classList.remove("page__menu-item_active")
            pageNavItemEls[curSection + 1].classList.add("page__menu-item_active")
            curSection += 1
        }
    }  else {
        if (curSection === 0)
            return 
        let sectionYOffset = sectionEls[curSection].offsetParent.offsetTop + sectionEls[curSection].offsetTop
        if (sectionYOffset - window.innerHeight / 2 >= posY) {
            pageNavItemEls[curSection].classList.remove("page__menu-item_active")
            pageNavItemEls[curSection - 1].classList.add("page__menu-item_active")
            curSection -= 1
        } 
    }

    lastPosY = posY
})

const videoEl = document.getElementById("video")

handleVideo(videoEl)
videoEl.pause()
videoEl.currentTime = 0

  
// animations 

let bannerTitleSplit = new SplitType(".banner-section__title", {
    types: "words, chars",
    tagName: "span"
});

let pageTitleSplit = new SplitType(".page-section__title", {
    types: "words, chars",
    tagName: "span"
});

let textSplit = new SplitType(".page-section__text, .page__text", {
    types: "lines",
    tagName: "div"
})

let pageTitleEls = document.querySelectorAll(".page-section__title")
let textEls = document.querySelectorAll(".page-section__text, .page__text")

pageTitleEls.forEach(pageTitleEl => {
    gsap.from(pageTitleEl.querySelectorAll(".char"), {
        scrollTrigger: {
            trigger: pageTitleEl,
            start: "top 80%"
        },
        yPercent: 115,
        opacity: 0,
        duration: 0.4,
        stagger: {
            amount: 0.3
        }
    })
})

textEls.forEach(textEl => {
    gsap.from(textEl.querySelectorAll(".line"), {
        scrollTrigger: {
            trigger: textEl,
            start: "top 80%"
        },
        ...linesAnimation
    })
})

let bannerTimeline = gsap.timeline()

bannerTimeline
    .from(".banner-section__content", {
        ...imgOpacityAnimation,
        onStart: () => document.querySelector(".banner-section").style.opacity = 1,

    })
    .from(".banner-section__content img", imgScaleAnimation, "<")
    .from(".banner-section__title .char", {
        yPercent: 115,
        opacity: 0,
        duration: 0.4,
        stagger: {
            amount: 0.3
        }
    }, 0.5)

gsap.from(".page__nav", {
    scrollTrigger: {
        trigger: ".page__body",
        start: "top 80%"
    },
    yPercent: 25,
    opacity: 0,
    duration: 0.6,
})

let imgContainerEls = gsap.utils.toArray(".page-section__image")
imgContainerEls.forEach((imgContainer, i) => {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: imgContainer,
            start: "top 90%"
        }
    })
    tl.from(imgContainer.querySelector("img"), imgScaleAnimation)
    tl.from(imgContainer, imgOpacityAnimation, "<")
})

let menuEls = gsap.utils.toArray(".page-section__menu")
menuEls.forEach(menuEl => {
    gsap.from(menuEl.querySelectorAll(".page-section__menu-item"), {
        scrollTrigger: {
            trigger: menuEl,
            start: "top 80%"
        },
        yPercent: 100,
        opacity: 0,
        duration: 0.4,
        stagger: {
            amount: 0.3
        },
    })
})

gsap.from(videoEl.parentElement, {
    scrollTrigger: {
        trigger: videoEl.parentElement,
        start: "top 70%"
    },
    opacity: 0,
    duration: 0.9,
    ease: "cubic-bezier(0.38, 0.005, 0.215, 1)",
    onStart: () => videoEl.play()
})

let accordionEls = gsap.utils.toArray(".accordion")
accordionEls.forEach(accordionEl => {
    gsap.from(accordionEl, {
        scrollTrigger: {
            trigger: accordionEl,
            start: "top 80%"
        },
        yPercent: 20,
        opacity: 0,
        duration: 0.4,
    })
})

let documentCardEls = gsap.utils.toArray(".document-card")
documentCardEls.forEach(documentCardEl => {
    gsap.from(documentCardEl, {
        scrollTrigger: {
            trigger: documentCardEl,
            start: "top 80%"
        },
        scale: 0.75,
        opacity: 0,
        duration: 0.4,
    })
})