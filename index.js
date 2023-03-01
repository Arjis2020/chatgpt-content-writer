import './polyfills/fetch-polyfill.js'
import { ChatGPTUnofficialProxyAPI, ChatGPTAPI } from 'chatgpt'
import { config } from 'dotenv'
import { topics, buildTopic } from './topics.js'
import { parseSearch } from './searchParser.js'
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
import { finishStep, printToConsole, step } from './utils/logger.js'

config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = (filename) => path.join(__dirname, './outputs', filename)

const main = async () => {
    const chatGptApi = new ChatGPTAPI({
        apiKey: process.env.OPEN_API_KEY
    })
    const proxyApi = new ChatGPTUnofficialProxyAPI({
        accessToken: process.env.OPEN_API_ACCESS_TOKEN
    })

    const timeoutMs = 15 * 60 * 1000
    const failedTopics = []

    for await (let topic of topics) {
        const filename = topic.searchTerm + ".txt"
        const filePath = file(filename)

        const searchTerms = parseSearch(topic)
        const humanReadableTopic = buildTopic(topic)

        fs.writeFileSync(file(filename), '')
        fs.appendFileSync(filePath, humanReadableTopic + "\n", 'utf-8')

        for await (let { searchFor: search, out } of searchTerms) {
            const masterStep = step("Currently searching for :", search);
            const res = await proxyApi.sendMessage(search, {
                timeoutMs
            })
            finishStep(masterStep)
            if (out === 'json') {
                var _items = res.text.split('\n')
                try {
                    _items = _items.map(i => {
                        const value = i.split(/^\d+./)[1].trim()
                        return value
                    })
                }
                catch (err) {
                    console.log(res.text);
                    printToConsole("Skipping search due to error for : " + search, 'warn')
                    failedTopics.push(topic)
                    continue
                }
                for await (let item of _items) {
                    const searchTermInDetail = `describe in detail ${item.toLowerCase()} company in 200 words`
                    const subStep = step("\tCurrently searching for :", searchTermInDetail);
                    const detailedRes = await proxyApi.sendMessage(searchTermInDetail, {
                        timeoutMs
                    })
                    fs.appendFileSync(filePath, detailedRes.text + "\n---------------------------------------------------------------\n", 'utf-8')
                    finishStep(subStep)
                    printToConsole("\tDone with : " + searchTermInDetail, 'success')
                }
                continue
            }
            else {
                fs.appendFileSync(filePath, res.text + "\n---------------------------------------------------------------\n", 'utf-8')
                printToConsole("Done with : " + search, 'success')
            }
            // successTopics.push(topic)
        }
        console.log('\n\n')
    }
    printToConsole("Succeeded : " + topics.length - failedTopics.length, 'success')
    printToConsole("Failed : " + failedTopics.length, failedTopics.length > 0 ? 'error' : 'success')
    failedTopics.forEach(topic => {
        printToConsole(topic.searchTerm, 'error')
    })
}

main()