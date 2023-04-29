import { parseSearch } from '../searchParser.js'
import { buildTopic } from '../topics.js'
import { finishStep, printToConsole, step } from '../utils/logger.js'
import { progressTracker, PROGRESS_STATE } from '../utils/progressTracker.js'
import { parseList } from '../utils/listParser.js'

const delimiter = "---------------------------------------------------------------"

export const synchronousV2 = async (topics, options) => {
    const { timeoutMs, failedTopics, api, onDocumentProcessed, chatId } = options

    for await (let topic of topics) {
        let contents = []

        const filename = topic.searchTerm + ".txt"
        // const filePath = file(filename)

        const searchTerms = parseSearch(topic)
        const humanReadableTopic = buildTopic(topic)

        if (!progressTracker.hasTopic(topic.id)) {
            contents.push(humanReadableTopic)
        }

        let index = 1
        for await (let { searchFor: search, out } of searchTerms) {
            if (progressTracker.isComplete(topic.id, index)) {
                printToConsole("Skipping search as it is complete for : " + search, 'warn')
                index++
                continue
            }
            const masterStep = step("Currently searching for :", search);
            let res = await api.sendMessage(search, {
                timeoutMs
            })
            finishStep(masterStep)
            if (out === 'json') {
                console.log(res.text)
                try {
                    var _items
                    if (res.text.startsWith('1.')) {
                        _items = res.text.trim().split('\n').map(i => {
                            const value = i.split(/^\d+./)[1].trim()
                            return value
                        })
                    }
                    else {
                        _items = parseList(res.text)
                    }
                }
                catch (err) {
                    progressTracker.track(topic.id, String(index++), PROGRESS_STATE.FAILED)
                    printToConsole("Skipping search due to error for : " + search, 'warn')
                    failedTopics.push(topic)
                    contents.push(search + "\n")
                    continue
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
                    subContents.push(`${item} - ` + detailedRes.text.trim())
                    finishStep(subStep)
                    printToConsole(`\t${listIndex++}. Done with : ` + searchTermInDetail, 'success')
                }
                contents.push([subContents[0], subContents.slice(1).join(`\n${delimiter}\n`)].join('\n\n'))
                progressTracker.track(topic.id, String(index++))
                continue
            }
            else {
                contents.push(`${search}\n\n` + res.text.trim())
                printToConsole("Done with : " + search, 'success')
            }
            progressTracker.track(topic.id, String(index++))
        }
        if (!progressTracker.isComplete(topic.id, index)) {
            try {
                const telegramStep = step('Topic build success.', `Sending ${filename} via telegram...`)
                // fs.writeFileSync(filePath, contents.join(`\n${delimiter}\n`), 'utf-8')
                await onDocumentProcessed(chatId, {
                    buffer: Buffer.from(contents.join(`\n${delimiter}\n`)),
                    filename
                })
                // fs.unlinkSync(file(filename)) // delete the file to conserve storage
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