import LocomotiveScroll from "locomotive-scroll";

const allParamsEl = document.querySelector(".product-section__all-params")
const popupEl = document.querySelector(".product-section__popup")
const lockPaddingElements = document.querySelectorAll(".header__container, .model, .hero-section, .product-section");

function lockBody() {
    let paddingValue = window.innerWidth - document.documentElement.clientWidth;
    if (lockPaddingElements.length && paddingValue) {
        lockPaddingElements.forEach(lockPaddingEl => {
            const selfPaddingValue = parseInt(getComputedStyle(lockPaddingEl).paddingRight);
            lockPaddingEl.style.paddingRight = selfPaddingValue + paddingValue + "px"
        })
    }
    document.body.classList.add("body_lock")
}

function unlockBody () {
    if (lockPaddingElements.length) {
        lockPaddingElements.forEach(lockPaddingEl => lockPaddingEl.style.paddingRight = "")
    }
    document.body.classList.remove("body_lock")
}

function closePopup(popup) {
    popup.addEventListener("transitionend", e => {
        unlockBody()
    }, { once: true })
    popup.classList.remove("popup_open")
}

function openPopup(popup = undefined) {
    lockBody()
    if (popup) {
        popup.classList.add("popup_open")
    } else {
        console.log("Give me a popup")
    }
}

allParamsEl.addEventListener("click", (e) => openPopup(popupEl))
document.querySelector(".popup__close").addEventListener("click", e => closePopup(popupEl))
popupEl.addEventListener("click", e => {
    if (!e.target.closest(".popup__content")) {
        closePopup(popupEl)
    }
})

document.addEventListener("keydown", (e) => {
    if (e.which === 27) {
        popupClose(popup)
    }
})


const callback = function(entries, observer) {
    // элемент в видимой части экрана
    if (entries[0].isIntersecting) {
        modelEl.classList.remove("_squeeze")
    } else {
        // элемент пропал с видимой части экрана
        modelEl.classList.add("_squeeze")
    }
}

const modelObserver = new IntersectionObserver(callback)
const modelObserverEl = document.querySelector(".model-observer")
const modelEl = document.querySelector(".model img")

if (window.innerWidth > 992 && window.innerWidth <= 1280) {
    modelObserver.observe(modelObserverEl)
}

const mediaQuery = window.matchMedia("(min-width: 992.02px) and (max-width: 1280px)")

mediaQuery.addEventListener("change", e => {
    if (e.matches) {
        modelObserver.observe(modelObserverEl)
    } else {
        modelObserver.unobserve(modelObserverEl)
        modelEl.classList.contains("_squeeze") && modelEl.classList.remove("_squeeze")
    }
})

const scroll = new LocomotiveScroll();

const footerForm = document.querySelector(".footer__contact-us")
const callButton = document.querySelector(".hero-section__call-button")

callButton.addEventListener("click", (e) => {
    e.preventDefault()
    scroll.scrollTo(footerForm, {
            duration: 3000,
            callback: () => console.log("get it")
        }
    )
})

document.querySelector(".popup__body").addEventListener("scroll", e => {
    document.querySelector(".popup__gradient").style.cssText = `
        opacity: 0;
        transform: translate(0, 100%)
    `
}, { once: true })


// animations
let heroTitleSplit = new SplitType(".hero-section__title",{
    types: "lines",
    tagName: "div"
});


let heroTimeline = gsap.timeline()

heroTimeline
    .from(".hero-section__img", {
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
    .from(".hero-section__title .line", {
        yPercent: 100,
        opacity: 0,
        duration: 0.4,
        ease: "power1.out",
        stagger: {
            amount: 0.3
        },
    })
    .from(".hero-section__call-button", {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        ease: "power1.out",
    })


let productTitleSplit = new SplitType(".product-section__title",{
    types: "lines",
    tagName: "div"
});

let productDescSplit = new SplitType(".product-section__desc",{
    types: "lines",
    tagName: "div"
});

let productTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".product-section__main-info",
        start: "top 80%"
    }
})

productTimeline
    .from(".product-section__title .line", {
        yPercent: 100,
        opacity: 0,
        duration: 0.4,
        ease: "power1.out",
        stagger: {
            amount: 0.3
        },
    })
    .from(".product-section__desc .line", {
        yPercent: 100,
        opacity: 0,
        duration: 0.4,
        stagger: {
            amount: 0.3
        },
    })
    .from(".product-section__doc", {
        yPercent: 50,
        opacity: 0,
        duration: 0.4,
    })

let productPraramsTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".product-section__params",
        start: "top 80%"
    }
})

productPraramsTimeline
    .from(".product-section__certificate", {
        yPercent: 100,
        opacity: 0,
        duration: 0.4,
    })

    .from(".product-section__params table", {
        yPercent: 50,
        opacity: 0,
        duration: 0.4,
    })
    .from(".product-section__all-params", {
        yPercent: 100,
        opacity: 0,
        duration: 0.4,
    })

gsap.from(".section__info", {
    scrollTrigger: {
        trigger: ".section__info",
        start: "top 80%"
    },
    yPercent: 50,
    opacity: 0,
    duration: 0.4,
})

let mm = gsap.matchMedia()
let projectEls = gsap.utils.toArray(".project")

mm.add({
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
})