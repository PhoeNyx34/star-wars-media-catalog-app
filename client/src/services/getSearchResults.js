const searchMedia = (media, query) => {
    const searchedMedia = media.filter(item => {
        let values = item.search
        for (const searchTerm of query) {
            for (let i = 0; i < values.length; i++) {
                if (values[i].toLowerCase().includes(searchTerm.toLowerCase())) {
                    return item
                }
            }
        }
    })
    return searchedMedia
}

export default searchMedia