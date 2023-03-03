import './polyfills/fetch-polyfill.js'
import { chatgptProxyApi, chatgptApi } from './chatgpt.js'
import { synchronous } from './strategies/synchronous.js'

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