import { ChatGPTUnofficialProxyAPI, ChatGPTAPI } from 'chatgpt'
import { config } from 'dotenv'
import { topics, buildTopic } from './topics.js'
import { parseSearch } from './searchParser.js'
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = (filename) => path.join(__dirname, './outputs', filename)

const main = async () => {
    const chatGptApi = new ChatGPTAPI({
        apiKey: process.env.OPEN_API_KEY
    })
    const api = new ChatGPTUnofficialProxyAPI({
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
            console.log("---> Currently searching for : ", search);
            const res = await chatGptApi.sendMessage(search, {
                timeoutMs
            })
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
                    console.log("---> Skipping json search for ", search)
                    failedTopics.push(topic)
                    continue
                }
                for await (let item of _items) {
                    const searchTermInDetail = `describe in detail ${item.toLowerCase()} company in 200 words`
                    console.log("\t---> Currently searching for : ", searchTermInDetail);
                    const detailedRes = await chatGptApi.sendMessage(searchTermInDetail, {
                        timeoutMs
                    })
                    fs.appendFileSync(filePath, detailedRes.text + "\n---------------------------------------------------------------\n", 'utf-8')
                    console.log("\t---> Done with : ", searchTermInDetail)
                }
                continue
            }
            else {
                fs.appendFileSync(filePath, res.text + "\n---------------------------------------------------------------\n", 'utf-8')
                console.log("---> Done with : ", search)
            }
            // successTopics.push(topic)
        }
        console.log('\n\n')
    }
    console.log("Succeeded : ", topics.length - failedTopics.length)
    console.error("Failed : ", failedTopics.length)
    failedTopics.forEach(topic => {
        console.error("---->", topic.searchTerm)
    })
}

main()