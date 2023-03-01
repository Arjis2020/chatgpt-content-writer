import { loader } from "./loader.js"
import chalk from 'chalk'

function printToConsole(text, level = "success", additionalText = "") {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.moveCursor(0, 0)
    function getLog() {
        if (level === 'success')
            return success(text)
        else if (level === 'error')
            return error(text)
        else if (level === 'warn')
            return warn(text)
        return text
    }
    console.log(getLog() + additionalText)
}

function finishStep(step) {
    clearInterval(step)
}

function step(...text) {
    // return new Promise(resolve => {
        return loader(text.join(" "), 'info')
        // let timeout = setTimeout(() => {
            // clearInterval(_loader)
            // clearTimeout(timeout)
            // resolve()
        // }, 1000)
    // })
}

function success(text) {
    return chalk.greenBright("\u2713 " + text)
}

function error(text) {
    return chalk.redBright("\u2717 " + text)
}

function warn(text) {
    return chalk.yellowBright("! " + text)
}

export { printToConsole, step, finishStep }