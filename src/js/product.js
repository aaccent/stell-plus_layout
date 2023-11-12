const allParamsEl = document.querySelector(".product-section__all-params")
const popupEl = document.querySelector(".product-section__popup")
const lockPaddingElements = document.querySelectorAll(".header__container, .model, .hero-section, .product-section");

function lockBody() {
    let paddingValue = window.innerWidth - document.documentElement.clientWidth;
    if (lockPaddingElements.length && paddingValue) {
        lockPaddingElements.forEach(lockPaddingEl => {
            const selfPaddingValue = parseInt(getComputedStyle(lockPaddingEl).paddingRight);
            lockPaddingEl.style.paddingRight = selfPaddingValue + paddingValue + "px"
        })
    }
    document.body.classList.add("body_lock")
}

function unlockBody () {
    if (lockPaddingElements.length) {
        lockPaddingElements.forEach(lockPaddingEl => lockPaddingEl.style.paddingRight = "")
    }
    document.body.classList.remove("body_lock")
}

function closePopup(popup) {
    popup.addEventListener("transitionend", e => {
        unlockBody()
    }, { once: true })
    popup.classList.remove("popup_open")
}

function openPopup(popup = undefined) {
    lockBody()
    if (popup) {
        popup.classList.add("popup_open")
    } else {
        console.log("Give me a popup")
    }
}

allParamsEl.addEventListener("click", (e) => openPopup(popupEl))
document.querySelector(".popup__close").addEventListener("click", e => closePopup(popupEl))
popupEl.addEventListener("click", e => {
    if (!e.target.closest(".popup__content")) {
        closePopup(popupEl)
    }
})

document.addEventListener("keydown", (e) => {
    if (e.which === 27) {
        popupClose(popup)
    }
})


const callback = function(entries, observer) {
    // элемент в видимой части экрана
    if (entries[0].isIntersecting) {
        modelEl.classList.remove("_squeeze")
    } else {
        // элемент пропал с видимой части экрана
        modelEl.classList.add("_squeeze")
    }
}

const modelObserver = new IntersectionObserver(callback)
const modelObserverEl = document.querySelector(".model-observer")
const modelEl = document.querySelector(".model img")

if (window.innerWidth > 992 && window.innerWidth <= 1280) {
    modelObserver.observe(modelObserverEl)
}

const mediaQuery = window.matchMedia("(min-width: 992.02px) and (max-width: 1280px)")

mediaQuery.addEventListener("change", e => {
    if (e.matches) {
        modelObserver.observe(modelObserverEl)
    } else {
        modelObserver.unobserve(modelObserverEl)
        modelEl.classList.contains("_squeeze") && modelEl.classList.remove("_squeeze")
    }
})