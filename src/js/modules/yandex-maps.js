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