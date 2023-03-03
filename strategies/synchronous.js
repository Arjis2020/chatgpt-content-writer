import { parseSearch } from '../searchParser.js'
import { buildTopic } from '../topics.js'
import { finishStep, printToConsole, step } from '../utils/logger.js'
import { topics } from '../topics.js'
import fs from 'fs'
import path from 'path'
import { progressTracker, PROGRESS_STATE } from '../utils/progressTracker.js'
import { fileURLToPath } from 'url'
import telegram from '../telegram/index.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = (filename) => path.join(__dirname, '../outputs', filename)

const delimiter = "---------------------------------------------------------------"

export const synchronous = async (options) => {
    const { timeoutMs, failedTopics, api } = options

    for await (let topic of topics) {
        const filename = topic.searchTerm + ".txt"
        const filePath = file(filename)

        const searchTerms = parseSearch(topic)
        const humanReadableTopic = buildTopic(topic)

        if (!progressTracker.hasTopic(topic.id)) {
            fs.writeFileSync(file(filename), '')
            fs.appendFileSync(filePath, humanReadableTopic + "\n\n", 'utf-8')
        }

        let index = 1
        let hasFailed = false
        for await (let { searchFor: search, out } of searchTerms) {
            if (progressTracker.isComplete(topic.id, index)) {
                printToConsole("Skipping search as it is complete for : " + search, 'warn')
                index++
                continue
            }
            // fs.appendFileSync(filePath, search + "\n\n", 'utf-8')
            const masterStep = step("Currently searching for :", search);
            let res = await api.sendMessage(search, {
                timeoutMs
            })
            finishStep(masterStep)
            if (out === 'json') {
                console.log(res.text);
                if(!res.text.startsWith('1.')) {
                    res.text = res.text.split('\n')[1]
                }
                var _items = res.text.trim().split('\n')
                console.log("Modified")
                console.log(res.text)
                try {
                    _items = _items.map(i => {
                        const value = i.split(/^\d+./)[1].trim()
                        return value
                    })
                }
                catch (err) {
                    progressTracker.track(topic.id, String(index++), PROGRESS_STATE.FAILED)
                    printToConsole("Skipping search due to error for : " + search, 'warn')
                    failedTopics.push(topic)
                    hasFailed = true
                    continue
                }
                let listIndex = 1
                for await (let item of _items) {
                    const searchTermInDetail = `describe in detail ${item.toLowerCase()} company in 200 words`
                    const subStep = step("\tCurrently searching for :", searchTermInDetail);
                    const detailedRes = await api.sendMessage(searchTermInDetail, {
                        timeoutMs
                    })
                    fs.appendFileSync(filePath, detailedRes.text.trim() + `\n${delimiter}\n`, 'utf-8')
                    finishStep(subStep)
                    printToConsole(`\t${listIndex++}. Done with : ` + searchTermInDetail, 'success')
                }
                progressTracker.track(topic.id, String(index++))
                continue
            }
            else {
                fs.appendFileSync(filePath, res.text.trim() + `\n${delimiter}\n`, 'utf-8')
                printToConsole("Done with : " + search, 'success')
            }
            progressTracker.track(topic.id, String(index++))
        }
        console.log('\n\n')
        if (!hasFailed) {
            try {
                const telegramStep = step('Topic build success.', `Sending ${filename} via telegram...`)
                await telegram.sendDocument(filename)
                finishStep(telegramStep)
                printToConsole(`Sent ${filename} successfully`, 'success')
            }
            catch (err) {
                console.log(err.toString())
                printToConsole(`Skipping sending ${filename} via telegram due to error!`, 'warn')
                continue
            }
        }
        else {
            printToConsole(`Skipping sending ${filename}.txt due to existing error while searching. Refer to the error above.`, 'warn')
            continue
        }
    }
    printToConsole("Succeeded : ", 'success', topics.length - failedTopics.length)
    printToConsole("Failed : ", failedTopics.length > 0 ? 'error' : 'success', failedTopics.length)
    failedTopics.forEach(topic => {
        printToConsole(topic.searchTerm, 'error')
    })
    process.exit(0)
}