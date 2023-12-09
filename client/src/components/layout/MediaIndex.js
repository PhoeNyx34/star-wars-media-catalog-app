import React, { useState, useEffect } from "react"
import { useCollapse } from "react-collapsed"

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
    
    console.log("media", media)
    console.log("search", searchResults)
    console.log("filter", filterResults)

    let mediaTiles
    if (searchResults.length > 0) {
        mediaTiles = searchResults.map(item => {
            return (
                <MediaTile 
                    key={item.id}
                    item={item}
                    user={user}
                />
            )
        })
    } else if (filterResults.length > 0) {
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
            <div id="home-header">
                <div className="header-text">
                    <h1>Holocron</h1>
                    <h3>an interactive Star Wars media catalog</h3>
                </div>
            </div>
            <div id="search-and-filter">
                <SearchSection media={media} setSearchResults={setSearchResults} />
                <FilterSection media={media} setFilterResults={setFilterResults} />
            </div>
            <div id="home-media-index" className="grid-x grid-margin-x">
                {mediaTiles}
            </div>
            <button className="to-top button" onClick={scrollToTop}>Go To Top</button>
        </>
    )
}

export default MediaIndex