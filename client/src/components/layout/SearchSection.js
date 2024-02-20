import React, { useState } from "react"
import { useCollapse } from "react-collapsed"

import searchMedia from "../../services/getSearchResults"

const SearchSection = ({media, setSearchResults}) => {
    const { getCollapseProps, getToggleProps } = useCollapse()
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

    const refreshPage = (event) => {
        location.href="/"
    }

    return (
        <div className="search-section">
            <div className="collapsible-header" {...getToggleProps()}>Search</div>
            <div {...getCollapseProps()}>
                <div className="collapsible-content grid-x">
                    <input type="search" className="cell large-12" placeholder="Enter search query" onChange={handleInputChange}/>
                    <button className="cell small-2 button" onClick={refreshPage}>Refresh</button>
                    <button className="cell small-2 button" onClick={submitSearch}>Search</button>
                </div>
            </div>
        </div>
    )
}

export default SearchSection