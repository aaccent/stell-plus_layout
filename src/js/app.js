window.onload = function() {
    const isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    }; 

    const lockPaddingElements = document.querySelector("header");
    
    function lockBody() {
        let paddingValue = window.innerWidth - document.documentElement.clientWidth;
        if (lockPaddingElements && paddingValue) {
            lockPaddingElements.style.paddingRight = paddingValue + "px"
        }
        document.body.classList.add("body_lock")
    }

    function unlockBody () {
        if (lockPaddingElements) {
            lockPaddingElements.style.paddingRight = ""
        }
        document.body.classList.remove("body_lock")
    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validateForm(form) {    
        const reqFiedls = form.querySelectorAll("[class$='__input_required']")
    
        let errors = 0;
        for (let i = 0; i < reqFiedls.length; i++) {
            if (reqFiedls[i].getAttribute("name") === "name") {
                if (reqFiedls[i].value === "") {
                    reqFiedls[i].closest(".contact-us-form__control").classList.add("contact-us-form__control_error");
                    errors++;
                }
            }
            if (reqFiedls[i].getAttribute("name") === "phone") {
                if (reqFiedls[i].value.trim() === "" || reqFiedls[i].value.length < 15) {
                    reqFiedls[i].closest(".contact-us-form__control").classList.add("contact-us-form__control_error");
                    errors++;
                }
            }
        }

        const emailField = form.querySelector("input[type='email']")

        if (emailField.value.trim() !== "" && !validateEmail(emailField.value)) {
            emailField.closest(".contact-us-form__control").classList.add("contact-us-form__control_error");
            errors++
        }
    
        if (errors) {
            console.log("Fill req fields");
        } else {
            form.classList.add("contact-us-form_sending")
            form.querySelectorAll("input, textarea").forEach(formField => formField.disabled = true)
            form.querySelector(".contact-us-form__button").disabled = true
            setTimeout(() => {
                form.reset()
                form.classList.remove("contact-us-form_sending")
                form.classList.add("contact-us-form_sent")
                form.querySelectorAll(".contact-us-form__control").forEach(controlEl => {
                    controlEl.className = "contact-us-form__control"
                })
                form.querySelectorAll("input, textarea").forEach(formField => formField.disabled = false)
                form.querySelector(".contact-us-form__button").disabled = false
            }, 1500)
        }
    }
    // ---------------------------------------- //
    function documentActions(event) {
        const targetEl = event.target;
        // submenu
        if (window.innerWidth > 992 && isMobile.any()) {
            const activeMenuItems = document.querySelectorAll(".header__menu-item_hover");
            if (targetEl.classList.contains("header__menu-link")) {
                event.preventDefault();
                activeMenuItems.forEach(activeMenuItem => activeMenuItem.classList.remove("header__menu-item_hover"))
                if (targetEl.closest(".header__menu-item").querySelector(".header__submenu")) {
                    targetEl.closest(".header__menu-item").classList.add("header__menu-item_hover")
                }
            }
            if (!targetEl.closest(".header__menu-item")) {
                activeMenuItems.forEach(activeMenuItem => activeMenuItem.classList.remove("header__menu-item_hover"))
            }
        }
        
        if (window.innerWidth <= 992) {
            if (targetEl.classList.contains("header__menu-link")) {
                targetEl.closest(".header__menu-item").classList.toggle("header__menu-item_open")
            }
        }

        // menu 
        if (targetEl.classList.contains("header__burger")) {
            targetEl.classList.toggle("header__burger_open")
            document.querySelector(".header__menu").classList.toggle("header__menu_open")
            document.body.classList.toggle("body_lock")
        }

        // lang
        if (targetEl.closest(".header__dropdown-head")) {
            targetEl.closest(".header__dropdown").classList.toggle("header__dropdown_open")
        } else {
            document.querySelector(".header__dropdown").classList.remove("header__dropdown_open")
        }

        if (targetEl.closest(".header__dropdown-item")) {
            const newLang = targetEl.closest(".header__dropdown-item");
            const lang = {
                img: newLang.querySelector("img").getAttribute("src"),
                label: newLang.querySelector("div").dataset.value
            }

            document.querySelector(".header__dropdown-item_active").classList.remove("header__dropdown-item_active")
            newLang.classList.add("header__dropdown-item_active")

            const dropdownHeadEl = document.querySelector(".header__dropdown-head")
            dropdownHeadEl.querySelector("img").setAttribute("src", lang.img)
            dropdownHeadEl.querySelector("div").innerHTML = lang.label
            targetEl.closest(".header__dropdown").classList.remove("header__dropdown_open")
        }
        // footer form 
        if (!targetEl.closest(".contact-us-form__control")) {
            let focusedControl = document.querySelector(".contact-us-form__control_focused");
            focusedControl && focusedControl.classList.remove("contact-us-form__control_focused")
        }

        if (!targetEl.closest(".contact-us-form__select")) {
            if (document.querySelector(".select_open")) {
                document.querySelector(".select_open").classList.remove("select_open")
                document.querySelector(".select__options-wrapper").style.height = ""
            }
        }

        // filters equipment page
        if (targetEl.closest(".tag")) {
            let currentTagrEl = targetEl.closest(".tag")
            let clearTagEl = document.querySelector(".tag_clear");
            // клик по сбросу
            if (currentTagrEl === clearTagEl) {
                let activeTagEls = document.querySelectorAll(".tag_selected")
                for (let i = 0; i < activeTagEls.length; i++) {
                    activeTagEls[i].classList.remove("tag_selected")
                }
                clearTagEl.classList.add("tag_disabled")
            // клик по фильтру
            } else {
                targetEl.closest(".tag").classList.toggle("tag_selected")
                if (!document.querySelectorAll(".tag_selected").length) {
                    clearTagEl.classList.add("tag_disabled")
                } else if (clearTagEl.classList.contains("tag_disabled")) {
                    clearTagEl.classList.remove("tag_disabled")
                }
            }
        }

        // ----------- single product page ----------------
        if (targetEl.classList.contains("product-section__all-params")) {
            document.body.classList.add("body_lock")
            const popupEl = document.querySelector(".product-section__popup")
            popupEl.classList.add("popup_open")
        }
        if (targetEl.closest(".popup__close") || targetEl.classList.contains("popup__container")) {
            document.querySelector(".popup_open").addEventListener("transitionend", e => {
                document.body.classList.remove("body_lock")
            }, { once: true })
            document.querySelector(".popup_open").classList.remove("popup_open")
        }

        // ----------- contacts page ----------------

        if (targetEl.classList.contains("departments-section__tab-button")) {
            let departmentName = targetEl.dataset.department;
            let departmentsContainer = document.querySelector(".departments-section__departments");

            document.querySelector(".departments-section__tab-button_active").classList.remove("departments-section__tab-button_active")
            targetEl.classList.add("departments-section__tab-button_active")

            departmentsContainer.style.opacity = "0"
            departmentsContainer.addEventListener("transitionend", () => {
                let activeDepartmentClass = "departments-section__department_active"
                departmentsContainer.querySelector("." + activeDepartmentClass).classList.remove(activeDepartmentClass)
                departmentsContainer.style.opacity = ""
                departmentsContainer.querySelector(".departments-section__department_" + departmentName).classList.add(activeDepartmentClass);

            }, { once: true })
        }
        // header phone
        // if (window.innerWidth <= 576 && isMobile.any()) {
        //     if (targetEl.classList.contains("header__phone-icon")) {
        //         targetEl.closest(".header__phone").classList.toggle("header__phone_hover")
        //     }

        //     if (!targetEl.closest(".header__phone")) {
        //         const activePhone = document.querySelector(".header__phone_hover")
        //         activePhone && activePhone.classList.remove("header__phone_hover")
        //     }
        // }
    }
    window.addEventListener("click", documentActions)
    // ---------------------------------------- //
    //Header
    const headerEl = document.querySelector(".header");

    const callback = function(entries, observer) {
        // элемент в видимой части экрана
        // в данном случае это headerEl
        if (entries[0].isIntersecting) {
            headerEl.classList.remove("header_scroll")
        } else {
            // элемент пропал с видимой части экрана
            headerEl.classList.add("header_scroll")
        }
    }

    const headerObserver = new IntersectionObserver(callback)
    headerObserver.observe(headerEl)

    document.querySelectorAll("input[name='phone']").forEach(inputElement => {
        inputElement.addEventListener("keypress", (e) => {
            const length = e.target.value.length;
            if (e.charCode < 48 || e.charCode > 57 || length > 14) {
                e.preventDefault();
                return;
            }
    
            switch (length) {
                case 0: 
                    e.target.value = "8 " ;
                    break;
                case 5:
                case 9:
                case 12:
                    e.target.value += " ";
                    break;
                default:
                    break;
            }
        })
        inputElement.addEventListener("input", e => {e.target.value.length === 2 && (e.target.value = "")})
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
        }
    })

    new Swiper(".hero-section__slider .swiper", {
        slidesPerView: 1,
        observer: true,
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

    const innerBannerSwiper = new Swiper(".banner-slider_inner .swiper", {
        slidesPerView: 1,
        observer: true,
        observeParents: true,
        resizeObserver: true,
        speed: 300,
        pagination: {
            el: ".banner-section .swiper-pagination",
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
            nextEl: ".banner-section .swiper-button-next",
            prevEl: ".banner-section .swiper-button-prev",
        },
    })

    const outerBannerSwiper = new Swiper(".banner-slider_outer .swiper", {
        slidesPerView: 1,
        // navigation: {
        //     nextEl: ".banner-section .swiper-button-next",
        //     prevEl: ".banner-section .swiper-button-prev",
        // },
    })

    outerBannerSwiper.controller.control = innerBannerSwiper;
    innerBannerSwiper.controller.control = outerBannerSwiper;

    // footer form
    const inputEls = document.querySelectorAll(".contact-us-form__input")
    const inputControlClass = "contact-us-form__control"

    const selectEl = document.forms["contact-us-form"].querySelector(".contact-us-form__select")
    const selectLabel = selectEl.querySelector(".select__label")
    const selectMenu = selectEl.querySelector(".select__options-wrapper")

    selectEl.addEventListener("click", e => {
        // клик по заголовку
        if (e.target.closest(".select__head")) {
            if (selectEl.classList.contains("select_open")) {
                let activeOptionEl = selectEl.querySelector(".select__option_selected")
                if (activeOptionEl) {
                    selectEl.querySelector("input").value = activeOptionEl.dataset.value
                    selectLabel.innerHTML = activeOptionEl.querySelector(".select__option-label").innerHTML
                    selectEl.classList.add("select_selected")
                }
                selectEl.classList.remove("select_open")
                selectMenu.style.height = ""
            } else {
                selectEl.classList.add("select_open")
                selectMenu.style.height = selectMenu.scrollHeight + "px"
            }
        }
        // клик по вариантам
        if (e.target.closest(".select__option")) {
            let activeOptionEl = selectEl.querySelector(".select__option_selected")
            activeOptionEl && activeOptionEl.classList.remove("select__option_selected")
            e.target.closest(".select__option").classList.add("select__option_selected")
        }
    })

    for (let i = 0; i < inputEls.length; i++) {
        let inputControlEl = inputEls[i].closest("." + inputControlClass)

        inputControlEl.querySelector("button").addEventListener("click", e => {
            // inputControlEl.classList.remove(inputControlClass + "_filled")
            // inputControlEl.classList.remove(inputControlClass + "_changed")
            if (e.target.closest("form").classList.contains("contact-us-form_sending")) {
                return 
            }
            inputControlEl.className = inputControlClass
            inputEls[i].value = "";
            inputEls[i].focus()
        })
        inputEls[i].addEventListener("input", e => {
            const inputEl = e.target;
            // const inputControlEl = inputEl.closest(".contact-us-form__control");
            const changedClass = "contact-us-form__control_changed"
            if (inputControlEl.classList.contains(inputControlClass + "_error")) {
                inputControlEl.classList.remove(inputControlClass + "_error")
            }
            // убрать с textarea
            if (inputEl.value !== "") {
                !inputControlEl.classList.contains(changedClass) && inputControlEl.classList.add(changedClass)
            } else {
                inputControlEl.classList.remove(changedClass)
            }
        })
        inputEls[i].addEventListener("change", e => {
            const inputEl = e.target;
            // const inputControlEl = inputEl.closest(".contact-us-form__control");
            if (inputEl.value.trim() !== "") {
                inputControlEl.classList.add("contact-us-form__control_filled")
                // inputEl.getAttribute("name") === "phone" && inputEl.closest(".contact-us-form__control").classList.add("contact-us-form__control_error")
            } else {
                inputControlEl.classList.remove("contact-us-form__control_filled")
            }

        })
        inputEls[i].addEventListener("focus", e => {
            let focusedControl = document.querySelector("." + inputControlClass + "_focused")
            focusedControl && focusedControl.classList.remove(inputControlClass + "_focused")
            inputControlEl.classList.add("contact-us-form__control_focused")
        })
    }

    document.forms["contact-us-form"].elements["comments"].addEventListener("input", e => {
        const textAreaEl = e.target;
        const hiddenTextAreaEl = textAreaEl.previousElementSibling;
        hiddenTextAreaEl.value = textAreaEl.value;
        if (textAreaEl.offsetHeight !== hiddenTextAreaEl.scrollHeight) {
            textAreaEl.style.height = hiddenTextAreaEl.scrollHeight + "px"
        }
    }) 
    document.querySelector(".contact-us-form__file-input").addEventListener("change", e => {
        const parentEl = e.target.closest(".contact-us-form__file");
        parentEl.querySelector(".contact-us-form__file-doc span").innerHTML = e.target.files[0].name
        parentEl.classList.add("contact-us-form__file_attached")
    })

    document.forms["contact-us-form"].addEventListener("submit", e => {
        e.preventDefault();
        validateForm(e.target)
    })

    // running line 
    class RunningLine {
        breakpoint;
        mediaQuery;

        constructor(elem) {
            this.elem = elem;
            this.paddingValue = window.innerWidth - this.elem.parentElement.offsetWidth
        }

        needInsert() {
            console.log(this.elem.offsetWidth, this.elem.parentElement.offsetWidth)
            let r = Math.floor(this.elem.offsetWidth / (this.elem.parentElement.offsetWidth + this.paddingValue))
            return r < 2 // r == 1 
        }

        insertItems() {
            const items = Array.from(this.elem.children);
            for (let i = 0; i < items.length; i++) {
                this.elem.append(items[i].cloneNode(true))
            }
            this.elem.style.animationDuration = parseInt(getComputedStyle(this.elem).animationDuration) * 2 + "s"
            console.log("insetred")
        }

        updateValues() {
            this.breakpoint = this.elem.offsetWidth / 2 + 0.5;
            this.mediaQuery = window.matchMedia(`(min-width: ${this.breakpoint}px)`);
            console.log("breakpoint", this.breakpoint)
        }

        handleChangeMediaQuery = (e) => {
            if (e.matches) {
                this.needInsert() && this.insertItems()
                this.updateValues()
                this.mediaQuery.addEventListener("change", this.handleChangeMediaQuery, { once: true} )
            }
        }

        init() {
            while (this.needInsert()) {
                this.insertItems()
            }
            this.updateValues()
            this.mediaQuery.addEventListener("change", this.handleChangeMediaQuery, { once: true} )
        }
    }



    const runningLineEls = document.querySelectorAll(".running-line__wrapper")
    for (let i = 0; i < runningLineEls.length; i++) {
        new RunningLine(runningLineEls[i]).init()
    }

    // cases page

    new Swiper (".section__images.swiper", {
        slidesPerView: 1,
        spaceBetween: 16,
        watchOverflow: true,
        breakpoints: {
            576: {
                slidesPerView: 2,
            }
        },
        pagination: {
            el: ".swiper-pagination",
            type: "bullets"
        }
    })

    new Swiper(".equipments-slider", {
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
        navigation: {
            nextEl: ".equipments-section .swiper-button-next",
            prevEl: ".equipments-section .swiper-button-prev",
        },
    })

    new Swiper(".results-slider .swiper", {
        slidesPerView: 1,
        spaceBetween: 16,
        pagination: {
            el: ".results-slider .swiper-pagination",
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
            nextEl: ".results-slider .swiper-button-next",
            prevEl: ".results-slider .swiper-button-prev",
        },
    })
    
    new Swiper(".projects-slider .swiper", {
        slidesPerView: 1,
        spaceBetween: 16,
        breakpoints: {
            860: {
                slidesPerView: 2
            }
        },
        navigation: {
            nextEl: ".projects-section .swiper-button-next",
            prevEl: ".projects-section .swiper-button-prev",
        },
        on: {
            touchMove: function(swiper, event) {
                let swipeHint = document.getElementById("swipe")

                if (swipeHint) {
                    swipeHint.style.cssText = `
                        opacity: 0;
                        visibility: hidden;
                        transform: scale(0.65);
                    `
                    swipeHint.addEventListener("transitionend", (e) => {
                        e.target.remove()
                    }, { once: true })
                }
            },
        }
    })

    new Swiper(".timeline-slider .swiper", {
        slidesPerView: 1,
        spaceBetween: 55,
        // breakpoints: {
        //     576: {
        //         slidesPerView: "auto"
        //     },
        //     768: {
        //         slidesPerView: "1"
        //     }
        // },
        pagination: {
            el: ".timeline-slider .swiper-pagination",
            type: "progressbar",
        }
    })

    new Swiper(".certificates-section__slider .swiper", {
        slidesPerView: 1,
        spaceBetween: 16,
        breakpoints: {
            576: {
                slidesPerView: "auto"
            },
        },
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar",
        }
    })

    // -----------conatcts page----------
    function init() {
        const getCoords = async () => {
            let response = await fetch("../json/coords.json", {
                method: "GET"
            });

            if (response.ok) {
                let mapPins = await response.json()
                setMapPins(mapPins)
            } else {
                console.log("Error!!!")
            }
        }

        function setMapPins(pins) {
            let myCollection = new ymaps.GeoObjectCollection();
                    
            for (var i = 0; i < pins.length; i++) {
                myCollection.add(new ymaps.Placemark(pins[i].coord, {
                    pinData: pins[i]
                }, {
                    iconLayout: "default#image",
                    iconImageHref: "../images/map-mark.svg",
                    iconImageSize: [60, 60],
                }));
            }
            
            map.geoObjects.add(myCollection);
            myCollection.events.add("click", e => {
                let query = ymaps.geoQuery(map.geoObjects);
    
                for (let i = 0; i < query.getLength(); i++) {
                    let el = query.get(i);
                    el.options.set('iconImageHref', '../images/map-mark.svg')                
                }
        
                let pinData = e.get("target").properties.get("pinData");
                map.panTo(pinData.coord, { duration: 300 })
                
                e.get('target').options.set('iconImageHref', '../images/map-mark-active.svg')  

                const balloonEl = document.querySelector(".balloon_open")
                if (balloonEl) {
                    let balloonContentEl = balloonEl.querySelector(".balloon__content")
                    balloonContentEl.style.opacity = "0"
                    balloonContentEl.addEventListener("transitionend", (e) => {
                        loadBalloon(pinData)
                        e.target.style.opacity = ""
                    })
                } else {
                    document.querySelector(".balloon").classList.add("balloon_open")            
                }
            })
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
                        <a href="tel:${data.phone}">${data.phone} </a>
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

        let map = new ymaps.Map("map", {
            center: [55.75,37.60],
            controls: [],
            zoom: 12,
        }, {
            minZoom: 12
        })

        // {
        //     zoomControlPosition: {
        //         right: "40px",
        //         bottom: "40px"
        //     },
        //     zoomControlSize: "small",
        //     zoomControlZoomDuration: "1500"
        // }
        // Создадим пользовательский макет ползунка масштаба.
        let ZoomLayout = ymaps.templateLayoutFactory.createClass("<div id='zoom-controls'>" +
            "<button id='zoom-out' type='button' disabled><span class='icon-minus'></span></button>" +
            "<button id='zoom-in' type='button'><span class='icon-plus'></span></button>" +
            "</div>", {

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
                if (map.getZoom() >= 12) {
                    document.getElementById("zoom-out").disabled = false
                }
            },

            zoomOut: function () {
                let map = this.getData().control.getMap();
                map.setZoom(map.getZoom() - 1, {checkZoomRange: true, duration: 300});
                if (map.getZoom() <= 13) {
                    document.getElementById("zoom-out").disabled = true
                }
            }
        }),
        zoomControl = new ymaps.control.ZoomControl({
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
        map.events.add("click", () => document.getElementById("balloon").classList.remove("balloon_open"))
    }

    ymaps.ready(init)
}

