import { RunningLine } from "./modules/running-line.js";
import "./modules/footer.js";
// import "./modules/yandex-maps.js"

window.onload = function() {

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
    document.addEventListener("click", documentActions)

    // running line 
    const runningLineEls = document.querySelectorAll(".running-line__wrapper")
    for (let i = 0; i < runningLineEls.length; i++) {
        new RunningLine(runningLineEls[i]).init()
    }