function loadVideo(videoId) {
  
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
            player = new window.YT.Player("yt-player", {
                height: "390",
                width: "640",
                videoId,
                allowfullscreen: true,
                playerVars: { "controls": 1, "allowfullscreen": "allowfullscreen", "rel": 0, "color": "white" },
                events: {
                    onReady: onPlayerReady,
                    // onStateChange: onPlayerStateChange,
                    onPlaybackQualityChange: () => {},
                    onError: (e) => {}
                }
            });
        });
    }
  
    function onPlayerReady(event) {
        playFullscreen(); 
    }

    function playFullscreen () {
        let iframe = document.querySelector("iframe")

        // iframe.addEventListener("keydown", (e) => {
        //     const openVideoEl = document.querySelector("#youtube-container._open")
        //     if (e.which === 27 && openVideoEl) {
        //         closeYouTubeVideo(openVideoEl)
        //     }
        // })
        
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen();
        } else if (iframe.mozRequestFullScreen) {
            iframe.mozRequestFullScreen();
        } else if (iframe.msRequestFullscreen) {
            iframe.msRequestFullscreen();
        }
        
        player.playVideo();//won't work on mobile
    }
  
    // function onPlayerStateChange(event) {
    //   let videoStatuses = Object.entries(window.YT.PlayerState);
    //   console.log(videoStatuses.find(status => status[1] === event.data)[0]);
    // }

    return setupPlayer
}

function secondsToTime(time) {
    let h = Math.floor(time / (60 * 60)),
        dm = time % (60 * 60),
        m = Math.floor(dm / 60),
        ds = dm % 60,
        s = Math.ceil(ds);

    let fulltime;

    if (s === 60) {
        s = 0;
        m = m + 1;
    }
    if (s < 10) {
        s = '0' + s;
    }
    if (m === 60) {
        m = 0;
        h = h + 1;
    }
    if (m < 10) {
        m = '0' + m;
    }
    if (h === 0) {
        fulltime = m + ':' + s;
    } else {
        fulltime = h + ':' + m + ':' + s;
    }
    return fulltime;
}

function openYouTubeVideo(ytVideoEl) {
    if (lock) {
        return 
    }

    const videoId = ytVideoEl.dataset.youtubeId

    lock = true
    document.body.classList.add("body_lock")
    
    ytVideoEl.classList.add("_open")
    ytVideoEl.addEventListener("transitionend", () => {
        lock = false
        setupPlayer(videoId)
    }, { once: true })
}

function closeYouTubeVideo(ytVideoEl) {
    if (lock) {
        return 
    }
    ytVideoEl.querySelector("iframe").remove()
    ytVideoEl.innerHTML = "<div id='yt-player'></div>"
    ytVideoEl.classList.remove("_open")
    document.body.classList.remove("body_lock")
}

function handleVideo(videoEl) {
    const videoId = videoEl.dataset.youtubeId
    const videoPlayIconEl = videoEl.parentElement.querySelector(".video__play-icon")
    const ytVideoEl = document.getElementById("youtube-container")

    if (document.readyState !== "loading") {
        // console.info(`document.readyState ==>`, document.readyState);
        setupPlayer = loadVideo(videoId);
    } else {
        document.addEventListener("DOMContentLoaded", function() {
            // console.info(`DOMContentLoaded ==>`, document.readyState);
            setupPlayer = loadVideo(videoId);
        });
    }
    
    videoEl.addEventListener("loadedmetadata", e => {
        videoEl.parentElement.querySelector(".video__duration").innerHTML = secondsToTime(e.srcElement.duration)
    })
    
    videoEl.addEventListener("timeupdate", e => {
        videoEl.parentElement.querySelector(".video__current-time").innerHTML = secondsToTime(e.srcElement.currentTime)
    })
    
    videoEl.addEventListener("click", () => {
        if (!ytScriptLoaded)
            return
        
        videoEl.pause()
        videoPlayIconEl.classList.add("video__play-icon_show")
        openYouTubeVideo(ytVideoEl)
    })
    
    // document.querySelector(".youtube-close").addEventListener("click", (e) => {
    //     closeYouTubeVideo(document.getElementById("youtube-container"))
    //     videoPlayIconEl.classList.remove("video__play-icon_show")
    //     videoEl.play()
    //     e.currentTarget.style.cssText = ""
    // })
    
    document.addEventListener("keydown", (e) => {
        if (e.which === 27 && ytVideoEl.classList.contains("_open")) {
            videoPlayIconEl.classList.remove("video__play-icon_show")
            videoEl.play()
            closeYouTubeVideo(ytVideoEl)
        }
    })

    document.addEventListener("fullscreenchange", (e) => {
        if (!document.fullscreenElement) {
            videoPlayIconEl.classList.remove("video__play-icon_show")
            videoEl.play()
            closeYouTubeVideo(ytVideoEl);
        }
    })
}

// document.addEventListener("fullscreenchange", e => {
//     if (document.fullscreenElement) {
//         console.log(`Element entered fullscreen mode.`);
//       } else {
//         console.log("Leaving fullscreen mode.");
//       }
// })

let lock = false;
let ytScriptLoaded = false;
let setupPlayer;

// document.getElementById("youtube-container").addEventListener("click", (e) => {
//     if (e.target === e.currentTarget) {
//         closeYouTubeVideo(e.currentTarget)
//     }
// })


// videoEl.addEventListener("loadedmetadata", e => {
//     videoEl.parentElement.querySelector(".video__duration").innerHTML = secondsToTime(e.srcElement.duration)
// })

// videoEl.addEventListener("timeupdate", e => {
//     videoEl.parentElement.querySelector(".video__current-time").innerHTML = secondsToTime(e.srcElement.currentTime)
// })

// videoEl.addEventListener("click", () => {
//     videoEl.pause()
//     videoPlayIconEl.classList.add("video__play-icon_show")
//     openYouTubeVideo(video)
// })

// document.getElementById("youtube-container").addEventListener("click", (e) => {
//     if (!e.target.closest(".youtube-wrapper")) {
//         closeYouTubeVideo(document.getElementById("youtube-container"))
//         videoEl.play()
//         videoPlayIconEl.classList.remove("video__play-icon_show")
//     }
// })

export { handleVideo }
