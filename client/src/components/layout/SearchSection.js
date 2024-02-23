import React, { useState } from "react"

import searchMedia from "../../services/getSearchResults"

const SearchSection = ({media, setSearchResults}) => {
    const [searchQuery, setSearchQuery] = useState('')

    const handleInputChange = (event) => {
        setSearchQuery(event.currentTarget.value)
    }

    const submitSearch = (event) => {
        event.preventDefault()
        let query = searchQuery.split(' ')
        const searchedMedia = searchMedia(media, query)
        if (searchedMedia.length === 0) {
            window.alert("Your search query did not return any results.")
        } else {
            setSearchResults(searchedMedia)
        }
    }

    return (
        <div className="grid-x">
            <input id="search-form" type="search" className="cell large-12" placeholder="Enter search query" onChange={handleInputChange}/>
            <button className="cell large-2 button" onClick={submitSearch}>Search</button>
        </div>
    )
}

export default SearchSection