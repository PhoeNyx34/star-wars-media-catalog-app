import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"

import MediaTile from "./MediaTile"

const MediaIndex = ({ user }) => { 
    const [media, setMedia] = useState([])

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

    const mediaTiles = media.map(item => {
        return (
            <MediaTile 
                key={item.id}
                item={item}
                user={user}
            />
        )
    })
    
    return (
        <>
            <div id="home-header">
                <div className="header-text">
                    <h1>Star Wars</h1>
                    <h3>an interactive media catalog</h3>
                </div>
            </div>
            <div id="home-media-index" className="grid-x grid-margin-x">
                {mediaTiles}
            </div>
        </>
    )
}

export default MediaIndex