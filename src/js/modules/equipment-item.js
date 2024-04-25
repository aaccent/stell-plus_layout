function createItemAnimationsOnMobile() {
    let options = {
        rootMargin: "0px",
        threshold: 0.3,
    };

    let activeItem = null

    function callback(entries) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return
            if (activeItem === entry.target) return

            activeItem?.pause()
            activeItem = entry.target
            activeItem.currentTime = 0
            activeItem.play()
        })
    }

    let observer = new IntersectionObserver(callback, options);

    const items = document.querySelectorAll('.equipment-section .equipment-item__video video')
    items.forEach(video => {
        observer.observe(video)
    })
}

function handleEquipmentCard(parentClass) {
    if (window.matchMedia('(max-width: 1100px)').matches) {
        createItemAnimationsOnMobile()
    }

    const equipmentGridEl = document.querySelector("." + parentClass)

    let currentVideoEl;
    let currentEl;
    equipmentGridEl.addEventListener("mouseover", e => {
        let targerEl = e.target.closest(".equipment-item")
        
        if (targerEl) {
            if (currentVideoEl && currentVideoEl.closest(".equipment-item") !== targerEl) {
                currentVideoEl.pause()
                currentVideoEl.currentTime = 0
            }
            currentVideoEl = targerEl.querySelector("video")
            currentVideoEl.play()
        } else {
            if (e.relatedTarget.closest(".equipment-item")) {
                currentVideoEl.pause()
                currentVideoEl.currentTime = 0
            }
        }

    })
    equipmentGridEl.addEventListener("mouseleave", e => {
        if (currentVideoEl) {
            currentVideoEl.pause();
            currentVideoEl.currentTime = 0;
            currentVideoEl = null
        }
    })
}

export { handleEquipmentCard }