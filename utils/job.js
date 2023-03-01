import fs from 'fs'
import path from 'path'
import { parseSearch } from '../searchParser.js'
import { buildTopic } from '../topics.js'
import { finishStep, printToConsole, step } from './logger.js'

const file = (filename) => path.join(__dirname, '../outputs', filename)

export async function createJob(topic, options) {
    const { timeoutMs, failedTopics, api } = options

    // return new Promise(async resolve => {
    const filename = topic.searchTerm + ".txt"
    const filePath = file(filename)

    const searchTerms = parseSearch(topic)
    const humanReadableTopic = buildTopic(topic)

    fs.writeFileSync(file(filename), '')
    fs.appendFileSync(filePath, humanReadableTopic + "\n", 'utf-8')

    for await (let { searchFor: search, out } of searchTerms) {
        // const masterStep = step("Currently searching for :", search);
        printToConsole("Currently searching for :" + search, 'info');
        const res = await api.sendMessage(search, {
            timeoutMs
        })
        // finishStep(masterStep)
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
                // const subStep = step("\tCurrently searching for :", searchTermInDetail);
                printToConsole("\tCurrently searching for :" + searchTermInDetail, 'info');
                const detailedRes = await api.sendMessage(searchTermInDetail, {
                    timeoutMs
                })
                fs.appendFileSync(filePath, detailedRes.text + "\n---------------------------------------------------------------\n", 'utf-8')
                // finishStep(subStep)
                printToConsole("\tDone with : " + searchTermInDetail, 'success')
            }
            continue
        }
        else {
            fs.appendFileSync(filePath, res.text + "\n---------------------------------------------------------------\n", 'utf-8')
            printToConsole("Done with : " + search, 'success')
        }
    }
    console.log('\n\n')
    // resolve()
    // })
} 