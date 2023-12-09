import React, { useState } from "react"
import { useCollapse } from "react-collapsed"
import '../../assets/scss/main.scss'

const FilterSection = ({media, setFilterResults}) => {
    const { getCollapseProps, getToggleProps } = useCollapse()
    const [filterParams, setFilterParams] = useState({})

    const handleInputChange = (event) => {
        setFilterParams({
            ...filterParams, 
            [event.currentTarget.name]: event.currentTarget.value})
    }

    const cleanFilterInput = () => {
        if (filterParams.canon === 'true') {
            filterParams.canon = true
        }
        if (filterParams.canon === 'false') {
            filterParams.canon = false
        }
        if (filterParams.animated === 'true') {
            filterParams.animated = true
        }
        if (filterParams.animated === 'lego') {
            filterParams.animated = true
            filterParams.lego = true
        }
        if (filterParams.animated === 'false') {
            filterParams.animated = false
            filterParams.lego = null
        }
    }

    // onSubmit, check media for matching all provided params
    const submitFilter = (event) => {
        event.preventDefault()
        cleanFilterInput()
        const filterResults = media.filter(item => {
            const itemEntries = Object.entries(item)    
            const matches = []
            for (const [key,value] of Object.entries(filterParams)) {
                if (itemEntries.find(entry => entry[0] === key && entry[1] == value)) {
                    matches.push(true)
                } else {
                    matches.push(false)
                }     
            }
            if (!matches.includes(false)) {
                return item
            }
        })
        setFilterResults(filterResults)
    }

    const refreshPage = (event) => {
        location.href="/"
    }

    const mediaTypes = [...new Set(media.map(media => {
        return media.type
    }))]
    const typeOptions = mediaTypes.map(type => {
        return <option key={type} value={type}>{type}</option>
    })
    
    const mediaRatings = [...new Set(media.map(media => {
        return media.rating
    }))]
    const ratingOptions = mediaRatings.map(rating => {
        return <option key={rating} value={rating}>{rating}</option>
    })

    const mediaEras = [...new Set(media.map(media => {
        return media.era
    }))]
    const eraOptions = mediaEras.map(era => {
        return <option key={era} value={era}>{era}</option>
    })

    return (
        <div className="filter-section">
            <div className="collapsible-header" {...getToggleProps()}>Filter</div>
            <div {...getCollapseProps()}>
                <div className="collapsible-content">
                    <form id="filter-form" className="grid-x">
                        
                        <div className="cell small-3">
                            <label htmlFor="type">Media Type:</label>
                            <select id="type" name="type" onChange={handleInputChange}>
                                <option>-- Please select an option --</option>
                                {typeOptions}
                            </select>
                        </div>

                        <div className="cell small-3">
                            <label htmlFor="animated">Film Style:</label>
                            <select id="animated" name="animated" onChange={handleInputChange}>
                                <option>-- Please select an option --</option>
                                <option key="false" value={false}>live-action</option>
                                <option key="true" value={true}>animated</option>
                                <option key="lego" value="lego">lego</option>
                            </select>
                        </div>

                        <div className="cell small-3">
                            <label htmlFor="rating">Audience Rating:</label>
                            <select id="rating" name="rating" onChange={handleInputChange}>
                                <option>-- Please select an option --</option>
                                {ratingOptions}
                            </select>
                        </div>

                        <div className="cell small-3">
                            <label htmlFor="rating">Star Wars Universe:</label>
                            <select id="canon" name="canon" onChange={handleInputChange}>
                                <option>-- Please select an option --</option>
                                <option key="true" value={true}>canon</option>
                                <option key="false" value={false}>extended universe</option>
                            </select>
                        </div>

                        <div className="cell small-3">
                            <label htmlFor="era">Star Wars Era:</label>
                            <select id="era" name="era" onChange={handleInputChange}>
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