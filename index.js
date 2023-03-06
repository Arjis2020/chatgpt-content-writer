import './polyfills/fetch-polyfill.js'
import { chatgptProxyApi, chatgptApi } from './chatgpt.js'
import { extractTemplateVars } from "./utils/extractTemplateVars.js";
import { init, sendDocument } from './telegram/index.js';
import { config } from 'dotenv'
import { synchronous } from './strategies/synchronous.js';
import { synchronousV2 } from './strategies/synchronousV2.js';
// import { synchronous } from "./strategies/synchronous.js";

config()

// (async () => {

//     synchronous({
//         timeoutMs,
//         failedTopics,
//         api: chatgptApi
//     })
// })()
const timeoutMs = 15 * 60 * 1000
const failedTopics = []

const asyncMimic = () => {
    return new Promise(resolve => {
        setTimeout(resolve, 15000)
    })
}

const onTextHandler = async (topics, chatId) => {
    await synchronousV2(topics, {
        timeoutMs,
        failedTopics,
        api: chatgptApi,
        onDocumentProcessed: sendDocument,
        chatId
    })
    // await asyncMimic()
}

init(onTextHandler)

// const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT

// const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true, filepath: false })

// let EXEC_STATES = {
//     IN_EXECUTION: 0,
//     IDLE: 1
// }

// let execState = EXEC_STATES.IDLE

// bot.onText(/\/requestcontent (.+(\n(.+))*)/, async (message, match) => {
//     try {
//         const topics = match[1]
//         var arrayMessage = topics.split('\n')
//         const parsedMessages = arrayMessage.map(msg => extractTemplateVars(msg))
//         console.log(parsedMessages)
//         await bot.sendMessage(message.chat.id,
//             `${String.fromCodePoint(0x2705)} Received request for generating content for ${arrayMessage.length} topic(s). This could take several minutes. Do not worry though, you will automatically receive all the content you requested with additional details as we go about generating the requested content.\n\nPlease understand that ChatGPT nor the bot is perfect by any means. There could be errors arising at any point in the generation process. Nevertheless, you will be notified and maximum content will be generated. If you think, the error has caused some of your content to go missing, please feel free to manually search for it and edit the content as you like.\n\nYou are smart enough ${String.fromCodePoint(0x1F609)}.`)

//         execState = EXEC_STATES.IN_EXECUTION

//         // await synchronous({
//         //     timeoutMs,
//         //     failedTopics,
//         //     api: chatgptApi
//         // })

//         execState = EXEC_STATES.IDLE
//     }
//     catch (err) {
//         await bot.sendMessage(message.chat.id, `${String.fromCodePoint(0x274C)} Request failed.\n\n${err.message}`)
//     }
// })

// bot.on('message', async (message) => {
//     await bot.sendMessage(message.chat.id, `I'm sorry, I'm not intelligent enough to understand plain messages. If you intended to request for content, please send it in the following format:\n\n/requestcontent<SPACE>{topics with every topic in a new line}\n\nFor example:\n/requestcontent Top 10 best food delivery companies in USA in 2023\nTop 10 best medical health agencies in USA in 2023.\n\nIn case, no one wished you a good day today,\nHave a good day!${String.fromCodePoint(0x1F496)}`)
// })





// const main2 = async () => {
//     const timeoutMs = 15 * 60 * 1000
//     const failedTopics = []

//     await Promise.all(topics.map(topic => createJob(topic, {
//         timeoutMs,
//         failedTopics,
//         api: chatgptProxyApi
//     })))
// }

// main()