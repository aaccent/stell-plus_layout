let equipmentSection = document.querySelector(".equipment-section");
let swiperWrapperEl = document.querySelector(".equipment-section__slider .swiper-wrapper")
let equipmentEls = document.querySelectorAll(".equipment-section__slider .swiper-slide")

gsap.registerPlugin(ScrollTrigger)

function getScrollAmount() {
	let swiperWidth = document.querySelector(".equipment-section__slider .swiper").offsetWidth;
    let wrapperWidth = 0

    for (let i = 0; i < equipmentEls.length; i++) {
        wrapperWidth += equipmentEls[i].offsetWidth
    }
    
    wrapperWidth += 16 * (equipmentEls.length - 1)

	return swiperWidth - wrapperWidth
}

if (equipmentSection) {
    let tween = gsap.to(swiperWrapperEl, {
        x: getScrollAmount,
        duration: 3,
        ease: "none",
    });
        
    ScrollTrigger.create({
        trigger: ".equipment-section",
        start: () => {
            let remValue = getComputedStyle(document.documentElement).fontSize;
            return document.querySelector(".equipment-section").offsetHeight < window.innerHeight ? `top+=${parseFloat(remValue)}  top` : "bottom bottom"
        },
        ease: "none",
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
    })
    window.addEventListener("resize", () => ScrollTrigger.refresh())
}

let typeSplit = new SplitType(".section__title",{
    types: "words, chars",
    tagName: "span"
});
  

let sectionTitleEls = gsap.utils.toArray(".section__title")
sectionTitleEls.forEach(sectionTitleEl => {
    let chars = sectionTitleEl.querySelectorAll(".char")
  
    gsap.from(chars, {
        scrollTrigger: {
            trigger: sectionTitleEl,
            start: "top 80%"
        },
        yPercent: 100,
        duration: 0.5,
        ease: "power1.out",
        stagger: {
            amount: 0.4
        }
    })
})


let sectionInfoEls = gsap.utils.toArray(".section__info")
sectionInfoEls.forEach(sectionInfoEl => {
    let children = sectionInfoEl.children;
    gsap.from(children, {
        scrollTrigger: {
            trigger: sectionInfoEl,
            start: "top 80%"
        },
        yPercent: 30,
        opacity: 0,
        stagger: {
            amount: 0.4
        }
    })
})


let footerTitleSplit = new SplitType(".footer__contact-us-title",{
    types: "words, chars",
    tagName: "span"
});
  
let footerDescSplit = new SplitType(".footer__contact-us-desc",{
    types: "lines",
    tagName: "div"
});

ScrollTrigger.create({
    trigger: document.querySelector(".footer").previousElementSibling,
    start:  document.querySelector(".footer").previousElementSibling.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
    pin: true,
    pinSpacing: false
})

let footerTween = gsap.to(".footer__commercial", {
    marginBottom: () => -document.querySelector(".footer__commercial").offsetHeight,
});

ScrollTrigger.create({
    trigger: ".footer__commercial",
    start: "top center",
    end: "top 10%",
    animation: footerTween,
    scrub: 1,
})
  
let footerTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".footer__contact-us",
        start: "top 80%"
    }
})

footerTimeline 
    .from(".footer__contact-us-title .char", {
        yPercent: 100,
        duration: 0.5,
        ease: "power1.out",
        stagger: {
            amount: 0.4
        }
    })
    .from(".footer__contact-us-desc .line", {
        yPercent: 100,
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
        stagger: {
            amount: 0.4
        }
    })
    .from(".contact-us-form", {
        yPercent: 10,
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
        stagger: {
            amount: 0.4
        }
    }, "<+0.3")