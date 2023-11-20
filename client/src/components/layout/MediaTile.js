import React from "react"
import { Link } from "react-router-dom"

import executeDelete from "../../services/deleteMedia.js"

const MediaTile = ({ item, user }) => {
    const { id, title, cover_image } = item

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
        </Link> 
    )  
} 

export default MediaTile