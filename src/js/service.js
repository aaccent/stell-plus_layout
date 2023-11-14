import "./components/service.js"
import { handleVideo } from "./modules/youtube-modal.js"
import LocomotiveScroll from "locomotive-scroll"

const videoEl = document.getElementById("video")
handleVideo(videoEl)

const scroll = new LocomotiveScroll();

const projects = document.querySelector(".projects-section__projects")
const projectsButton = document.querySelector(".hero-section__projects")

projectsButton.addEventListener("click", (e) => {
    e.preventDefault()
    scroll.scrollTo(projects, {
            offset: -100,
            duration: 1500,
        }
    )
})
