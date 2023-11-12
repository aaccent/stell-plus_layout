import { handleVideo } from "./modules/youtube-modal.js"
import LocomotiveScroll from "locomotive-scroll";

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
  
// const pageSectionObserverEl = document.querySelector(".page-section__observer");

// const callback = function(entries, observer) {
//     // элемент в видимой части экрана
//     if (entries[0].isIntersecting) {
//         pageNavEl.style.cssText = `
//         `
//     } else {
//         if (window.pageYOffset >= pageSectionObserverEl.parentElement.offsetTop + pageSectionObserverEl.parentElement.offsetHeight) {
//             // элемент пропал с видимой части экрана
//             console.log(pageNavEl.offsetTop, pageNavEl.offsetHeight)
//             pageNavEl.style.cssText = `
//                 position: relative;
//                 bottom: ${pageNavEl.offsetTop}px
//             `
//         }
//     }
// }

// const pageNavObserver = new IntersectionObserver(callback)
// pageNavObserver.observe(pageSectionObserverEl)