import { v4 as uuidV4 } from 'uuid'

export const topics = [
    // {
    //     searchTerm: "employment services",
    //     year: "2023",
    //     location: "usa",
    //     criteria: "top 10"
    // },
    // {
    //     searchTerm: "enterprise mobility",
    //     year: "2023",
    //     location: "usa",
    //     criteria: "top 10"
    // },
    // {
    //     searchTerm: "entertainment companies",
    //     year: "2023",
    //     location: "usa",
    //     criteria: "top 10"
    // },
    // {
    //     searchTerm: "environmental services and equipment companies",
    //     year: "2023",
    //     location: "usa",
    //     criteria: "top 10"
    // },
    // {
    //     searchTerm: "Event Management Companies",
    //     year: "2023",
    //     location: "usa",
    //     criteria: "top 10"
    // },
    // {
    //     searchTerm: "Experiential Travel Companies",
    //     year: "2023",
    //     location: "usa",
    //     criteria: "top 10"
    // },
    // {
    //     searchTerm: "Facility Management Companies",
    //     year: "2023",
    //     location: "usa",
    //     criteria: "top 10"
    // },
    // {
    //     searchTerm: "Fan Merchandise Companies",
    //     year: "2023",
    //     location: "usa",
    //     criteria: "top 10"
    // },
    // {
    //     searchTerm: "Fantasy Sports Companies",
    //     year: "2023",
    //     location: "usa",
    //     criteria: "top 10"
    // },
    // {
    //     searchTerm: "Fashion Companies",
    //     year: "2023",
    //     location: "usa",
    //     criteria: "top 10"
    // },
    // {
    //     searchTerm: "Fashion Technology Companies",
    //     year: "2023",
    //     location: "usa",
    //     criteria: "top 10"
    // },
    // {
    //     searchTerm: "Fintech Companies",
    //     year: "2023",
    //     location: "usa",
    //     criteria: "top 10"
    // },
    // {
    //     searchTerm: "Fishery Companies",
    //     year: "2023",
    //     location: "usa",
    //     criteria: "top 10"
    // },
    {
        id: "7815b22b-0a38-4316-bd40-6a68dbb6695b",
        searchTerm: "Food Processing Companies",
        year: "2023",
        location: "usa",
        criteria: "top 10"
    },
    {
        id: "6aee089b-5f0a-4424-a176-e480743ce2de",
        searchTerm: "Best ERP Companies",
        year: "2023",
        location: "usa",
        criteria: "top 10"
    },
].map(topic => {
    const keys = Object.keys(topic)
    let _topic = {}
    keys.forEach(key => {
        _topic[key] = topic[key].toLowerCase()
        // _topic.id = uuidV4()
    })
    return _topic
})

export const buildTopic = (topic) => {
    const { criteria, location, year, searchTerm } = topic
    return `${criteria} ${searchTerm} in ${location} in ${year}`
}