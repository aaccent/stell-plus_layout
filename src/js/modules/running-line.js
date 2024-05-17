class RunningLine {
    breakpoint;
    mediaQuery;
    copies = 1;

    constructor(elem) {
        this.elem = elem;
        this.paddingValue = window.innerWidth - this.elem.parentElement.offsetWidth
    }

    needInsert() {
        // console.log(this.elem.offsetWidth, this.elem.parentElement.offsetWidth)
        let r = Math.floor(this.elem.offsetWidth / (this.elem.parentElement.offsetWidth + this.paddingValue))

        return r < 2 || this.copies === 1 // r == 1
    }

    insertItems() {
        this.copies++;
        const items = Array.from(this.elem.children);
        for (let i = 0; i < items.length; i++) {
            this.elem.append(items[i].cloneNode(true))
        }
        this.elem.style.animationDuration = parseInt(getComputedStyle(this.elem).animationDuration) * 2 + "s"
        // console.log("insetred")
    }

    updateValues() {
        this.breakpoint = this.elem.offsetWidth / 2 + 0.5;
        this.mediaQuery = window.matchMedia(`(min-width: ${this.breakpoint}px)`);
        // console.log("breakpoint", this.breakpoint)
    }

    handleChangeMediaQuery = (e) => {
        if (e.matches) {
            this.needInsert() && this.insertItems()
            this.updateValues()
            this.mediaQuery.addEventListener("change", this.handleChangeMediaQuery, { once: true} )
        }
    }

    init() {
        while (this.needInsert()) {
            this.insertItems()
        }
        this.updateValues()
        this.mediaQuery.addEventListener("change", this.handleChangeMediaQuery, { once: true} )
    }
}

export { RunningLine }