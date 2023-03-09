import TelegramBot from 'node-telegram-bot-api'
import { config } from 'dotenv'
import { analyzeFile } from '../utils/analyzeFile.js';
import { extractTemplateVars } from '../utils/extractTemplateVars.js';
import { Bot, webhookCallback, InputFile } from 'grammy'
import express from 'express'
import { acknowledgeMessage } from '../utils/constants.js';
// import { printToConsole } from '../utils/logger.js';

config()

// const chatId = 1486538799
const personalChatId = 1972126908

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT
var bot = undefined

export const init = async (onTextHandler) => {
    // if (!onTextHandler || typeof onTextHandler !== 'function') throw new Error("onTextHandler must be passed and it should be a function!")

    // bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true, filepath: false })
    bot = new Bot(TELEGRAM_BOT_TOKEN)

    console.log('Bot is online! Listening for messages / commands...')

    let EXEC_STATES = {
        IN_EXECUTION: 0,
        IDLE: 1
    }

    // bot.on('message', async (message) => {
    //     await bot.sendMessage(message.chat.id, `I'm sorry, I'm not intelligent enough to understand plain messages. If you intended to request for content, please send it in the following format:\n\n/requestcontent<SPACE>{topics with every topic in a new line}\n\nFor example:\n/requestcontent Top 10 best food delivery companies in USA in 2023\nTop 10 best medical health agencies in USA in 2023.\n\nIn case, no one wished you a good day today,\nHave a good day!${String.fromCodePoint(0x1F496)}`)
    // })

    let execState = {}

    // bot.onText(/\/requestcontent (.+(\n(.+))*)/, async (message, match) => {
    //     try {
    //         const chatId = message.chat.id

    //         if (typeof execState[chatId] === 'undefined' || execState[chatId] === EXEC_STATES.IDLE) {
    //             const topics = match[1]
    //             var arrayMessage = topics.split('\n')
    //             const parsedMessages = arrayMessage.map(msg => extractTemplateVars(msg))

    //             // console.log(parsedMessages)
    //             await bot.sendMessage(message.chat.id,
    //                 )

    //             execState[chatId] = EXEC_STATES.IN_EXECUTION

    //             await onTextHandler(parsedMessages, chatId)

    //             execState[chatId] = EXEC_STATES.IDLE

    //             await bot.sendMessage(chatId, 'Hope you liked the results. Come back again when you need me!')
    //         }
    //         else {
    //             await bot.sendMessage(chatId, "The bot is currently busy processing a previous request sent by you. Please come back later.")
    //         }
    //     }
    //     catch (err) {
    //         await bot.sendMessage(message.chat.id, `${String.fromCodePoint(0x274C)} Request failed.\n\n${err.message}`)
    //     }
    // })

    bot.command('requestcontent', async (ctx) => {
        try {
            const chatId = ctx.chat.id

            if (typeof execState[chatId] === 'undefined' || execState[chatId] === EXEC_STATES.IDLE) {
                const topics = ctx.match
                var arrayMessage = topics.split('\n')
                const parsedMessages = arrayMessage.map(msg => extractTemplateVars(msg))

                // console.log(parsedMessages)
                await ctx.reply(
                    message.chat.id,
                    acknowledgeMessage
                )

                execState[chatId] = EXEC_STATES.IN_EXECUTION

                await onTextHandler(parsedMessages, chatId)

                execState[chatId] = EXEC_STATES.IDLE

                await ctx.reply(chatId, 'Hope you liked the results. Come back again when you need me!')
            }
            else {
                await ctx.reply(chatId, "The bot is currently busy processing a previous request sent by you. Please come back later.")
            }
        }
        catch (err) {
            await ctx.reply(message.chat.id, `${String.fromCodePoint(0x274C)} Request failed.\n\n${err.message}`)
        }
    })

    if (process.env.NODE_ENV === 'production') {
        const app = express()

        const PORT = process.env.PORT || 3000

        app.use(express.json())
        app.use(webhookCallback(bot, 'express'))

        app.listen(PORT, () => `Server started on port ${PORT}`)
    }
    else {
        await bot.start()
    }
}

export const sendDocument = async (chatId, details) => {
    if (!bot || !bot.sendDocument) throw new Error('Telegram Bot was not initialized properly! Have you called init() before?')

    const { buffer, filename } = details
    const caption = analyzeFile(buffer)

    console.log(caption)

    const send = async (chatId) => await bot.api.sendDocument(chatId, new InputFile(buffer, filename))

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