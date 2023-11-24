import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import executeDelete from "../../services/deleteMedia.js"
import setOwnership from "../../services/setOwnership.js"
import setConsumership from "../../services/setConsumership.js"
import setWantship from "../../services/setWantship.js"

const MediaShow = ({ user }) => {
    const [media, setMedia] = useState({
        behindSceneRoles: [],
    })
    const [shouldRedirect, setShouldRedirect] = useState(false)
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
    },[])

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

    const wantMedia = (event) => {
        event.preventDefault()
        setWantship(id)
        setShouldRedirect(true)
    }

    const ownMedia = (event) => {
        event.preventDefault()
        setOwnership(id, user.id)
        setShouldRedirect(true)
    }

    const consumeMedia = (event) => {
        event.preventDefault()
        setConsumership(id)
        setShouldRedirect(true)
    }

    if (shouldRedirect) {
        location.href=`/${id}`
    }

    let memberButtons = []
    if (user) {
        if (media.isWanted) {
            memberButtons.push(
                    <button key="wanted" className="button" onClick={wantMedia}>Mark as Don't Want</button>
            )
        } else {
            memberButtons.push(
                <button key="wanted" className="button" onClick={wantMedia}>Mark as Want</button>
            )
        }
        if (media.isOwned) {
            memberButtons.push(
                    <button key="owned" className="button" onClick={ownMedia}>Mark as Unowned</button>
            )
        } else {
            memberButtons.push(
                <button key="owned" className="button" onClick={ownMedia}>Mark as Owned</button>
            )
        }
        if (media.isConsumed) {
            memberButtons.push(
                    <button key="consumed" className="button" onClick={consumeMedia}>Mark as Unwatched</button>
            )
        } else {
            memberButtons.push(
                <button key="consumed" className="button" onClick={consumeMedia}>Mark as Watched</button>
            )
        }
    }

    const deleteMedia = (event) => {
        event.preventDefault()
        executeDelete(id)
    }

    let adminButtons
    if (user && user.type === "admin") {
        adminButtons = (
            <div className="show-admin-buttons">
                <button className="button" onClick={deleteMedia}>Delete</button>
            </div>
        )
    }

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
                {adminButtons}
                {memberButtons}
            </div>
        </div>
    )
}

export default MediaShow