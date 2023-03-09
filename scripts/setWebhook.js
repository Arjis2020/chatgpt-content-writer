import axios from "axios"
import { config } from "dotenv"
config();

(async () => {
    if (process.env.TELEGRAM_BOT && process.env.CYCLIC_URL) {
        const { data } = await axios.get(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT}/setWebhook?url=${process.env.CYCLIC_URL}`)
        console.log(data)
    }
    else {
        console.log("You probably are building this project for the first time. Nevertheless, setup the required .env variables for your environment and re-run this script / build.")
    }
})()    