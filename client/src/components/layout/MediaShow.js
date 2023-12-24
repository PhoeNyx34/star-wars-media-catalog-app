import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import executeDelete from "../../services/deleteMedia.js"
import MemberButtons from "./MemberButtons.js"

const MediaShow = ({ user }) => {
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
            tagName = "cell small-9 medium-3 tag canon"
        } else if (tag === "Legend") {
            tagName = "cell small-9 medium-3 tag legend"
        } else if (tag === "Animated") {
            tagName = "cell small-9 medium-3 tag animated"
        } else if (tag === "Lego") {
            tagName = "cell small-9 medium-3 tag lego"
        }
        return <li key={tag} className={tagName}>{tag}</li>
    })

    let memberButtons
    if (user) {
        memberButtons = (
            <>
                <h6 className="cell large-10">In my lists:</h6>
                <div className="show-member-buttons cell large-10">
                    <MemberButtons media={media} user={user} page="show"/>
                </div>
            </>
        )
    }

    const deleteMedia = (event) => {
        event.preventDefault()
        executeDelete(id)
    }

    let adminButtons
    if (user && user.type === "admin") {
        adminButtons = (
            <div className="admin-buttons">
                <button className="button" onClick={deleteMedia}>Delete</button>
            </div>
        )
    }

    return (
        <div className="media-show-container grid-x">
            <img src={media.cover_image} className="cell small-12 medium-5 media-show-cover"/>
            <div className="cell small-12 medium-7 media-show-details">
                <h1>{media.title}</h1>
                <p><span className="media-title">Directed by:</span> {directors.join(", ")}</p>
                <p><span className="media-title">Written by:</span> {writers.join(", ")}</p>
                <p><span className="media-title">Released:</span> {releaseDate.toDateString()}</p>
                <p><span className="media-title">Audience rating:</span> {media.rating}</p>
                <p>{media.description}</p>
                <ul className="grid-x tag-bubbles">{tagBubbles}</ul>
                <div className="grid-x user-buttons">
                    {memberButtons}
                    <div className="cell small-2">{adminButtons}</div>
                </div>
            </div>
        </div>
    )
}

export default MediaShow