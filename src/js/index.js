let lock = false

let player;
let ytScriptLoaded = false;
function loadVideo() {
  
    (function loadYoutubeIFrameApiScript() {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
  
      const firstScriptTag = document.querySelector("script[src='js/script.min.js']")
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
      tag.onload = () => ytScriptLoaded = true;
    })();
  
    let player = null;
  
    function setupPlayer() {
      /**
       * THIS FAILS!!!!!
       */
      // player = new YT.Player("player", {
      //   height: "390",
      //   width: "640",
      //   videoId: "M7lc1UVf-VE",
      //   events: {
      //     onReady: onPlayerReady,
      //     onStateChange: onPlayerStateChange
      //   }
      // });
  
      /**
       * Need to wait until Youtube Player is ready!
       *
       * YT.ready is not documented in https://developers.google.com/youtube/iframe_api_reference
       * but found from https://codesandbox.io/s/youtube-iframe-api-tpjwj
       */
        window.YT.ready(function() {
            player = new window.YT.Player("player", {
                height: "390",
                width: "640",
                videoId: "fDIyAXQ_PjI",
                events: {
                    onReady: onPlayerReady,
                    onStateChange: onPlayerStateChange
                }
            });
        });
    }
  
    function playFullscreen () {
        player.playVideo();//won't work on mobile
        let iframe = document.querySelector("iframe")

        
        iframe.addEventListener("keydown", (e) => {
            const openVideoEl = document.querySelector("#youtube-container._open")
            if (e.which === 27 && openVideoEl) {
                closeYouTubeVideo(openVideoEl)
            }
        })

        var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
        if (requestFullScreen) {
          requestFullScreen.bind(iframe)();
        }
    }

    function onPlayerReady(event) {
        console.log("ready")
        playFullscreen(); 
        event.target.playVideo()
    }
  
    function onPlayerStateChange(event) {
      var videoStatuses = Object.entries(window.YT.PlayerState);
      console.log(videoStatuses.find(status => status[1] === event.data)[0]);
    }
    return setupPlayer
  }

let setupPlayer

if (document.readyState !== "loading") {
    console.info(`document.readyState ==>`, document.readyState);
    setupPlayer = loadVideo();
} else {
    document.addEventListener("DOMContentLoaded", function() {
        console.info(`DOMContentLoaded ==>`, document.readyState);
        setupPlayer = loadVideo();
    });
}

function openYouTubeVideo(videoEl) {
    if (lock) {
        return 
    }

    const videoContainer = document.getElementById("youtube-container")
    const src = videoEl.getAttribute("href");

    lock = true
    document.body.classList.add("body_lock")
    
    videoContainer.classList.add("_open")
    videoContainer.addEventListener("transitionend", () => {
        lock = false
        setupPlayer()
    }, { once: true })
}

function closeYouTubeVideo(videoEl) {
    if (lock) {
        return 
    }
    videoEl.querySelector("iframe").remove()
    videoEl.innerHTML = "<div id='player'></div>"
    videoEl.classList.remove("_open")
    document.body.classList.remove("body_lock")
    scrollTriggerInstance && scrollTriggerInstance.refresh()
}

new Swiper(".hero-section__slider .swiper", {
    slidesPerView: 1,
    speed: 800,// (getComputedStyle(document.documentElement).getPropertyValue('--screen-diff') && 0),
    observer: true,
    parallax: true,
    preventInteractionOnTransition: true,
    pagination: {
        el: ".hero-section .swiper-pagination",
        type: "fraction",
        formatFractionCurrent: function(current) {
            return current < 9 ? "0" + current : current
        },
        formatFractionTotal: function(total) {
            return total < 9 ? "0" + total : total
        },
        renderFraction: function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span>' +
                    '<span class="swiper-pagination-divider"> — </span>' +
                    '<span class="' + totalClass + '"></span>';
        },
    },
    navigation: {
        nextEl: ".hero-section .swiper-button-next",
        prevEl: ".hero-section .swiper-button-prev",
    },
})


document.querySelectorAll(".hero-slide__video").forEach(videoEl => {
    videoEl.addEventListener("click", e => {
        e.preventDefault()
        if (!ytScriptLoaded) {
            return 
        }
        openYouTubeVideo(videoEl)
    })
})


// закрытие видео
document.addEventListener("keydown", (e) => {
    const openVideoEl = document.querySelector("#youtube-container._open")
    if (e.which === 27 && openVideoEl) {
        closeYouTubeVideo(openVideoEl)
    }
})

document.getElementById("youtube-container").addEventListener("click", e => {
    if (e.target === e.currentTarget) {
        closeYouTubeVideo(e.currentTarget)
    }
})

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
    allowTouchMove: false
})

let swiperWrapperEl = document.querySelector(".equipment-section__slider .swiper-wrapper")
let equipmentEls = document.querySelectorAll(".equipment-section__slider .swiper-slide")

function getScrollAmount() {
	let swiperWidth = document.querySelector(".equipment-section__slider .swiper").offsetWidth;
    let wrapperWidth = 0

    for (let i = 0; i < equipmentEls.length; i++) {
        wrapperWidth += equipmentEls[i].offsetWidth
    }
    
    wrapperWidth += 16 * (equipmentEls.length - 1)

	return swiperWidth - wrapperWidth
}

let tween = gsap.to(swiperWrapperEl, {
	x: getScrollAmount,
	duration: 3,
	ease: "none",
});

let scrollTriggerInstance;

scrollTriggerInstance = ScrollTrigger.create({
    trigger: ".equipment-section",
    start: "bottom bottom",
    end: () => `+=${getScrollAmount() * -1}`,
    ease: "none",
    pin: true,
    animation: tween,
    scrub: 1,
    invalidateOnRefresh: true,
    markers: false,
})

// let mm = gsap.matchMedia();
// let scrollTriggerInstance;

// mm.add("(min-width: 577px)", () => {
//     if (scrollTriggerInstance) scrollTriggerInstance.kill()
//     scrollTriggerInstance = ScrollTrigger.create({
//         trigger: ".equipment-section",
//         start: () => `end ${parseInt(getComputedStyle(document.documentElement).fontSize) * -5.625}px`,
//         end: () => `+=${getScrollAmount() * -1}`,
//         ease: "none",
//         pin: true,
//         animation: tween,
//         scrub: 1,
//         invalidateOnRefresh: true,
//         markers: false,
//     })
// })

// mm.add("(max-width: 576px)", () => {
//     if (scrollTriggerInstance) scrollTriggerInstance.kill()
//     scrollTriggerInstance = ScrollTrigger.create({
//         trigger: ".equipment-section",
//         start: "end -45px",
//         end: () => `+=${getScrollAmount() * -1}`,
//         ease: "none",
//         pin: true,
//         animation: tween,
//         scrub: 1,
//         invalidateOnRefresh: true,
//         markers: false,
//     })
// })

window.addEventListener("resize", () => scrollTriggerInstance.refresh())

import "./components/service.js"
import "./components/banner-slider.js"


