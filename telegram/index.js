import TelegramBot from 'node-telegram-bot-api'
import { config } from 'dotenv'
import fs from 'fs'
// import { fileURLToPath } from 'url';
// import path from 'path';
import { analyzeFile } from '../utils/analyzeFile.js';
import { extractTemplateVars } from '../utils/extractTemplateVars.js';
import { printToConsole } from '../utils/logger.js';

config()

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const chatId = 1486538799
const personalChatId = 1972126908

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT
var bot = undefined

export const init = async (onTextHandler) => {
    if (!onTextHandler || typeof onTextHandler !== 'function') throw new Error("onTextHandler must be passed and it should be a function!")

    bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true, filepath: false })

    printToConsole('Bot is online! Listening for messages / commands...', 'success')

    let EXEC_STATES = {
        IN_EXECUTION: 0,
        IDLE: 1
    }

    // bot.on('message', async (message) => {
    //     await bot.sendMessage(message.chat.id, `I'm sorry, I'm not intelligent enough to understand plain messages. If you intended to request for content, please send it in the following format:\n\n/requestcontent<SPACE>{topics with every topic in a new line}\n\nFor example:\n/requestcontent Top 10 best food delivery companies in USA in 2023\nTop 10 best medical health agencies in USA in 2023.\n\nIn case, no one wished you a good day today,\nHave a good day!${String.fromCodePoint(0x1F496)}`)
    // })

    let execState = {}

    bot.onText(/\/requestcontent (.+(\n(.+))*)/, async (message, match) => {
        try {
            const chatId = message.chat.id

            if (typeof execState[chatId] === 'undefined' || execState[chatId] === EXEC_STATES.IDLE) {
                const topics = match[1]
                var arrayMessage = topics.split('\n')
                const parsedMessages = arrayMessage.map(msg => extractTemplateVars(msg))

                // console.log(parsedMessages)
                await bot.sendMessage(message.chat.id,
                    `${String.fromCodePoint(0x2705)} Received request for generating content for ${arrayMessage.length} topic(s). This could take several minutes. Do not worry though, you will automatically receive all the content you requested with additional details as we go about generating the requested content.\n\nPlease understand that ChatGPT nor the bot is perfect by any means. There could be errors arising at any point in the generation process. Nevertheless, you will be notified and maximum content will be generated. If you think, the error has caused some of your content to go missing, please feel free to manually search for it and edit the content as you like.\n\nYou are smart enough ${String.fromCodePoint(0x1F609)}.`)

                execState[chatId] = EXEC_STATES.IN_EXECUTION

                await onTextHandler(parsedMessages, chatId)

                execState[chatId] = EXEC_STATES.IDLE

                await bot.sendMessage(chatId, 'Hope you liked the results. Come back again when you need me!')
            }
            else {
                await bot.sendMessage(chatId, "The bot is currently busy processing a previous request sent by you. Please come back later.")
            }
        }
        catch (err) {
            await bot.sendMessage(message.chat.id, `${String.fromCodePoint(0x274C)} Request failed.\n\n${err.message}`)
        }
    })


}

export const sendDocument = async (chatId, details) => {
    if (!bot || !bot.sendDocument) throw new Error('Telegram Bot was not initialized properly! Have you called init() before?')

    const { buffer, filename } = details
    // const buffer = fs.readFileSync(filepath)
    const caption = analyzeFile(buffer)

    console.log(caption)

    const send = async (chatId) => await bot.sendDocument(chatId, buffer, {
        caption
    }, {
        filename,
        contentType: 'text/plain'
    })

    try {
        if (chatId !== personalChatId)
            await Promise.all([send(chatId), send(personalChatId)])
        else
            await send(chatId)
    }
    catch (err) {
        console.error(err.toString())
    }
}