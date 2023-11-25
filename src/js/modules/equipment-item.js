function handleEquipmentCard(parentClass) {
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