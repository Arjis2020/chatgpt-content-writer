const format = "\n\n(.+(\n(.+))*)"
const string = `As an AI language model, I do not have access to real-time data and trends, but here is a list of top 10 food delivery companies in the USA based on their popularity and market share as of my knowledge cutoff in 2021:

1.Uber Eats
2.Grubhub
3.DoorDash
4.Postmates
5.Instacart
6.Caviar
7.Seamless
8.EatStreet
9.Delivery.com
10.Zomato

Please note that this list may vary depending on various factors such as regional preferences, market conditions, and the ever-changing landscape of the food delivery industry.`
const [, parsed] = new RegExp(format).exec(string)
let _items = parsed.split('\n')
_items = _items.map(i => {
    const value = i.split(/^\d+./)[1].trim().toLowerCase()
    return value
})
console.log(_items)