export const analyzeFile = (buffer) => {
    let fileContents
    if(Buffer.isBuffer(buffer)) {
        fileContents = buffer.toString('utf-8')
    }

    const words = fileContents.split(' ').length.toLocaleString()
    return `${words} words`
}