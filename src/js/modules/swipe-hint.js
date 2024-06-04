import { isMobile } from "./detect-device.js"

function handleSwipe(swiper, pos = { x: 0.3, y: 0.2 } ) {
    let swiperHintEl = swiper.el.querySelector(".swiper-swipe");
    document.body.append(swiperHintEl)

    function handleTouchMove(e) {
        if (isMobile.any()) return

        if (!swiperHintEl.classList.contains("swiper-swipe_show")) {
            swiperHintEl.classList.add("swiper-swipe_show")
        }

        let coordX = e.clientX;
        let coordY = e.clientY;
    
        swiperHintEl.style.cssText = `
            position: fixed;
            top: ${coordY}px;
            left: ${coordX}px;
        `
        swiperHintEl.dataset.pageY = e.pageY
    }

    function handleScroll() {
        let { top, bottom } = swiper.wrapperEl.getBoundingClientRect()
        let yPosition = parseInt(getComputedStyle(swiperHintEl).top)
         
        if (swiper.wrapperEl.closest(".banner-slider_outer")) {
            bottom -= document.querySelector(".banner-slider_inner").offsetHeight
        }
        if (bottom < yPosition || top > yPosition) {
            swiperHintEl.classList.remove("swiper-swipe_show")
        }
    }

    swiper.wrapperEl.addEventListener("mouseenter", () => {
        if (isMobile.any()) return

        swiperHintEl.classList.add("swiper-swipe_show")
        window.addEventListener("scroll", handleScroll)
    })
    
    swiper.wrapperEl.addEventListener("mousemove", handleTouchMove)
    swiper.on("touchMove", (swiper, e) => handleTouchMove(e))

    swiper.wrapperEl.addEventListener("mouseleave", (e) => {
        if (isMobile.any()) return

        swiperHintEl.classList.remove("swiper-swipe_show")
        window.removeEventListener("scroll", handleScroll)
    })

    swiper.on("touchStart", () => {
        if (isMobile.any()) return

        swiperHintEl.classList.add("swiper-swipe_grab")
    })

    swiper.on("touchEnd", () => {
        if (isMobile.any()) return

        swiperHintEl.classList.remove("swiper-swipe_grab")
    })
}

export { handleSwipe }


