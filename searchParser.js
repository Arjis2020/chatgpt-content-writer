export const parseSearch = (topic) => {
    const { searchTerm, location, year } = topic
    const searchValues = [
        { searchFor: `Introduction to ${searchTerm} in ${location} in ${year} in 200 words`, out: 'txt' },
        { searchFor: `Importance to ${searchTerm} in ${location} in ${year} in 200 words`, out: 'txt' },
        // `All the top 10 ${searchTerm} in ${location} in ${year} with 200 words each`,
        { searchFor: `list top 10 ${searchTerm} in ${location} in ${year} without detail`, out: 'json' },
        { searchFor: `Conclusion of ${searchTerm} in ${location} in ${year} in 100 words`, out: 'txt' }
    ].map(search => {
        const term = search.searchFor
        return {
            ...search,
            searchFor: term.toLowerCase()
        }
    })

    return searchValues
}