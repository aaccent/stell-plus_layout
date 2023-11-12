import { RunningLine } from "./running-line.js"

const inputEls = document.querySelectorAll(".contact-us-form__input")
const inputControlClass = "contact-us-form__control"

const selectEl = document.forms["contact-us-form"].querySelector(".contact-us-form__select")
const selectLabel = selectEl.querySelector(".select__label")
const selectMenu = selectEl.querySelector(".select__options-wrapper")

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateForm(form) {    
    const reqFiedls = form.querySelectorAll("[class$='__input_required']")

    let errors = 0;
    for (let i = 0; i < reqFiedls.length; i++) {
        if (reqFiedls[i].getAttribute("name") === "name") {
            if (reqFiedls[i].value === "") {
                reqFiedls[i].closest(".contact-us-form__control").classList.add("contact-us-form__control_error");
                errors++;
            }
        }
        if (reqFiedls[i].getAttribute("name") === "phone") {
            if (reqFiedls[i].value.trim() === "" || reqFiedls[i].value.length < 15) {
                reqFiedls[i].closest(".contact-us-form__control").classList.add("contact-us-form__control_error");
                errors++;
            }
        }
    }

    const emailField = form.querySelector("input[type='email']")

    if (emailField.value.trim() !== "" && !validateEmail(emailField.value)) {
        emailField.closest(".contact-us-form__control").classList.add("contact-us-form__control_error");
        errors++
    }

    if (errors) {
        console.log("Fill req fields");
    } else {
        form.classList.add("contact-us-form_sending")
        form.querySelectorAll("input, textarea").forEach(formField => formField.disabled = true)
        form.querySelector(".contact-us-form__button").disabled = true
        setTimeout(() => {
            form.reset()
            form.classList.remove("contact-us-form_sending")
            form.classList.add("contact-us-form_sent")
            form.querySelectorAll(".contact-us-form__control").forEach(controlEl => {
                let fullWidthClass = controlEl.classList.contains("full-width") ? " contact-us-form__control_full-width" : ""
                controlEl.className = "contact-us-form__control" + fullWidthClass;
            })
            form.querySelectorAll("input, textarea").forEach(formField => formField.disabled = false)
            form.querySelector(".contact-us-form__button").disabled = false
        }, 1500)
    }
}

function documentActions(e) {
    const targetEl = e.target;
    if (!targetEl.closest(".contact-us-form__control")) {
        let focusedControl = document.querySelector(".contact-us-form__control_focused");
        focusedControl && focusedControl.classList.remove("contact-us-form__control_focused")
    }

    if (!targetEl.closest(".contact-us-form__select")) {
        if (document.querySelector(".select_open")) {
            document.querySelector(".select_open").classList.remove("select_open")
            document.querySelector(".select__options-wrapper").style.height = ""
        }
    }
}

document.addEventListener("click", documentActions)

let lock = false;
selectEl.addEventListener("click", e => {
    // клик по заголовку
    if (e.target.closest(".select__head") && !lock) {
        lock = true
        if (selectEl.classList.contains("select_open")) {
            selectEl.classList.remove("select_open")
            selectMenu.style.height = ""
        } else {
            selectEl.classList.add("select_open")
            selectMenu.style.height = selectMenu.scrollHeight + "px"
        }
        selectMenu.addEventListener("transitionend", () => lock = false)
    }
    // клик по вариантам
    if (e.target.closest(".select__option")) {
        let activeOptionEl = selectEl.querySelector(".select__option_selected")
        let curOptionEl = e.target.closest(".select__option");

        activeOptionEl && activeOptionEl.classList.remove("select__option_selected")
        curOptionEl.classList.add("select__option_selected")

        selectEl.querySelector("input").value = curOptionEl.dataset.value
        selectLabel.innerHTML = curOptionEl.querySelector(".select__option-label").innerHTML
        selectEl.classList.add("select_selected")

        setTimeout(() => {
            selectEl.classList.remove("select_open")
            selectMenu.style.height = ""
        }, 200);
        
    }
})

for (let i = 0; i < inputEls.length; i++) {
    let inputControlEl = inputEls[i].closest("." + inputControlClass)
    // сброс инпута
    inputControlEl.querySelector("button").addEventListener("click", e => {
        if (e.target.closest("form").classList.contains("contact-us-form_sending")) {
            return 
        }
        inputControlEl.className = inputControlClass
        inputEls[i].value = "";
        inputEls[i].focus()
    })
    // ввод
    inputEls[i].addEventListener("input", e => {
        const inputEl = e.target;
        const changedClass = "contact-us-form__control_changed"
        if (inputControlEl.classList.contains(inputControlClass + "_error")) {
            inputControlEl.classList.remove(inputControlClass + "_error")
        }
        // убрать с textarea
        if (inputEl.value !== "") {
            !inputControlEl.classList.contains(changedClass) && inputControlEl.classList.add(changedClass)
        } else {
            inputControlEl.classList.remove(changedClass)
        }
    })
    inputEls[i].addEventListener("change", e => {
        const inputEl = e.target;
        if (inputEl.value.trim() !== "") {
            inputControlEl.classList.add("contact-us-form__control_filled")
            // inputEl.getAttribute("name") === "phone" && inputEl.closest(".contact-us-form__control").classList.add("contact-us-form__control_error")
        } else {
            inputControlEl.classList.remove("contact-us-form__control_filled")
        }

    })
    inputEls[i].addEventListener("focus", e => {
        let focusedControl = document.querySelector("." + inputControlClass + "_focused")
        focusedControl && focusedControl.classList.remove(inputControlClass + "_focused")
        inputControlEl.classList.add("contact-us-form__control_focused")
    })
}

document.querySelectorAll("input[name='phone']").forEach(inputElement => {
    inputElement.addEventListener("keypress", (e) => {
        const length = e.target.value.length;
        if (e.charCode < 48 || e.charCode > 57 || length > 14) {
            e.preventDefault();
            return;
        }

        switch (length) {
            case 0: 
                e.target.value = "8 " ;
                break;
            case 5:
            case 9:
            case 12:
                e.target.value += " ";
                break;
            default:
                break;
        }
    })
    inputElement.addEventListener("input", e => {e.target.value.length === 2 && (e.target.value = "")})
})

document.forms["contact-us-form"].elements["comments"].addEventListener("input", e => {
    const textAreaEl = e.target;
    const hiddenTextAreaEl = textAreaEl.previousElementSibling;
    hiddenTextAreaEl.value = textAreaEl.value;
    if (textAreaEl.offsetHeight !== hiddenTextAreaEl.scrollHeight) {
        textAreaEl.style.height = hiddenTextAreaEl.scrollHeight + "px"
    }
}) 
document.querySelector(".contact-us-form__file-input").addEventListener("change", e => {
    const parentEl = e.target.closest(".contact-us-form__file");
    parentEl.querySelector(".contact-us-form__file-doc span").innerHTML = e.target.files[0].name
    parentEl.classList.add("contact-us-form__file_attached")
})

document.forms["contact-us-form"].addEventListener("submit", e => {
    e.preventDefault();
    validateForm(e.target)
})

const runningLineEls = document.querySelectorAll(".running-line__wrapper")
for (let i = 0; i < runningLineEls.length; i++) {
    new RunningLine(runningLineEls[i]).init()
}
