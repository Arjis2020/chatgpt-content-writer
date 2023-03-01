import { step, printToConsole } from "../utils/logger.js";

(async () => {
    await step('Currently searching for : Top 10 finance companies in usa in 2023', 'info')
    printToConsole('Done searching for : Top 10 finance companies in usa in 2023', 'success')

    await step('Currently searching for : Top 10 gaming companies in usa in 2023', 'info')
    printToConsole('Done searching for : Top 10 gaming companies in usa in 2023', 'success')

    await step('Currently searching for : Top 10 fashion companies in usa in 2023', 'info')
    printToConsole('Done searching for : Top 10 fashion companies in usa in 2023', 'success')

    await step('Currently searching for : Top 10 electrical companies in usa in 2023', 'info')
    printToConsole('Skipped search phase due to error : list 10 electrical companies in usa in 2023 without detail', 'warn')

    await step('Currently searching for : Top 10 IT companies in usa in 2023', 'info')
    printToConsole('Done searching for : Top 10 IT companies in usa in 2023', 'success')

    console.log()
    printToConsole('Success: ', 'success', 4)
    printToConsole('Failed: ', 'error', 1)
})()