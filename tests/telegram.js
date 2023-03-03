import { extractTemplateVars } from "../utils/extractTemplateVars.js";
import TelegramBot from 'node-telegram-bot-api'
import { config } from 'dotenv'

config()

const chatId = 1486538799
const personalChatId = 1972126908

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true, filepath: false })

    // let message =
    // `
    // Top 10 Best Home Furnishings Retailers Companies In USA in 2023
    // Top 10 Best Home Improvement Products & Services Retailers Companies In USA in 2023
    // Top 10 Best Home Security solutions Companies In USA in 2023
    // Top 10 Best Homebuilding Companies In USA in 2023
    // Top 10 Best Horticulture Companies In USA in 2023
    // Top 10 Best Hospitality Companies In USA in 2023
    // Top 10 Best Hotel Companies In USA in 2023
    // Top 10 Best Housing Companies In USA in 2023
    // Top 10 Best Industrial Design Companies In USA in 2023
    // Top 10 Best Industrial Companies In USA in 2023
    // `

// let tests = message.split('\n')

// const parsedTests = tests.map(test => extractTemplateVars(test))
// console.log(parsedTests)

// let text = 'hi'
// console.log(extractTemplateVars(text))

bot.onText(/\/requestcontent (.+(\n(.+))*)/, async (message, match) => {
    try {
        const topics = match[1]
        var arrayMessage = topics.split('\n')
        const parsedMessages = arrayMessage.map(msg => extractTemplateVars(msg))
        console.log(parsedMessages)
        await bot.sendMessage(message.chat.id, 
        `${String.fromCodePoint(0x2705)} Received request for generating content for ${arrayMessage.length} topic(s). This could take several minutes. Do not worry though, you will automatically receive all the content you requested with additional details as we go about generating the requested content.\n\nPlease understand that ChatGPT nor the bot is perfect by any means. There could be errors arising at any point in the generation process. Nevertheless, you will be notified and maximum content will be generated. If you think, the error has caused some of your content to go missing, please feel free to manually search for it and edit the content as you like.\n\nYou are smart enough ${String.fromCodePoint(0x1F609)}.`)
    }
    catch(err) {
        await bot.sendMessage(message.chat.id, `${String.fromCodePoint(0x274C)} Request failed.\n\n${err.message}`)
    }
})

// bot.on('message', async (message) => {
    // try {
    //     var arrayMessage = message.text.split('\n')
    //     const parsedMessages = arrayMessage.map(msg => extractTemplateVars(msg))
    //     console.log(parsedMessages)
    //     await bot.sendMessage(message.chat.id, 
    //     `
    //     Received request for generating content for ${arrayMessage.length} topic(s). This could take several minutes. Do not worry though, you will automatically receive all the content you requested with additional details as we go about generating the requested content. 
        
    //     Please understand that ChatGPT nor the bot is perfect by any means. There could be errors arising at any point in the generation process. Nevertheless, you will be notified and maximum content will be generated. If you think, the error has caused some of your content to go missing, please feel free to manually search for it and edit the content as you like. 
        
    //     You are smart enough \xF0\x9F\x98\x89.
    //     `)
    // }
    // catch(err) {
    //     await bot.sendMessage(message.chat.id, err.message)
    // }
// })
