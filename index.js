import './polyfills/fetch-polyfill.js'
import { chatgptProxyApi, chatgptApi } from './chatgpt.js'
import { init, sendDocument } from './telegram/index.js';
import { config } from 'dotenv'
import { synchronousV2 } from './strategies/synchronousV2.js';

config()

const timeoutMs = 15 * 60 * 1000
const failedTopics = []

const onTextHandler = async (topics, chatId) => {
    await synchronousV2(topics, {
        timeoutMs,
        failedTopics,
        api: process.env.NODE_ENV === 'production' ? chatgptApi : chatgptProxyApi,
        onDocumentProcessed: sendDocument,
        chatId
    })
}

init(onTextHandler)