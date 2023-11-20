import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const MediaShow = (props) => {
    const [media, setMedia] = useState({
        behindSceneRoles: [],
    })
    const { id } = useParams()
    
    const getMedia = async () => {
        try {
            const response = await fetch(`/api/v1/media/${id}`)
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
    }, [])

    let directors = []
    let writers = []
    for (const role of media.behindSceneRoles) {
        if (role.role === "director") {
            directors.push(role.contributor.name)
        }
        if (role.role === "writer") {
            writers.push(role.contributor.name)
        }
    }

    const releaseDate = new Date(media.release_date)

    let tags = []
        if (media.canon === true) {
            tags.push("Canon")
        } else if (media.canon === false) {
            tags.push("Legend")
        }
        if (media.animated) {
            tags.push("Animated")
        }
        if (media.lego) {
            tags.push("Lego")
        }
    
    const tagBubbles = tags.map((tag) => {
        let tagName = ""
        if (tag === "Canon") {
            tagName = "tag canon"
        } else if (tag === "Legend") {
            tagName = "tag legend"
        } else if (tag === "Animated") {
            tagName = "tag animated"
        } else if (tag === "Lego") {
            tagName = "tag lego"
        }
        return <li key={tag} className={tagName}>{tag}</li>
    })

    return (
        <div className="media-show-container grid-x">
            <img src={media.cover_image} className="cell medium-5 media-show-cover"/>
            <div className="cell medium-7 media-show-details">
                <h1>{media.title}</h1>
                <p>Directed by: {directors.join(", ")}</p>
                <p>Written by: {writers.join(", ")}</p>
                <p>Released: {releaseDate.toDateString()}</p>
                <p>Audience rating: {media.rating}</p>
                <p>{media.description}</p>
                <ul className="tag-bubbles">{tagBubbles}</ul>
            </div>
        </div>
    )
}

export default MediaShow