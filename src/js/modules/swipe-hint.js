import { isMobile } from "./detect-device.js"

function handleSwipe(swiper) {
    let swiperHintEl = swiper.el.querySelector(".swiper-swipe");

    function handleTouchMove(e) {
        if (isMobile.any()) {
            return
        }
        let coordX = e.clientX - swiperHintEl.offsetWidth * 0.4;
        let coordY = e.clientY - swiperHintEl.offsetHeight * 0.4;
    
        swiperHintEl.style.cssText = `
            position: fixed;
            top: ${coordY}px;
            left: ${coordX}px;
        `
    }
    
    swiper.wrapperEl.addEventListener("mouseenter", () => {
        if (isMobile.any()) {
            return
        }
        swiperHintEl.classList.add("swiper-swipe_show")
    })
    
    swiper.wrapperEl.addEventListener("mousemove", handleTouchMove)
    
    swiper.wrapperEl.addEventListener("mouseleave", () => {
        if (isMobile.any()) {
            return
        }
        swiperHintEl.classList.remove("swiper-swipe_show")
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


