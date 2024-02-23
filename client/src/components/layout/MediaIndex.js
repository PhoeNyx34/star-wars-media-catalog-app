import React, { useState, useEffect } from "react"

import MediaTile from "./MediaTile"
import SearchSection from "./SearchSection"
import FilterSection from "./FilterSection"

const MediaIndex = ({ user }) => { 
    const [media, setMedia] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [filterResults, setFilterResults] = useState([])

    const getMedia = async () => {
        try {
            const response = await fetch('/api/v1/media/index-page')
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            setMedia(body.media)
        } catch (error) {
            console.log(error)
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getMedia()
    },[])

    const scrollToTop = (event) => {
        document.documentElement.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    let mediaTiles
    if (searchResults.length > 0 && searchResults.length < media.length) {
        mediaTiles = searchResults.map(item => {
            return (
                <MediaTile 
                    key={item.id}
                    item={item}
                    user={user}
                />
            )
        })
    } else if (filterResults.length > 0 && filterResults.length < media.length) {
        mediaTiles = filterResults.map(item => {
            return (
                <MediaTile 
                    key={item.id}
                    item={item}
                    user={user}
                />
            )
        })
    } else {
        mediaTiles = media.map(item => {
            return (
                <MediaTile 
                    key={item.id}
                    item={item}
                    user={user}
                />
            )
        })
    }

    return (
        <>
            <section id="search">
                <input id="search-toggle" type="checkbox" />
                <label className="search-button-container" htmlFor="search-toggle">Search</label>
                <div className="search-content">
                    <SearchSection media={media} setSearchResults={setSearchResults} />
                </div>
            </section>
            <section id="filter">
                <input id="filter-toggle" type="checkbox" />
                <label className="filter-button-container" htmlFor="filter-toggle">Filter</label>
                <div className="filter-content">
                    <FilterSection media={media} setFilterResults={setFilterResults} />
                </div>
            </section>
            <div id="home-header">
                <div className="header-text">
                    <h1>Holocron</h1>
                    <h3>An interactive Star Wars media catalog</h3>
                    <p>Track your progress as you explore the galaxy</p>
                </div>
            </div>
            {/* <div id="search-and-filter">
                <SearchSection media={media} setSearchResults={setSearchResults} />
                <FilterSection media={media} setFilterResults={setFilterResults} />
            </div> */}
            <div id="home-media-index" className="grid-x grid-margin-x">
                {mediaTiles}
            </div>
            <div className="to-top" onClick={scrollToTop}>Go to Top</div>
        </>
    )
}

export default MediaIndex