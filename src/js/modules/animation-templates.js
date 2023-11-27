const linesAnimation = {
    yPercent: 110,
    opacity: 0,
    duration: 0.4,
    ease: "power1.out",
    stagger: {
        amount: 0.3
    }
}

const textAnimation = {
    yPercent: 50,
    opacity: 0,
    duration: 0.4,
    ease: "power1.out",
}

const imgScaleAnimation = {
    scale: 1.3,
    duration: 2.25,
    ease: "cubic-bezier(0.38, 0.005, 0.215, 1)"
}

const imgOpacityAnimation = {
    opacity: 0,
    duration: 0.9,
    ease: "cubic-bezier(0.38, 0.005, 0.215, 1)"
}

const parallaxAnimation = {
    y: (i, el) => parseFloat(el.getAttribute("data-speed")) * ScrollTrigger.maxScroll(window) ,
    ease: "none",
    scrollTrigger: {
        start: 0,
        end: "max",
        invalidateOnRefresh: true,
        scrub: 0
    }
}

const func = startCallback => {

}

export {
    textAnimation,
    linesAnimation,
    imgScaleAnimation,
    imgOpacityAnimation,
    parallaxAnimation,
}