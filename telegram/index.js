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
    if (!onTextHandler || typeof onTextHandler !== 'function') throw new Error("onTextHandler must be passed and it should be a function!")
    bot = new Bot(TELEGRAM_BOT_TOKEN)

    console.log('Bot is online! Listening for messages / commands...')

    let EXEC_STATES = {
        IN_EXECUTION: 0,
        IDLE: 1
    }

    let execState = {}

    bot.command('requestcontent', async (ctx) => {
        const chatId = ctx.chat.id
        try {
            if (typeof execState[chatId] === 'undefined' || execState[chatId] === EXEC_STATES.IDLE) {
                const topics = ctx.match
                var arrayMessage = topics.split('\n')
                const parsedMessages = arrayMessage.map(msg => extractTemplateVars(msg))

                // console.log(parsedMessages)
                await ctx.reply(
                    acknowledgeMessage(arrayMessage)
                )

                execState[chatId] = EXEC_STATES.IN_EXECUTION

                await onTextHandler(parsedMessages, chatId)

                execState[chatId] = EXEC_STATES.IDLE

                await ctx.reply('Hope you liked the results. Come back again when you need me!')
            }
            else {
                await ctx.reply("The bot is currently busy processing a previous request sent by you. Please come back later.")
            }
        }
        catch (err) {
            await ctx.reply(`${String.fromCodePoint(0x274C)} Request failed.\n\n${err.message}`)
        }
    })

    if (process.env.NODE_ENV === 'production') {
        const app = express()

        const PORT = process.env.PORT || 9000

        app.use(express.json())
        app.use(webhookCallback(bot, 'express'))

        app.listen(PORT, () => `Server started on port ${PORT}`)
    }
    else {
        await bot.start()
    }
}

export const sendDocument = async (chatId, details) => {
    if (!bot || !bot.api.sendDocument) throw new Error('Telegram Bot was not initialized properly! Have you called init() before?')

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