// import { extractTemplateVars } from "../utils/extractTemplateVars.js";
// import TelegramBot from 'node-telegram-bot-api'
// import { config } from 'dotenv'
// import { synchronous } from "../strategies/synchronous.js";

// config()

// const chatId = 1486538799
// const personalChatId = 1972126908

// const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT

// const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true, filepath: false })

// bot.onText(/\/requestcontent (.+(\n(.+))*)/, async (message, match) => {
//     try {
//         const topics = match[1]
//         var arrayMessage = topics.split('\n')
//         const parsedMessages = arrayMessage.map(msg => extractTemplateVars(msg))
//         console.log(parsedMessages)
//         await bot.sendMessage(message.chat.id, 
//         `${String.fromCodePoint(0x2705)} Received request for generating content for ${arrayMessage.length} topic(s). This could take several minutes. Do not worry though, you will automatically receive all the content you requested with additional details as we go about generating the requested content.\n\nPlease understand that ChatGPT nor the bot is perfect by any means. There could be errors arising at any point in the generation process. Nevertheless, you will be notified and maximum content will be generated. If you think, the error has caused some of your content to go missing, please feel free to manually search for it and edit the content as you like.\n\nYou are smart enough ${String.fromCodePoint(0x1F609)}.`)
        
//         await synchronous({
//             timeoutMs, failedTopics, api
//         })
//     }
//     catch(err) {
//         await bot.sendMessage(message.chat.id, `${String.fromCodePoint(0x274C)} Request failed.\n\n${err.message}`)
//     }
// })
