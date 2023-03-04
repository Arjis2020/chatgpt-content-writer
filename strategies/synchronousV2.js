import { parseSearch } from '../searchParser.js'
import { buildTopic } from '../topics.js'
import { finishStep, printToConsole, step } from '../utils/logger.js'
// import { topics } from '../topics.js'
import fs from 'fs'
import path from 'path'
import { progressTracker, PROGRESS_STATE } from '../utils/progressTracker.js'
import { fileURLToPath } from 'url'
import { parseList } from '../utils/listParser.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = (filename) => path.join(__dirname, '../outputs', filename)

const delimiter = "---------------------------------------------------------------"

export const synchronousV2 = async (topics, options) => {
    const { timeoutMs, failedTopics, api, onDocumentProcessed, chatId } = options

    for await (let topic of topics) {
        let contents = []

        const filename = topic.searchTerm + ".txt"
        const filePath = file(filename)

        const searchTerms = parseSearch(topic)
        const humanReadableTopic = buildTopic(topic)

        if (!progressTracker.hasTopic(topic.id)) {
            // fs.writeFileSync(file(filename), '')
            // fs.appendFileSync(filePath, humanReadableTopic + "\n\n", 'utf-8')
            contents.push(humanReadableTopic)
        }

        let index = 1
        // let hasFailed = false
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
                var _items
                if (res.text.startsWith('1.')) {
                    res.text = res.text.split('\n')[1]
                    _items = res.text.trim().split('\n').map(i => {
                        const value = i.split(/^\d+./)[1].trim()
                        return value
                    })
                }
                else {
                    try {
                        _items = parseList(res.text)
                    }
                    catch (err) {
                        progressTracker.track(topic.id, String(index++), PROGRESS_STATE.FAILED)
                        printToConsole("Skipping search due to error for : " + search, 'warn')
                        failedTopics.push(topic)
                        // hasFailed = true
                        contents.push(search + "\n")
                        continue
                    }
                }
                let subContents = []
                subContents.push(`Here are the ${humanReadableTopic}`)
                let listIndex = 1
                for await (let item of _items) {
                    const searchTermInDetail = `describe in detail ${item.toLowerCase()} company in 200 words`
                    const subStep = step("\tCurrently searching for :", searchTermInDetail);
                    const detailedRes = await api.sendMessage(searchTermInDetail, {
                        timeoutMs
                    })
                    // fs.appendFileSync(filePath, detailedRes.text.trim() + `\n${delimiter}\n`, 'utf-8')
                    subContents.push(`${item} - ` + detailedRes.text.trim())
                    finishStep(subStep)
                    printToConsole(`\t${listIndex++}. Done with : ` + searchTermInDetail, 'success')
                }
                contents.push([subContents[0], subContents.slice(1).join(`\n${delimiter}\n`)].join('\n\n'))
                progressTracker.track(topic.id, String(index++))
                continue
            }
            else {
                // fs.appendFileSync(filePath, res.text.trim() + `\n${delimiter}\n`, 'utf-8')
                contents.push(`${search}\n\n` + res.text.trim())
                printToConsole("Done with : " + search, 'success')
            }
            progressTracker.track(topic.id, String(index++))
        }
        // if (!hasFailed) {
        if (!progressTracker.isComplete(topic.id, index)) {
            try {
                const telegramStep = step('Topic build success.', `Sending ${filename} via telegram...`)
                fs.writeFileSync(filePath, contents.join(`\n${delimiter}\n`), 'utf-8')
                // await telegram.sendDocument(filename)
                await onDocumentProcessed(filePath, chatId)
                // fs.unlinkSync(file(filename))
                progressTracker.track(topic.id, index++)
                finishStep(telegramStep)
                printToConsole(`Sent ${filename} successfully`, 'success')
            }
            catch (err) {
                console.log(err.toString())
                printToConsole(`Skipping sending ${filename} via telegram due to error!`, 'warn')
                progressTracker.track(topic.id, index++, PROGRESS_STATE.FAILED)
                continue
            }
        }
        else {
            printToConsole(`Skipping sending ${filename} as it was already sent`, 'warn')
            continue
        }
        console.log('\n\n')
    }
    printToConsole("Succeeded : ", 'success', topics.length - failedTopics.length)
    printToConsole("Failed : ", failedTopics.length > 0 ? 'error' : 'success', failedTopics.length)
    failedTopics.forEach(topic => {
        printToConsole(topic.searchTerm, 'error')
    })
}