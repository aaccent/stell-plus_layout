let titleSplit = new SplitType(".projects-section__title",{
    types: "chars",
    tagName: "span"
});

gsap.from(".projects-section__title .char", {
    yPercent: 115,
    opacity: 0,
    duration: 0.4,
    ease: "power1.out",
    onStart: () => document.querySelector(".projects-section").style.opacity = 1,
    stagger: {
        amount: 0.3
    },
})

let projectsMatchMedia = gsap.matchMedia()
let projectEls = gsap.utils.toArray(".project")

projectsMatchMedia.add({
    oneColumn: `(max-width: 920px)`,
    twoColumn: "(min-width: 921px)"
}, context => {
    let { oneColumn } = context.conditions
    projectEls.forEach((projectEl, i) => {
        let timeline = gsap.timeline({
            scrollTrigger: {
                trigger: projectEl,
                start: "top 80%"
            },
            delay: oneColumn ? 0 : i % 2 * 0.2
        })
        timeline
            .from(projectEl.querySelector(".project__img"), {
                scale: 1.3,
                duration: 2.25,
                ease: "cubic-bezier(0.38, 0.005, 0.215, 1)"
            })
            .from(projectEl.querySelector(".project__img"), {
                opacity: 0,
                duration: 0.9,
                ease: "cubic-bezier(0.38, 0.005, 0.215, 1)"
            }, "<")
            .from(projectEl.querySelector(".project__content"), {
                opacity: 0,
                duration: 0.5
            }, 0.5)
            .from(projectEl.querySelector(".project__logo"), {
                scale: 0.7,
                opacity: 0,
                duration: 0.5,
                ease: "back.out"
            }, "<")
    })
})

gsap.from(".projects-section__more", {
    scrollTrigger: {
        trigger: ".projects-section__projects",
        start: "bottom 80%"
    },
    scale: 0.65,
    opacity: 0.5,
    duration: 1,
    ease: "back.out(2)",
})