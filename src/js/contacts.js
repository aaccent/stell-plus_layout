import { imgOpacityAnimation, imgScaleAnimation } from "./modules/animation-templates.js";

function init() {
    const getCoords = async () => {
        // let response = await fetch("../json/coords.json", {
        //     method: "GET"
        // });

        setTimeout(() => {
            mapPins = JSON.parse(`
                [
                    {
                        "id": "1",
                        "title": "Центральный офис",
                        "image": "./images/contacts/balloon-image.png",
                        "address": "Москва, ул. Палехская, д. 131, пом. 1, ком. 10",
                        "time": "Пн-Пт: c 09:00 до 18:00",
                        "email": "info@stellplus.com",
                        "phone": "+74959970687",
                        "phone-mask": "+7 (495) 997-06-87",
                        "coord": [55.75, 37.50]
                    },
                    {
                        "id": "2",
                        "title": "Восточный офис",
                        "image": "./images/contacts/balloon-image.png",
                        "address": "Москва, ул. Палехская, д. 131, пом. 1, ком. 10",
                        "time": "Пн-Пт: c 09:00 до 18:00",
                        "email": "info@stellplus.com",
                        "phone": "+74959970687",
                        "phone-mask": "+7 (495) 997-06-87",
                        "coord": [55.75, 37.71]
                    },
                    {
                        "id": "3",
                        "title": "Южный офис",
                        "image": "./images/contacts/balloon-image.png",
                        "address": "Москва, ул. Палехская, д. 131, пом. 1, ком. 10",
                        "time": "Пн-Пт: c 09:00 до 18:00",
                        "email": "info@stellplus.com",
                        "phone": "+74959970687",
                        "phone-mask": "+7 (495) 997-06-87",
                        "coord": [55.70, 37.70]
                    }
                ]            
            `)
            setMapPins(mapPins)
        }, 2000)

        // if (response.ok) {
        //     let mapPins = await response.json()
        //     setMapPins(mapPins)
        // } else {
        //     console.log("Error!!!")
        // }
    }

    function setMapPins(pins) {
        let myCollection = new ymaps.GeoObjectCollection();
        
        // создание и установка пинов
        for (var i = 0; i < pins.length; i++) {
            myCollection.add(new ymaps.Placemark(pins[i].coord, {
                pinData: pins[i]
            }, {
                iconLayout: "default#image",
                iconImageHref: i === 0 ? imagesSrc.pinActiveImage : imagesSrc.pinImage,
                iconImageSize: [60, 60],
            }));
        }
        // добавление пинов на карту
        map.geoObjects.add(myCollection);

        // обработки кликов по пинам на карте
        let activePinId;
        myCollection.events.add("click", e => {
            let pinData = e.get("target").properties.get("pinData");
            if (activePinId === pinData.id) {
                return
            }
            let query = ymaps.geoQuery(map.geoObjects);

            for (let i = 0; i < query.getLength(); i++) {
                let el = query.get(i);
                el.options.set('iconImageHref', imagesSrc.pinImage)                
            }

            // установка пина по центру карты
            // map.panTo(pinData.coord, { duration: 300 })
            
            e.get('target').options.set('iconImageHref', imagesSrc.pinActiveImage)  

            const balloonEl = document.querySelector(".balloon")
            if (balloonEl.classList.contains("balloon_open")) {
                let balloonContentEl = balloonEl.querySelector(".balloon__content")
                balloonContentEl.style.opacity = "0"
                balloonContentEl.addEventListener("transitionend", (e) => {
                    loadBalloon(pinData)
                    e.target.style.opacity = ""
                })
            } else {
                balloonEl.classList.add("balloon_open")            
            }
            activePinId = pinData.id
        })
        // первоначальная инициализация карты
        loadBalloon(mapPins[0])
        document.querySelector(".balloon").classList.add("balloon_open")
        map.panTo(mapPins[0].coord, { duration: 150 })
    }

    function loadBalloon(data) {
        let balloonHeaderTemplate = `<h4 class="balloon__title">${data.title}</h4>`
        let balloonImageTemplate = `
            <div class="balloon__img">
                <img src="${data.image}" alt="">
            </div>`
        let balloonInfoTemplate = `
            <div class="balloon__info"> 
                <div class="balloon__address">
                    <span class="icon-map-pin"></span>
                    <span>${data.address}</span>
                </div>
                <div class="balloon__time">
                    <span class="icon-clock"></span>
                    <span>${data.time}</span>
                </div>
                <div class="balloon__phone">
                    <span class="icon-phone"> </span>
                    <a href="tel:${data.phone}">${data["phone-mask"]} </a>
                </div>
                <div class="balloon__email">
                    <span class="icon-email"></span>
                    <a href="mailto:${data.email}">${data.email}</a>
                </div>
            </div>
        `
        let balloonLinkTemplate = `
            <a 
                class="balloon__link link" 
                href="https://yandex.com/maps/?mode=routes&rtext=~${data.coord[0]}%2C${data.coord[1]}&rtt=auto"
                target="_blank"
            >Проложить маршрут</a>`
        let balloonContentTemplate = `
            <div class="balloon__content">
                ${balloonHeaderTemplate}
                ${balloonImageTemplate}
                ${balloonInfoTemplate}
                ${balloonLinkTemplate}
            </div>
        `
        document.getElementById("balloon").innerHTML = balloonContentTemplate
    }

    let mapPins;
    // создание карты
    let map = new ymaps.Map("map", {
        center: [55.75,37.60],
        controls: [],
        zoom: 12,
    })

    let imagesSrc = document.getElementById("map").dataset

    // Создадим пользовательский макет ползунка масштаба.
    let ZoomLayout = ymaps.templateLayoutFactory.createClass(`
        <div id="zoom-controls">
            <button id='zoom-out' type='button'><img src='${imagesSrc.zoomOutImage}'></button>
            <button id='zoom-in' type='button'><img src='${imagesSrc.zoomInImage}'></button>
        </div>`, {

        // Переопределяем методы макета, чтобы выполнять дополнительные действия
        // при построении и очистке макета.
        build: function () {
            // Вызываем родительский метод build.
            ZoomLayout.superclass.build.call(this);

            // Привязываем функции-обработчики к контексту и сохраняем ссылки
            // на них, чтобы потом отписаться от событий.
            this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
            this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

            // Начинаем слушать клики на кнопках макета.
            document.getElementById("zoom-in").addEventListener('click', this.zoomInCallback);
            document.getElementById("zoom-out").addEventListener('click', this.zoomOutCallback);
        },

        clear: function () {
            // Снимаем обработчики кликов.
            document.getElementById('zoom-in').removeEventListener('click', this.zoomInCallback);
            document.getElementById('zoom-out').removeEventListener('click', this.zoomOutCallback);

            // Вызываем родительский метод clear.
            ZoomLayout.superclass.clear.call(this);
        },

        zoomIn: function () {
            let map = this.getData().control.getMap();
            map.setZoom(map.getZoom() + 1, {checkZoomRange: true, duration: 300});
            // if (map.getZoom() >= 12) {
            //     document.getElementById("zoom-out").disabled = false
            // }
        },

        zoomOut: function () {
            let map = this.getData().control.getMap();
            map.setZoom(map.getZoom() - 1, {checkZoomRange: true, duration: 300});
            // if (map.getZoom() <= 13) {
            //     document.getElementById("zoom-out").disabled = true
            // }
        }
    });

    let zoomControl = new ymaps.control.ZoomControl({
        options: {
            layout: ZoomLayout,
            position: {
                right: "2%",
                bottom: 32
            } 
        }
    });

    map.controls.add(zoomControl);
    getCoords()
    
    map.events.add("click", () =>  {
        let query = ymaps.geoQuery(map.geoObjects);

        for (let i = 0; i < query.getLength(); i++) {
            let el = query.get(i);
            el.options.set('iconImageHref', imagesSrc.pinImage)                
        }
        document.getElementById("balloon").classList.remove("balloon_open")
    })
    
    
    // zoom ctrl + mouse wheel
    let ctrlKey = false
    let body = document.getElementsByTagName('body')[0];
    map.behaviors.disable(['scrollZoom']);
    body.onkeydown = callbackDown;
    body.onkeyup = callbackUp;
    function callbackDown(e){
        if(e.keyCode === 17 && !ctrlKey){
            ctrlKey = true
            map.behaviors.enable(['scrollZoom']);
        }
    }
    function callbackUp(e){
        if(e.keyCode === 17){
            ctrlKey = false
            map.behaviors.disable(['scrollZoom']);
        }
    }
}

ymaps.ready(init);

document.querySelectorAll(".departments-section__tab-button").forEach(tabButtonEl => {
    tabButtonEl.addEventListener("click", e => {
        let targetEl = e.target;
        let departmentName = targetEl.dataset.department;
        let departmentsContainer = document.querySelector(".departments-section__departments");
        
        document.querySelector(".departments-section__tab-button_active").classList.remove("departments-section__tab-button_active")
        targetEl.classList.add("departments-section__tab-button_active")
        
        departmentsContainer.style.opacity = "0"
        departmentsContainer.addEventListener("transitionend", () => {
            let activeDepartmentClass = "departments-section__department_active"
            departmentsContainer.querySelector("." + activeDepartmentClass).classList.remove(activeDepartmentClass)
            departmentsContainer.querySelector(".departments-section__department_" + departmentName).classList.add(activeDepartmentClass);
            departmentSlider.destroy()
            initDepartmentSlider()
            //
            initDepartmentsAnimation(departmentSlider)
            ScrollTrigger.refresh()
            //
            departmentsContainer.style.opacity = "";
         }, { once: true })

    })
})

function initDepartmentSlider() {
    // let loop = document.querySelectorAll(".departments-section__department_active .swiper-slide").length > 4

    departmentSlider = new Swiper(".departments-section__department_active .swiper", {
        slidesPerView: 1.2,
        spaceBetween: 16,
        speed: 800,
        // loop,
        // observer: true,
        // observeParents: true,
        // watchOverflow: true,
        breakpoints: {
            576: {
                slidesPerView: 1.5
            },
            768: {
                slidesPerView: 2
            },
            961: {
                slidesPerView: 3
            },
            1341: {
                slidesPerView: 4
            }
        },
        navigation: {
            nextEl: ".departments-section .swiper-button-next",
            prevEl: ".departments-section .swiper-button-prev",
        },
        // on: {
        //     init: swiper => {
        //         swiper.lastXOffset = swiper.slidesGrid[swiper.activeIndex];
        //     },
        //     slideChange: (swiper) =>{
        //         let xOffset = swiper.slidesGrid[swiper.activeIndex]
        //         window.scrollBy(0, xOffset - swiper.lastXOffset)                    
        //         swiper.lastXOffset = xOffset
        //     }
        // }
    })
}

// animations
function killTween() {
    currentIndex = 0;
    animating = false;
    departmentTween?.kill();
}

function initDepartmentsAnimation(swiper) {
    killTween()
    if (swiper.isLocked) {
        intentObserver.disable();
        preventScroll.disable();
        return
    }

    numPanels = departmentSlider.slides.length - Math.floor(departmentSlider.params.slidesPerView - 1);
    swiper.on('afterInit', function () {
        currentIndex = swiper.activeIndex
    })

    swiper.on('slideChange', function () {
        currentIndex = swiper.activeIndex
    });
    
    swiper.on("slideChangeTransitionEnd", function () {
        animating = false
    })
        
    // pin swipe section and initiate observer
   departmentTween = ScrollTrigger.create({
        trigger: ".departments-section",
        pin: true,
        anticipatePin: true,
        start: () => {
            let remValue = getComputedStyle(document.documentElement).fontSize;
            return document.querySelector(".departments-section").offsetHeight < window.innerHeight ? `top+=${parseFloat(remValue)}  top` : `bottom-=${parseFloat(remValue) * 2} bottom`
        },
        end: () => {
            let swiperWidth = document.querySelector(".departments-section__department_active").offsetWidth;
            let employeeEls = document.querySelectorAll(".departments-section__department_active .employee")
            let wrapperWidth = 0
        
            for (let i = 0; i < employeeEls.length; i++) {
                wrapperWidth += employeeEls[i].offsetWidth
            }
            
            wrapperWidth += 16 * (employeeEls.length - 1)
        
            if (swiperWidth >= wrapperWidth)
                return 0
            
            return `+=${(swiperWidth - wrapperWidth) * 1.2}px`
        },
        onEnter: (self) => {
            if (preventScroll.isEnabled === false) {
                self.scroll(self.start);
                preventScroll.enable();
                intentObserver.enable();
                
                gotoPanel(currentIndex + 1, true);
            }
        },
        onEnterBack: (self) => {
            if (preventScroll.isEnabled === false) {
                self.scroll(self.start);
                preventScroll.enable();
                intentObserver.enable();
                    
                gotoPanel(currentIndex - 1, false);
            }
        },
    });
}

let departmentSlider 
initDepartmentSlider()

let currentIndex = 0;
let animating = false;
let numPanels //= departmentSlider.slides.length - Math.floor(departmentSlider.params.slidesPerView - 1)
/*

ALL OF THE FOLLOWING CODE IS BORROWED FROM THIS PEN FROM GREENSOCK
https://codepen.io/GreenSock/pen/MWGVJYL?editors=1000

I MADE SLIGHT ALTERATIONS TO MAKE GOTOPANEL() TALK TO SWIPER

*/

// create an observer and disable it to start
let intentObserver = ScrollTrigger.observe({
    type: "wheel,touch",
    onUp: () => !animating && gotoPanel(currentIndex + 1, true),
    onDown: () => !animating && gotoPanel(currentIndex - 1, false),
    wheelSpeed: -1, // to match mobile behavior, invert the wheel speed
    tolerance: 30,
    preventDefault: true,
    onPress: self => {
        // on touch devices like iOS, if we want to prevent scrolling, we must call preventDefault() on the touchstart (Observer doesn't do that because that would also prevent side-scrolling which is undesirable in most cases)
        ScrollTrigger.isTouch && self.event.preventDefault()
    }
})
intentObserver.disable();

let preventScroll = ScrollTrigger.observe({
        preventDefault: true,
        type: "wheel,scroll",
        allowClicks: true,
        onEnable: self => {
            // console.log("enable")	
            return self.savedScroll = self.scrollY()
        }, // save the scroll position
        onChangeY: self => {
            // console.log("disable")
            self.scrollY(self.savedScroll)    // refuse to scroll
        }
});
preventScroll.disable();

// handle the panel swipe animations
function gotoPanel(index, isScrollingDown) {
    animating = true;
    // console.log("gotoPanel", currentIndex, index)
    // return to normal scroll if we're at the end or back up to the start
    if (
        (index === numPanels && isScrollingDown) ||
        (index === -1 && !isScrollingDown)
    ) {
        console.log("return to normal scroll")
        intentObserver.disable();
        preventScroll.disable();
        
        animating = false;
        // now make it go 1px beyond in the correct direction so that it doesn't trigger onEnter/onEnterBack.
        preventScroll.scrollY(preventScroll.scrollY() + (index === numPanels ? 1 : -1));
        return;
    }
    // console.log("call swiper slideTo()")
    departmentSlider.slideTo(index)
        
    currentIndex = index;
}

ScrollTrigger.config({ 
    ignoreMobileResize: true
});

let departmentTween

initDepartmentsAnimation(departmentSlider)

gsap.to(".departments-section .section__header, .departments-section .section__body", {
    y: 0.15 * ScrollTrigger.maxScroll(window) ,
    ease: "none",
    scrollTrigger: {
        trigger: ".footer",
        start: "top 90%",
        end: "max",
        invalidateOnRefresh: true,
        scrub: 0
    }
});

gsap.to(".footer__commercial", {
    scrollTrigger: {
        trigger: ".footer__commercial",
        start: "top center",
        end: "top 10%",
        // animation: footerTween,
        scrub: 1,
    },
    marginBottom: () => -document.querySelector(".footer__commercial").offsetHeight,
});

// ScrollTrigger.create({
// })
// function initDepartmentsAnimation() {
//     departmentsAnimation?.kill()
    
//     let deltaX = getScrollAmount()
    
//     if (deltaX === 0) {
//         let scrollYOffset = mapSection.offsetTop + mapSection.offsetHeight + departmentsSection.offsetHeight - window.innerHeight;
//         if (window.pageYOffset >= scrollYOffset) {
//             window.scrollTo(0, scrollYOffset)
//         }
//         return
//     }
//     footerCommercialAnimation?.kill()

//     let tween = gsap.to(".departments-section__department_active .swiper-wrapper", {
//         x: deltaX,
//         duration: 3,
//         ease: "none",
//     });

//     departmentsAnimation = ScrollTrigger.create({
//         trigger: ".departments-section",
//         start: () => {
//             let remValue = getComputedStyle(document.documentElement).fontSize;
//             return document.querySelector(".departments-section").offsetHeight < window.innerHeight ? `top+=${parseFloat(remValue)}  top` : "bottom bottom"
//         },
//         ease: "none",
//         pin: true,
//         animation: tween,
//         scrub: 1,
//         invalidateOnRefresh: true,
//     })
    
//     footerCommercialAnimation = gsap.to(".footer__commercial", {
//         scrollTrigger: {
//             trigger: ".footer__commercial",
//             start: "top center",
//             end: "top 10%",
//             scrub: 1,
//             markers: true,
//         },
//         marginBottom: () => -document.querySelector(".footer__commercial").offsetHeight,
//     });

// }


// let departmentsAnimation, footerCommercialAnimation;
// const mapSection = document.querySelector(".map-section")
// const departmentsSection = document.querySelector(".departments-section")

// initDepartmentsAnimation()
// window.addEventListener("resize", () => ScrollTrigger.refresh())

// gsap.from(".departments-section .swiper-buttons", {
//     scrollTrigger: {
//         trigger: ".departments-section .swiper-buttons",
//         start: "top 80%"
//     },
//     yPercent: 25,
//     opacity: 0,
//     duration: 0.6
// })

// gsap.from(".departments-section__departments", {
//     scrollTrigger: {
//         trigger: ".departments-section__departments",
//         start: "top 80%"
//     },
//     yPercent: 10,
//     opacity: 0,
//     duration: 0.6
// })

// let employeeMatchMedia = gsap.matchMedia()
// let employeeEls = gsap.utils.toArray(".departments-section__department_active .employee")
// let paddingValue = window.innerWidth - document.documentElement.clientWidth;


// employeeMatchMedia.add({
//     oneColumn: `(max-width: 615px)`,
//     twoColumn: `(max-width: ${987 + paddingValue}px)`,
//     threeColum: `(max-width: ${1307 + paddingValue}px)`,
//     fourColumn: `(min-width: ${1308 + paddingValue}px)`
// }, context => {
//     let { oneColumn, twoColumn, threeColum } = context.conditions
//     employeeEls.forEach((employeeEl, i) => {
//         let tl = gsap.timeline({
//             scrollTrigger: {
//                 trigger: employeeEl,
//                 start: "top 90%"
//             },
//             delay: () => {
//                 if (oneColumn) {
//                     return 0
//                 }
//                 if (twoColumn) {
//                     return 0.2 * (i % 2)
//                 }
//                 if (threeColum) {
//                     return 0.2 * (i % 3)
//                 }
//                 return 0.2 * (i % 4)
//             },
//         })
//         tl.from(employeeEl.querySelector("img"), imgScaleAnimation)
//         tl.from(employeeEl.querySelector("img"), imgOpacityAnimation, "<")
//         tl.from(employeeEl.querySelectorAll(".employee__position, .employee__name, .employee__email"), {
//             yPercent: 100,
//             opacity: 0,
//             duration: 0.5,
//         }, ">") 
//         // gsap.from(employeeEl, {
//         //     scrollTrigger: {
//         //         trigger: employeeEl,
//         //         start: "top 80%"
//         //     },
//         //     y: 100,
//         //     opacity: 0,
//         //     duration: 0.5,
//         //     delay: () => {
//         //         if (oneColumn) {
//         //             return 0
//         //         }
//         //         if (twoColumn) {
//         //             return 0.2 * (i % 2)
//         //         }
//         //         if (threeColum) {
//         //             return 0.2 * (i % 3)
//         //         }
//         //         return 0.2 * (i % 4)
//         //     },
//         //     // stagger: {
//         //     //     amount: 0.4
//         //     // }
//         // })
//     })
// })


// let roundedSectionEls = gsap.utils.toArray(".map-section__body")
// roundedSectionEls.forEach(sectionEl => {
//     ScrollTrigger.create({
//         trigger: sectionEl,
//         start: () => {
//             let remValue = getComputedStyle(document.documentElement).fontSize;
//             return sectionEl.offsetHeight < window.innerHeight ? `-5% top` : "bottom bottom"
//         },
//         // end: "+= ",
//         pin: true,
//         pinSpacing: false,
//         pinContainer: ".page"
//     })
// })
