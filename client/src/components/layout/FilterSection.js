import React, { useState } from "react"
import { useCollapse } from "react-collapsed"
import '../../assets/scss/main.scss'

// import searchMedia from "../../services/getSearchResults"

const FilterSection = ({media, setFilterResults}) => {
    const { getCollapseProps, getToggleProps } = useCollapse()
    const [filterParams, setFilterParams] = useState('')

    // const handleInputChange = (event) => {
    //     setSearchQuery(event.currentTarget.value)
    // }

    // const submitSearch = (event) => {
    //     event.preventDefault()
    //     let query = searchQuery.split(' ')
    //     const searchedMedia = searchMedia(media, query)
    //     if (searchedMedia.length === 0) {
    //         window.alert("Your search query did not return any results.")
    //     } else {
    //         setSearchResults(searchedMedia)
    //     }
    // }

    //media types
    const mediaTypes = [...new Set(media.map(media => {
        return media.type
    }))]
    const typeOptions = mediaTypes.map(type => {
        return <option value={type}>{type}</option>
    })

    //ratings
    const mediaRatings = [...new Set(media.map(media => {
        return media.rating
    }))]
    const ratingOptions = mediaRatings.map(rating => {
        return <option value={rating}>{rating}</option>
    })

    //eras
    const mediaEras = [...new Set(media.map(media => {
        return media.era
    }))]
    const eraOptions = mediaEras.map(era => {
        return <option value={era}>{era}</option>
    })

    const submitFilter = (event) => {
        event.preventDefault()
        console.log('filter')
    }

    const refreshPage = (event) => {
        location.href="/"
    }

    return (
        <div className="filter-section">
            <div className="collapsible-header" {...getToggleProps()}>Filter</div>
            <div {...getCollapseProps()}>
                <div className="collapsible-content">

                    <form id="filter-form" className="grid-x">
                        
                        {/* media type */}
                        <div className="cell small-3">
                            <label htmlFor="type">Media Type:</label>
                            <select id="type" name="type" className="filter-dropdown">
                                <option>-- Please select an option --</option>
                                {typeOptions}
                            </select>
                        </div>

                        {/* media style */}
                        <div className="cell small-3">
                            <label htmlFor="animated">Film Style:</label>
                            <select id="animated" name="animated" className="filter-dropdown">
                                <option>-- Please select an option --</option>
                                <option value="false">live-action</option>
                                <option value="true">animated</option>
                                <option value="lego">lego</option>
                            </select>
                        </div>

                        {/* media rating */}
                        <div className="cell small-3">
                            <label htmlFor="rating">Audience Rating:</label>
                            <select id="rating" name="rating" className="filter-dropdown">
                                <option>-- Please select an option --</option>
                                {ratingOptions}
                            </select>
                        </div>

                        {/* media universe */}
                        <div className="cell small-3">
                            <label htmlFor="rating">Star Wars Universe:</label>
                            <select id="canon" name="canon" className="filter-dropdown">
                                <option>-- Please select an option --</option>
                                <option value="true">canon</option>
                                <option value="false">extended universe</option>
                            </select>
                        </div>

                        {/* media era */}
                        <div className="cell small-3">
                            <label htmlFor="era">Star Wars Era:</label>
                            <select id="era" name="era" className="filter-dropdown">
                                <option>-- Please select an option --</option>
                                {eraOptions}
                            </select>
                        </div>

                    </form>

                    <div className="search-filter-buttons grid-x">
                        <button className="cell small-2 button" onClick={submitFilter}>Set Filters</button>
                        <button className="cell small-2 button" onClick={refreshPage}>Refresh</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterSection