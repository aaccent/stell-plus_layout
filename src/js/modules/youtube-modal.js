function loadVideo() {
  
    (function loadYoutubeIFrameApiScript() {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
  
      const firstScriptTag = document.querySelector("script[src='js/script.min.js']")
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
      tag.onload = () => ytScriptLoaded = true;
    })();
  
    let player = null;
  
    function setupPlayer(videoId) {
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
                videoId,
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

        var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen || iframe.msRequestFullscreen;
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

function openYouTubeVideo(videoEl) {
    if (lock) {
        return 
    }

    const videoContainer = document.getElementById("youtube-container")
    const videoId = videoEl.dataset.youtubeId

    lock = true
    document.body.classList.add("body_lock")
    
    videoContainer.classList.add("_open")
    videoContainer.addEventListener("transitionend", () => {
        lock = false
    const videoId = videoEl.dataset.youtubeId
        setupPlayer(videoId)
    }, { once: true })
}

function closeYouTubeVideo(videoEl) {
    if (lock) {
        return 
    }
    videoEl.querySelector("iframe").remove("src", "")
    videoEl.innerHTML = "<div id='player'></div>"
    videoEl.classList.remove("_open")
    document.body.classList.remove("body_lock")
}

function handleVideo(videoEl) {
    const videoPlayIconEl = videoEl.parentElement.querySelector(".video__play-icon")
    videoEl.addEventListener("loadedmetadata", e => {
        videoEl.parentElement.querySelector(".video__duration").innerHTML = secondsToTime(e.srcElement.duration)
    })
    
    videoEl.addEventListener("timeupdate", e => {
        videoEl.parentElement.querySelector(".video__current-time").innerHTML = secondsToTime(e.srcElement.currentTime)
    })
    
    videoEl.addEventListener("click", () => {
        videoEl.pause()
        videoPlayIconEl.classList.add("video__play-icon_show")
        openYouTubeVideo(video)
    })
    
    document.querySelector(".youtube-close").addEventListener("click", (e) => {
        closeYouTubeVideo(document.getElementById("youtube-container"))
        videoPlayIconEl.classList.remove("video__play-icon_show")
        videoEl.play()
        e.currentTarget.style.cssText = ""
    })
    
    document.addEventListener("keydown", (e) => {
        const openVideoEl = document.querySelector("#youtube-container._open")
        if (e.which === 27 && openVideoEl) {
            closeYouTubeVideo(openVideoEl)
        }
    })
}


let lock = false;
let player;
let ytScriptLoaded = false;
let setupPlayer;

if (document.readyState !== "loading") {
    console.info(`document.readyState ==>`, document.readyState);
    setupPlayer = loadVideo();
} else {
    document.addEventListener("DOMContentLoaded", function() {
        console.info(`DOMContentLoaded ==>`, document.readyState);
        setupPlayer = loadVideo();
    });
}

document.getElementById("youtube-container").addEventListener("click", (e) => {
    if (e.target === e.currentTarget);

    closeYouTubeVideo(e.currentTarget)
})
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
