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
}

document.addEventListener("click", documentActions);

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