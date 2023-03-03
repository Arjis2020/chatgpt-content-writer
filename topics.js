import { v4 as uuidV4 } from 'uuid'

export const topics = [
    // {
    //     id: "1",
    //     searchTerm: "Food Delivery Companies",
    //     year: "2023",
    //     location: "usa",
    //     criteria: "top 10"
    // },
    // {
    //     id: "2",
    //     searchTerm: "Foreign Exchange Companies",
    //     year: "2023",
    //     location: "usa",
    //     criteria: "top 10"
    // },
    // {
    //     id: "3",
    //     searchTerm: "Freight & Logistics Services Companies",
    //     year: "2023",
    //     location: "usa",
    //     criteria: "top 10"
    // },
    // {
    //     id: "4",
    //     searchTerm: "Handicraft Companies",
    //     year: "2023",
    //     location: "usa",
    //     criteria: "top 10"
    // },
    // {
    //     id: "5",
    //     searchTerm: "Health & Wellness Companies",
    //     year: "2023",
    //     location: "usa",
    //     criteria: "top 10"
    // },
    // {
    //     id: "6",
    //     searchTerm: "Healthcare IT Companies",
    //     year: "2023",
    //     location: "usa",
    //     criteria: "top 10"
    // },
    // {
    //     id: "7",
    //     searchTerm: "Healthcare Services Companies",
    //     year: "2023",
    //     location: "usa",
    //     criteria: "top 10"
    // },
    // {
    //     id: "8",
    //     searchTerm: "Healthcare Technology Companies",
    //     year: "2023",
    //     location: "usa",
    //     criteria: "top 10"
    // },
    // {
    //     id: "9",
    //     searchTerm: "Holiday Rentals Companies",
    //     year: "2023",
    //     location: "usa",
    //     criteria: "top 10"
    // },
    {
        id: "10",
        searchTerm: "Home Care Companies",
        year: "2023",
        location: "usa",
        criteria: "top 10"
    },
].map(topic => {
    const keys = Object.keys(topic)
    let _topic = {}
    keys.forEach(key => {
        _topic[key] = topic[key].toLowerCase()
    })
    return _topic
})

export const buildTopic = (topic) => {
    const { criteria, location, year, searchTerm } = topic
    return `${criteria} ${searchTerm} in ${location} in ${year}`
}