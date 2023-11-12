class ServiceAccordion {
    lock = false;

    constructor(elem) {
        this.elem = elem
    }

    open() {

    }

    close() {

    }
}

let serviceEls = document.querySelectorAll(".service")

serviceEls.forEach(serviceEl => {
    let lock = false
    serviceEl.addEventListener("click", (e) => {
        if (lock) {
            return
        }
        
        let closeButtonEl = serviceEl.querySelector(".service__button")
        let contentEl = serviceEl.querySelector(".service__content");
        let bodyEl = contentEl.querySelector(".service__body");
        let previewEl = contentEl.querySelector(".service__preview");
        
        let isOpen = serviceEl.classList.contains("service_open")
        if (e.target.closest(".service__content") && isOpen) {
            return
        }
        
        lock = true
        closeButtonEl.classList.toggle("service__button_open")


        if (window.innerWidth > 992) {
            contentEl.style.cssText = `
                height: ${contentEl.offsetHeight}px;
                opacity: 0;
            `
            contentEl.addEventListener("transitionend", () => {
                if (isOpen) {
                    bodyEl.style.height = ""
                    previewEl.style.height = "";
                    contentEl.style.height = previewEl.offsetHeight + "px"
                } else {
                    contentEl.style.height = bodyEl.scrollHeight + "px"
                    previewEl.style.height = "0";
                    bodyEl.style.height = "auto"
                }

                contentEl.addEventListener("transitionend", () => {
                    if (isOpen) {
                        contentEl.style.cssText = ""
                    } else {
                        contentEl.style.cssText = "height: auto"
                    }
                    // !isOpen && (contentEl.style.height = "auto");
                    // contentEl.style.opacity = ""
                    serviceEl.classList.toggle("service_open")
                    contentEl.addEventListener("transitionend", () => lock = false, { once: true })
                }, { once: true })

            }, { once: true })

        } else {
            if (isOpen) {
                contentEl.style.height = contentEl.offsetHeight + "px"
                setTimeout(() => {
                    previewEl.style = ""
                    bodyEl.style = ""
                    contentEl.style.height = ""
                })
            } else {
                contentEl.style.height =  contentEl.scrollHeight + "px"
                previewEl.style.height = "0";
                bodyEl.style.height = "auto"
            }
            contentEl.addEventListener("transitionend", () => {
                if (contentEl.offsetHeight) {
                    contentEl.style.height = "auto"
                }
                serviceEl.classList.toggle("service_open")
                lock = false
            }, { once: true })
        }
    })
})

