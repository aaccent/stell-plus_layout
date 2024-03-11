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

const menuEl = document.querySelector(".header__menu")
const menuLinkEls = document.querySelectorAll(".header__menu-link");
const dropdownEl = document.querySelector(".header__dropdown");
const burgerEl = document.querySelector(".header__burger")

menuLinkEls.forEach(menuLinkEl => {
    menuLinkEl.addEventListener("click", e => {
        let hasSubmenu = menuLinkEl.nextElementSibling;
        if (!hasSubmenu) {            
            return 
        } else {
            e.preventDefault()
        }

        if (window.innerWidth > 992 && isMobile.any()) {
            const activeMenuItems = document.querySelectorAll(".header__menu-item_hover");
            e.preventDefault();
            activeMenuItems.forEach(activeMenuItem => activeMenuItem.classList.remove("header__menu-item_hover"))
            if (hasSubmenu) {
                menuLinkEl.closest(".header__menu-item").classList.add("header__menu-item_hover")
            }
        }
        
        if (window.innerWidth <= 992) {
            menuLinkEl.closest(".header__menu-item").classList.toggle("header__menu-item_open")
        }
    })
})

dropdownEl.addEventListener("click", (e) => {
    const targetEl = e.target;
    if (targetEl.closest(".header__dropdown-head")) {
        targetEl.closest(".header__dropdown").classList.toggle("header__dropdown_open")
    }

    if (targetEl.closest(".header__dropdown-item")) {
        const newLang = targetEl.closest(".header__dropdown-item");
        const lang = {
            img: newLang.querySelector("img").getAttribute("src"),
            label: newLang.querySelector("span").dataset.value
        }

        document.querySelector(".header__dropdown-item_active").classList.remove("header__dropdown-item_active")
        newLang.classList.add("header__dropdown-item_active")

        const dropdownHeadEl = document.querySelector(".header__dropdown-head")
        dropdownHeadEl.querySelector("img").setAttribute("src", lang.img)
        dropdownHeadEl.querySelector("span").innerHTML = lang.label
        targetEl.closest(".header__dropdown").classList.remove("header__dropdown_open")
    }
})

burgerEl.addEventListener("click", (e) => {
    if (burgerEl.classList.contains("header__burger_open")) {
        document.querySelectorAll(".header__menu-item_open").forEach(menuItemEl => menuItemEl.classList.remove("header__menu-item_open"))
        unlockBody()
    } else {
        lockBody()
    }
    
    burgerEl.classList.toggle("header__burger_open")
    menuEl.classList.toggle("header__menu_open")
})

function documentActions(event) {
    const targetEl = event.target;

    if (!targetEl.closest(".header__menu-item")) {
        document.querySelectorAll(".header__menu-item_hover").forEach(activeMenuItem => activeMenuItem.classList.remove("header__menu-item_hover"))
    }

    if (!targetEl.closest(".header__dropdown")) {
        document.querySelector(".header__dropdown").classList.remove("header__dropdown_open")
    }
}

const headerEl = document.querySelector(".header");
const minYOffset = 70;
let lastPageY = 0

function handleScroll() {
    let pageY = window.pageYOffset;
    if (headerEl.querySelector(".header__burger").classList.contains("header__burger_open"))
        return
    if (lastPageY < pageY && pageY > minYOffset) {
        if (!headerEl.classList.contains("header_hide")) {
            headerEl.classList.add("header_hide")
            headerEl.classList.remove("header_show")
            headerEl.querySelector(".header__menu-item_hover")?.classList.remove("header__menu-item_hover")
            headerEl.querySelector(".header__dropdown_open")?.classList.remove("header__dropdown_open")
        }
    } else if (lastPageY > pageY) {
        if (!headerEl.classList.contains("header_show")) {
            headerEl.classList.remove("header_hide")
            headerEl.classList.add("header_show")
        }
        if (pageY < minYOffset && headerEl.classList.contains("header_show")) {
            headerEl.classList.remove("header_show")
        }
    }

    lastPageY = pageY
}
window.addEventListener("scroll", handleScroll)

if (window.pageYOffset > minYOffset) {
    headerEl.classList.add("header_hide")
}

document.addEventListener("click", documentActions);

let tabMediaQuery = window.matchMedia("(max-width: 992px)")

tabMediaQuery.addEventListener("change", e => {
    if (!e.matches) {
        if (burgerEl.classList.contains("header__burger_open")) {
            burgerEl.classList.remove("header__burger_open");
            menuEl.classList.remove("header__menu_open");
            document.querySelectorAll(".header__menu-item_open").forEach(menuItemEl => menuItemEl.classList.remove("header__menu-item_open"))
        }
    }
})