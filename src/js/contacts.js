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
            initDepartmentAnimation()
            departmentsContainer.style.opacity = "";
         }, { once: true })

    })
})

function initDepartmentSlider() {
    departmentSlider = new Swiper(".departments-section__department_active .swiper", {
        slidesPerView: 1.2,
        spaceBetween: 16,
        allowTouchMove: false,
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
    })
}

function getScrollAmount() {
    let swiperWidth = document.querySelector(".departments-section__department_active").offsetWidth;
    let employeeEls = document.querySelectorAll(".departments-section__department_active .employee")
    let wrapperWidth = 0

    for (let i = 0; i < employeeEls.length; i++) {
        wrapperWidth += employeeEls[i].offsetWidth
    }
    
    wrapperWidth += 16 * (employeeEls.length - 1)

    if (swiperWidth >= wrapperWidth)
        return 0
    
    return `+=${(swiperWidth - wrapperWidth)}px`
}

function initDepartmentAnimation() {
    departmentsAnimation?.kill()
    departmentsBodyTween?.kill()
    let deltaX = getScrollAmount()
    
    if (deltaX === 0) {
        let scrollYOffset = mapSection.offsetTop + mapSection.offsetHeight + departmentsSection.offsetHeight - window.innerHeight;
        if (window.pageYOffset >= scrollYOffset) {
            window.scrollTo(0, scrollYOffset)
        }
        return
    }
    footerCommercialAnimation?.kill()

    let tween = gsap.to(".departments-section__department_active .swiper-wrapper", {
        x: deltaX,
        duration: 3,
        ease: "none",
    })

    departmentsAnimation = ScrollTrigger.create({
        trigger: ".departments-section",
        start: () => {
            let remValue = getComputedStyle(document.documentElement).fontSize;
            return document.querySelector(".departments-section").offsetHeight < window.innerHeight ? `top+=${parseFloat(remValue)}  top` : "bottom bottom"
        },
        ease: "none",
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
    })

    footerCommercialAnimation = gsap.to(".footer__commercial", {
        scrollTrigger: {
            trigger: ".footer__commercial",
            start: "top center",
            end: "top 10%",
            scrub: 1,
            markers: true,
        },
        marginBottom: () => -document.querySelector(".footer__commercial").offsetHeight,
    });

    departmentsBodyTween = gsap.to(".departments-section .section__body", {
        y: 0.15 * ScrollTrigger.maxScroll(window) ,
        ease: "none",
        scrollTrigger: {
            trigger: ".footer",
            start: "top 75%",
            end: "max",
            invalidateOnRefresh: true,
            scrub: 0
        }
    });
}

let departmentSlider, departmentsAnimation, departmentsBodyTween, footerCommercialAnimation;
const mapSection = document.querySelector(".map-section")
const departmentsSection = document.querySelector(".departments-section")
initDepartmentSlider()

// animations
ScrollTrigger.create({
    trigger: ".map-section",
    start: (self) => {
        let remValue = parseFloat(getComputedStyle(document.documentElement).fontSize);
        return self.offsetHeight < window.innerHeight ? `${remValue}  top` : "bottom bottom"
    },
    pin: true,
    pinSpacing: false,
})

gsap.from(".departments-section__departments", {
    scrollTrigger: {
        trigger: ".departments-section__departments",
        start: "top 80%"
    },
    yPercent: 10,
    opacity: 0,
    duration: 0.6
})

initDepartmentAnimation()
