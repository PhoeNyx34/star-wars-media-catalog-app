import React, { useState } from "react"
import { Link } from "react-router-dom"

import executeDelete from "../../services/deleteMedia.js"
import setOwnership from "../../services/setOwnership.js"

const MediaTile = ({ item, user }) => {
    const { id, title, cover_image, isOwned } = item
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const ownMedia = (event) => {
        event.preventDefault()
        setOwnership(id, user.id)
        setShouldRedirect(true)
    }

    if (shouldRedirect) {
        location.href="/"
    }

    let memberButtons = []
    if (user) {
        if (isOwned) {
            memberButtons.push(
                    <button key="owned" className="button" onClick={ownMedia}>Mark as Unowned</button>
            )
        } else {
            memberButtons.push(
                <button key="owned" className="button" onClick={ownMedia}>Mark as Owned</button>
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
            <div className="tile-admin-buttons">
                <button className="button" onClick={deleteMedia}>Delete</button>
            </div>
        )
    }

    return (
        <Link to={`/${id}`} className="cell small-3 media-tile">
            <img src={cover_image} className="media-tile-cover"/>
            <p className="media-tile-title">{title}</p>
            {adminButtons}
            <div className="tile-member-buttons">
                {memberButtons}
            </div>
        </Link> 
    )  
} 

export default MediaTile