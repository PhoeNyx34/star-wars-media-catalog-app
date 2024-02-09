import React from "react"
import { Link } from "react-router-dom"

import executeDelete from "../../services/deleteMedia.js"
import MemberButtons from "./MemberButtons.js"

const MediaTile = ({ item, user }) => {
    const { id, title, cover_image, isWanted, isOwned, isConsumed } = item
    
    let memberButtons
    if (user) {
        memberButtons = <MemberButtons media={item} user={user} page="tile" />
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
        <div className="cell small-10 medium-4 large-3 media-tile">
            <Link to={`/${id}`}>
                <img src={cover_image} className="media-tile-cover"/>
                <p className="media-tile-title">{title}</p>
            </Link>
            {memberButtons}
            {adminButtons}
        </div> 
    )  
} 

export default MediaTile