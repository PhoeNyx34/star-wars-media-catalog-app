import React, { useState, useEffect } from "react"

import MediaTile from "./MediaTile"
import searchMedia from "../../services/getSearchResults"

const MediaIndex = ({ user }) => { 
    const [media, setMedia] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [searchedMedia, setSearchedMedia] = useState([])

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

    const handleInputChange = (event) => {
        setSearchQuery(event.currentTarget.value)
    }

    const submitSearch = (event) => {
        event.preventDefault()
        let query = searchQuery.split(' ')
        const searchedMedia = searchMedia(media, query)
        setSearchedMedia(searchedMedia)
        if (searchedMedia.length === 0) {
            window.alert("Your search query did not return any results.")
        }
    }

    const refreshPage = (event) => {
        location.href="/"
    }

    const scrollToTop = (event) => {
        document.documentElement.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    let mediaTiles
    if (searchedMedia.length > 0) {
        mediaTiles = searchedMedia.map(item => {
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
                    <p>track your progress as you explore the galaxy</p>
                </div>
            </div>
            <div id="search-and-filter">
                <div id="search-section" className="grid-x">
                    <button className="cell small-2 large-1 button" onClick={submitSearch}>Search</button>
                    <input id="site-search" type="search" placeholder="Enter search query" className="cell small-6 large-9" onChange={handleInputChange}/>
                    <button className="cell small-2 large-1 button" onClick={refreshPage}>Refresh</button>
                </div>
            </div>
            <div id="home-media-index" className="grid-x grid-margin-x">
                {mediaTiles}
            </div>
            <div className="to-top" onClick={scrollToTop}>Go to Top</div>
        </>
    )
}

export default MediaIndex