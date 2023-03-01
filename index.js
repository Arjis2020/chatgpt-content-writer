import './polyfills/fetch-polyfill.js'
import './polyfills/dirname.js'
import { chatgptProxyApi, chatgptApi } from './chatgpt.js'
import { topics } from './topics.js'
import { createJob } from './utils/job.js'
import { synchronous } from './strategies/synchronous.js'

(async () => {
    const timeoutMs = 15 * 60 * 1000
    const failedTopics = []

    synchronous({
        timeoutMs,
        failedTopics,
        api: chatgptApi
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