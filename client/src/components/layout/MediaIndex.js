import React, { useState, useEffect } from "react"

import MediaTile from "./MediaTile"

const MediaIndex = (props) => {
    const [films, setFilms] = useState([])

    const getFilms = async () => {
        try {
            const response = await fetch('/api/v1/films')
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            setFilms(body.films)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getFilms()
    },[])

    const filmTiles = films.map(film => {
        return <MediaTile 
            key={film.id}
            film={film}
        />
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
                {filmTiles}
            </div>
        </>
    )
}

export default MediaIndex