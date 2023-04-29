process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
import './polyfills/fetch-polyfill.js'
import { chatgptApi, chatgptProxyApi } from './chatgpt.js'
// import { extractTemplateVars } from "./utils/extractTemplateVars.js";
import { init, sendDocument } from './telegram/index.js';
import { config } from 'dotenv'
// import { synchronous } from './strategies/synchronous.js';
import { synchronousV2 } from './strategies/synchronousV2.js';
// import chatgptV2 from './chatgpt-v2.js';

config()

const timeoutMs = 15 * 60 * 1000
const failedTopics = []

const onTextHandler = async (topics, chatId) => {
    await synchronousV2(topics, {
        timeoutMs,
        failedTopics,
        api: chatgptApi,
        onDocumentProcessed: sendDocument,
        chatId
    })
}

init(onTextHandler)