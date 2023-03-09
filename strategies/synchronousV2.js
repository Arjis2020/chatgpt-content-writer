import { parseSearch } from '../searchParser.js'
import { buildTopic } from '../topics.js'
// import { finishStep, printToConsole, step } from '../utils/logger.js'
// import { progressTracker, PROGRESS_STATE } from '../utils/progressTracker.js'
import { parseList } from '../utils/listParser.js'

const delimiter = "---------------------------------------------------------------"

export const synchronousV2 = async (topics, options) => {
    const { timeoutMs, failedTopics, api, onDocumentProcessed, chatId } = options

    for await (let topic of topics) {
        let contents = []

        const filename = topic.searchTerm + ".txt"

        const searchTerms = parseSearch(topic)
        const humanReadableTopic = buildTopic(topic)

        // if (!progressTracker.hasTopic(topic.id)) {
        contents.push(humanReadableTopic)
        // }

        // let index = 1
        for await (let { searchFor: search, out } of searchTerms) {
            // if (progressTracker.isComplete(topic.id, index)) {
            //     console.log("Skipping search as it is complete for : " + search, 'warn')
            //     index++
            //     continue
            // }
            console.log("Currently searching for :", search);
            let res = await api.sendMessage(search, {
                timeoutMs
            })
            // finishStep(masterStep)
            if (out === 'json') {
                // console.log(res.text)
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
                    // progressTracker.track(topic.id, String(index++), PROGRESS_STATE.FAILED)
                    console.log("Skipping search due to error for : " + search, 'warn')
                    failedTopics.push(topic)
                    contents.push(search + "\n")
                    continue
                }
                let subContents = []
                subContents.push(`Here are the ${humanReadableTopic}`)
                let listIndex = 1
                for await (let item of _items) {
                    const searchTermInDetail = `describe in detail ${item.toLowerCase()} company in 200 words`
                    console.log("\tCurrently searching for :", searchTermInDetail);
                    const detailedRes = await api.sendMessage(searchTermInDetail, {
                        timeoutMs
                    })
                    subContents.push(`${item} - ` + detailedRes.text.trim())
                    // finishStep(subStep)
                    console.log(`\t${listIndex++}. Done with : ` + searchTermInDetail)
                }
                contents.push([subContents[0], subContents.slice(1).join(`\n${delimiter}\n`)].join('\n\n'))
                // progressTracker.track(topic.id, String(index++))
                continue
            }
            else {
                contents.push(`${search}\n\n` + res.text.trim())
                console.log("Done with : " + search)
            }
            // progressTracker.track(topic.id, String(index++))
        }
        // if (!progressTracker.isComplete(topic.id, index)) {
            try {
                console.log('Topic build success.', `Sending ${filename} via telegram...`)
                await onDocumentProcessed(chatId, {
                    buffer: Buffer.from(contents.join(`\n${delimiter}\n`)),
                    filename
                })
                // progressTracker.track(topic.id, index++)
                // finishStep(telegramStep)
                console.log(`Sent ${filename} successfully`)
            }
            catch (err) {
                console.log(err.toString())
                console.log(`Skipping sending ${filename} via telegram due to error!`)
                // progressTracker.track(topic.id, index++, PROGRESS_STATE.FAILED)
                continue
            }
        // }
        // else {
        //     console.log(`Skipping sending ${filename} as it was already sent`, 'warn')
        //     continue
        // }
        console.log('\n\n')
    }
    console.log("Succeeded : ", 'success', topics.length - failedTopics.length)
    console.log("Failed : ", failedTopics.length > 0 ? 'error' : 'success', failedTopics.length)
    failedTopics.forEach(topic => {
        console.log(topic.searchTerm, 'error')
    })
}