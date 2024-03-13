function handleVideo(videoEl) {
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
    
    const videoPlayIconEl = videoEl.parentElement.querySelector(".video__play-icon")
    
    videoEl.addEventListener("loadedmetadata", e => {
        videoEl.parentElement.querySelector(".video__duration").innerHTML = secondsToTime(e.srcElement.duration)
    })
    
    videoEl.addEventListener("timeupdate", e => {
        videoEl.parentElement.querySelector(".video__current-time").innerHTML = secondsToTime(e.srcElement.currentTime)
    })
    
    videoEl.addEventListener("play", () => {
        videoPlayIconEl.classList.remove("video__play-icon_show")
    })
    
    videoEl.addEventListener("pause", (e) => {
        videoPlayIconEl.classList.add("video__play-icon_show")
    })
    
    videoPlayIconEl.addEventListener("click", () => {
        videoPlayIconEl.classList.remove("video__play-icon_show")
        videoEl.play()
    })
    videoEl.addEventListener("click", (e) => {
        if (e.target.requestFullscreen) {
            e.target.requestFullscreen();
        } else if (e.target.webkitRequestFullscreen) {
            e.target.webkitRequestFullscreen();
        } else if (e.target.mozRequestFullScreen) {
            e.target.mozRequestFullScreen();
        } else if (e.target.msRequestFullscreen) {
            e.target.msRequestFullscreen();
        } else if (videoEl.webkitEnterFullscreen) {
            videoEl.webkitEnterFullscreen()
        }
        // e.target.controls = true
    })
}

export { handleVideo }