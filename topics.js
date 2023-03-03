import { v4 as uuidV4 } from 'uuid'

export const topics = [
    {
        id: "1",
        searchTerm: "Home Security solutions companies",
        year: "2023",
        location: "usa",
        criteria: "top 10"
    },
    {
        id: "2",
        searchTerm: "Home Furnishings Retailers companies",
        year: "2023",
        location: "usa",
        criteria: "top 10"
    },
    {
        id: "3",
        searchTerm: "Home Improvement Products & Services Retailers companies",
        year: "2023",
        location: "usa",
        criteria: "top 10"
    },
    {
        id: "4",
        searchTerm: "Homebuilding companies",
        year: "2023",
        location: "usa",
        criteria: "top 10"
    },
    {
        id: "5",
        searchTerm: "Horticulture companies",
        year: "2023",
        location: "usa",
        criteria: "top 10"
    },
    {
        id: "6",
        searchTerm: "Hospitality companies",
        year: "2023",
        location: "usa",
        criteria: "top 10"
    },
    {
        id: "7",
        searchTerm: "Hotel companies",
        year: "2023",
        location: "usa",
        criteria: "top 10"
    },
    {
        id: "8",
        searchTerm: "Housing companies",
        year: "2023",
        location: "usa",
        criteria: "top 10"
    },
    {
        id: "9",
        searchTerm: "Industrial Design companies",
        year: "2023",
        location: "usa",
        criteria: "top 10"
    },
    {
        id: "10",
        searchTerm: "Industrial Energy companies",
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