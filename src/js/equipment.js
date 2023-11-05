const clearTagEl = document.querySelector(".tag_clear")

document.querySelectorAll(".tag").forEach(tagEl => {
    tagEl.addEventListener("click", e => {
        const targetEl = e.currentTarget;
        if (targetEl.classList.contains("tag_clear")) {
            let activeTagEls = document.querySelectorAll(".tag_selected")
            for (let i = 0; i < activeTagEls.length; i++) {
                activeTagEls[i].classList.remove("tag_selected")
            }
            tagEl.classList.add("tag_disabled")
        // клик по фильтру
        } else {
            targetEl.classList.toggle("tag_selected")
            if (!document.querySelectorAll(".tag_selected").length) {
                clearTagEl.classList.add("tag_disabled")
            } else if (clearTagEl.classList.contains("tag_disabled")) {
                clearTagEl.classList.remove("tag_disabled")
            }
        }
    })
})

// if (targetEl.closest(".tag")) {
//     let currentTagrEl = targetEl.closest(".tag")
//     let clearTagEl = document.querySelector(".tag_clear");
//     // клик по сбросу
//     if (currentTagrEl === clearTagEl) {
//         let activeTagEls = document.querySelectorAll(".tag_selected")
//         for (let i = 0; i < activeTagEls.length; i++) {
//             activeTagEls[i].classList.remove("tag_selected")
//         }
//         clearTagEl.classList.add("tag_disabled")
//     // клик по фильтру
//     } else {
//         targetEl.closest(".tag").classList.toggle("tag_selected")
//         if (!document.querySelectorAll(".tag_selected").length) {
//             clearTagEl.classList.add("tag_disabled")
//         } else if (clearTagEl.classList.contains("tag_disabled")) {
//             clearTagEl.classList.remove("tag_disabled")
//         }
//     }