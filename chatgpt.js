import { ChatGPTUnofficialProxyAPI, ChatGPTAPI } from 'chatgpt'
import { config } from 'dotenv'

config()

export const chatgptApi = new ChatGPTAPI({
    apiKey: process.env.OPEN_API_KEY
})

export const chatgptProxyApi = new ChatGPTUnofficialProxyAPI({
    accessToken: process.env.OPEN_API_ACCESS_TOKEN,
    apiReverseProxyUrl: 'https://gpt.pawan.krd/backend-api/conversation'
})