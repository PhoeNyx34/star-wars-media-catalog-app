import React, { useState, useEffect } from "react"

import MediaTile from "./MediaTile"

const Index = (props) => {
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
                <h1>Star Wars</h1>
                <h3>an interactive media catalog</h3>
            </div>
            <div id="home-media-index">
                {filmTiles}
            </div>
        </>
    )
}

export default Index