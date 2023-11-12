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
    let iframe = videoContainer.querySelector("iframe")
    const src = videoEl.dataset.src

    lock = true
    document.body.classList.add("body_lock")

    videoContainer.classList.add("_open")
    videoContainer.addEventListener("transitionend", () => {
        lock = false
        iframe.setAttribute("src", src + "?&autoplay=1&mute=1")
    }, { once: true })
}

function closeYouTubeVideo(videoEl) {
    if (lock) {
        return 
    }
    videoEl.querySelector("iframe").setAttribute("src", "")
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
    
    document.getElementById("youtube-container").addEventListener("click", (e) => {
        if (!e.target.closest(".youtube-wrapper")) {
            closeYouTubeVideo(document.getElementById("youtube-container"))
            videoEl.play()
            videoPlayIconEl.classList.remove("video__play-icon_show")
        }
    })
    
    document.addEventListener("keydown", (e) => {
        const openVideoEl = document.querySelector("#youtube-container._open")
        if (e.which === 27 && openVideoEl) {
            closeYouTubeVideo(openVideoEl)
        }
    })
}
// const videoEl = document.getElementById("video")
// const videoPlayIconEl = videoEl.parentElement.querySelector(".video__play-icon")

let lock = false

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
