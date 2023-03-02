import './polyfills/fetch-polyfill.js'
import { chatgptProxyApi, chatgptApi } from './chatgpt.js'
import { topics } from './topics.js'
import { createJob } from './utils/job.js'
import { synchronous } from './strategies/synchronous.js'

import { fileURLToPath } from 'url';
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
    const timeoutMs = 15 * 60 * 1000
    const failedTopics = []

    synchronous({
        timeoutMs,
        failedTopics,
        api: chatgptProxyApi
    })
})()

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