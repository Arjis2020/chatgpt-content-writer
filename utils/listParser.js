const format = "\n\n(.+(\n(.+))*)"

export const parseList = (string) => {
    try {
        const execRes = new RegExp(format).exec(string)
        const[, parsed] = execRes
        let _items = parsed.split('\n')
        _items = _items.map(i => {
            const value = i.split(/^\d+./)[1].trim().toLowerCase()
            return value
        })
        return _items
    }
    catch (err) {
        console.log(err)
        throw err
    }
}