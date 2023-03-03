import TelegramBot from 'node-telegram-bot-api'
import { config } from 'dotenv'
import fs from 'fs'
import { fileURLToPath } from 'url';
import path from 'path';

config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chatId = 1486538799
const personalChatId = 1972126908

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true, filepath: false })

bot.on('message', (message) => {
    console.log(message.chat.id)
})

/**
 * @param {string} filename
 * @param {() => void} callback
 */

const file = (filename) => path.join(__dirname, '../outputs', filename)

const sendDocument = async (filename, callback) => {
    const buffer = fs.readFileSync(file(filename))

    try {
        await bot.sendDocument(chatId, buffer, {}, {
            filename,
            contentType: 'text/plain'
        })
        callback && callback()
    }
    catch (err) {
        console.error(err.toString())
    }
}

export default { sendDocument }