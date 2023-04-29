import { ChatGPTUnofficialProxyAPI, ChatGPTAPI } from 'chatgpt'
import { config } from 'dotenv'
import { ChatGPTAuthTokenService } from "chat-gpt-authenticator";

config()

export const chatgptApi = new ChatGPTAPI({
    apiKey: process.env.OPEN_API_KEY
})

export const chatgptProxyApi = await (async () => {
    // const chatGPTAuthTokenService = new ChatGPTAuthTokenService(
    //     process.env.OPENAI_EMAIL,
    //     process.env.OPENAI_PASSWORD
    // );
    // let token = await chatGPTAuthTokenService.getToken();
    return new ChatGPTUnofficialProxyAPI({
        accessToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJhcmppcy5jaGFrcmFib3J0eUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0sImh0dHBzOi8vYXBpLm9wZW5haS5jb20vYXV0aCI6eyJ1c2VyX2lkIjoidXNlci1DbnBmdmhnZTkyd0pmT0xIUEpyUTAyazUifSwiaXNzIjoiaHR0cHM6Ly9hdXRoMC5vcGVuYWkuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTAzNDMxNDcyOTYzODU4NzMwNjA5IiwiYXVkIjpbImh0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEiLCJodHRwczovL29wZW5haS5vcGVuYWkuYXV0aDBhcHAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY4MTY0MDgxOSwiZXhwIjoxNjgyODUwNDE5LCJhenAiOiJUZEpJY2JlMTZXb1RIdE45NW55eXdoNUU0eU9vNkl0RyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgbW9kZWwucmVhZCBtb2RlbC5yZXF1ZXN0IG9yZ2FuaXphdGlvbi5yZWFkIG9mZmxpbmVfYWNjZXNzIn0.rIwYN2d9RhrrOR8EFUqIL6UuOaRlbWZCMPhLFwlWAvZWKt0EwHZ2YcG3J1QexLzMZ_9Oel__OSaFLSaztztelV-5XT3njtsyHpz1RL0cnoK6iBTeuLgGAV4RxKY1f0r1xIcvYFKElTwtfLQMg6LLq0-2LsqV0psDvp8uIlBJlXmsup6DC8LYv9VOpL9th-n98yCWzOi63vFOH2f9GFpgPaHr85waBMzJMv8hw6bTUAa0L3lpaA919HuGXPshG0CsE9ZJ7FgtPRyjU60cqyHSw1PTI4Q0jeb5E0JebPnYvbFA9oP2xcS41svIwrZ-Z1pScLGSfY50E9rQW0yXTnhLoQ",
        // accessToken: token,
        // apiReverseProxyUrl: 'https://bypass.duti.tech/api/conversation'
        // apiReverseProxyUrl: 'https://bypass.churchless.tech/api/conversation'
    })
})()