import chalk from 'chalk'
import loading from 'loading-cli';

/**
 * Create and display a loader in the console.
 *
 * @param {string} [text=""] Text to display after loader
 * @param {array.<string>} [chars=["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"]]
 * Array of characters representing loader steps
 * @param {number} [delay=100] Delay in ms between loader steps
 * @example
 * let loader = loader("Loading…");
 *
 * // Stop loader after 1 second
 * setTimeout(() => clearInterval(loader), 1000);
 * @returns {number} An interval that can be cleared to stop the animation
 */
export function loader(
    text = "",
    level = "info",
    delay = 100,
) {
    let chars = ["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"]
    let x = 0;

    function getColoredText() {
        switch (level) {
            case "info":
                return chalk.blueBright(text)
            case "warn":
                return chalk.yellowBright(text)
            case "error":
                return chalk.redBright(text)
            case "success":
                return chalk.greenBright(text)
            default:
                return text
        }
    }

    return loading({ text: getColoredText(), color: "blue", interval: delay, frames: chars }).start();

    // return setInterval(function () {
    //     // process.stdout.write("\r" + chalk.blueBright(chars[x++]) + " " + getColoredText());
    //     process.stdout.clearLine()
    //     // process.stdout.cursorTo(0)
    //     // process.stdout.moveCursor(0, 0)
    //     console.log(chalk.blueBright(chars[x++]) + " " + getColoredText())
    //     x = x % chars.length;
    // }, delay);
}