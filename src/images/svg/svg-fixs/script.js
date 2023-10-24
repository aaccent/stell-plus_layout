const SVGFixer = require('oslllo-svg-fixer');

SVGFixer('svg/plus.svg', 'result').fix()
.then(() => {
    console.log("done")
})
.catch((err) => { console.log(err) })
