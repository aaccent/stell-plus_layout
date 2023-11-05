const allParamsEl = document.querySelector(".product-section__all-params")
const popupEl = document.querySelector(".product-section__popup")
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
