import fs from 'fs'
import { fileURLToPath } from 'url';
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PROGRESS_STATE = {
    FAILED: 0,
    PASSED: 1
}

const file = (filename) => path.join(__dirname, '..', filename)
const filePath = file('.progress.json')

export const progressTracker = {
    track: (id, step, progress_state = PROGRESS_STATE.PASSED) => {
        const savedProgress = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        let progress = {
            ...savedProgress[id],
            [step]: Boolean(progress_state)
        }

        savedProgress[id] = progress
        fs.writeFileSync(filePath, JSON.stringify(savedProgress, null, 4), 'utf-8')
    },
    hasTopic: function (id) {
        const savedProgress = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        return id in savedProgress
    },
    isComplete: (id, step) => {
        const savedProgress = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        return (id in savedProgress) && (step in savedProgress[id]) && (savedProgress[id][step])
    },
}