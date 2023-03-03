import TelegramBot from 'node-telegram-bot-api'
import { config } from 'dotenv'
import fs from 'fs'
import { fileURLToPath } from 'url';
import path from 'path';
import { analyzeFile } from '../utils/analyzeFile.js';

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
 */

const file = (filename) => path.join(__dirname, '../outputs', filename)

const sendDocument = async (filename) => {
    const buffer = fs.readFileSync(file(filename))
    const caption = analyzeFile(buffer)

    console.log(caption)
    
    const send = async (chatId) => await bot.sendDocument(chatId, buffer, {
        caption
    }, {
        filename,
        contentType: 'text/plain'
    })

    try {
        await Promise.all([send(chatId), send(personalChatId)])
    }
    catch (err) {
        console.error(err.toString())
    }
}

export default { sendDocument }