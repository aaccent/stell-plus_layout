import { isMobile } from "./detect-device.js"

function handleSwipe(swiper, pos = { x: 0.3, y: 0.2 } ) {
    let swiperHintEl = swiper.el.querySelector(".swiper-swipe");

    function handleTouchMove(e) {
        if (isMobile.any()) {
            return
        }

        // if (!swiperHintEl.classList.contains("swiper-swipe_show")) {
        //     swiperHintEl.classList.add("swiper-swipe_show")
        // }

        let coordX = e.clientX - swiperHintEl.offsetWidth * pos.x;
        let coordY = e.clientY - swiperHintEl.offsetHeight * pos.y;
    
        swiperHintEl.style.cssText = `
            position: fixed;
            top: ${coordY}px;
            left: ${coordX}px;
        `
        swiperHintEl.dataset.pageY = e.pageY
    }

    function handleScroll() {
        const { top, bottom } = swiper.wrapperEl.getBoundingClientRect()
        const yPosition = parseInt(getComputedStyle(swiperHintEl).top)

        if (bottom < yPosition) {
            swiperHintEl.classList.remove("swiper-swipe_show")
        }
    }

    swiper.wrapperEl.addEventListener("mouseenter", () => {
        if (isMobile.any()) {
            return
        }
        swiperHintEl.classList.add("swiper-swipe_show")
        // window.addEventListener("scroll", handleScroll)
    })
    
    swiper.wrapperEl.addEventListener("mousemove", handleTouchMove)
    
    swiper.wrapperEl.addEventListener("mouseleave", (e) => {
        if (isMobile.any()) {
            return
        }
        swiperHintEl.classList.remove("swiper-swipe_show")
        // window.removeEventListener("scroll", handleScroll)

    })

    swiper.on("touchStart", () => {
        if (isMobile.any()) {
            return
        }
        swiperHintEl.classList.add("swiper-swipe_grab")
    })

    swiper.on("touchMove", (swiper, event) => handleTouchMove(event))
    //     if (isMobile.any()) {
    //         return
    //     }

    //     let coordX = event.screenX - swipeHintEl.offsetWidth * 0.4;
    //     let coordY = event.clientY - swipeHintEl.offsetHeight * 0.4;

    //     // if (!swiperHintEl.classList.contains("swiper-swipe_show")) {
    //     //     swiperHintEl.classList.add("swiper-swipe_show")
    //     // }
    //     swiperHintEl.style.cssText = `
    //         position: fixed;
    //         top: ${coordY}px;
    //         left: ${coordX}px;
    //     `   
    // })

    swiper.on("touchEnd", () => {
        if (isMobile.any()) {
            return
        }
        swiperHintEl.classList.remove("swiper-swipe_grab")
    })
}

export { handleSwipe }


