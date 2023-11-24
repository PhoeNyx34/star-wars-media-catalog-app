import React, { useState } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import executeDelete from "../../services/deleteMedia.js"
import setOwnership from "../../services/setOwnership.js"
import setConsumership from "../../services/setConsumership.js"
import setWantship from "../../services/setWantship.js"

const MediaTile = ({ item, user }) => {
    const { id, title, cover_image } = item
    const [shouldRedirect, setShouldRedirect] = useState(false)

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
        location.href="/"
    }

    let memberButtons
    if (user) {
        memberButtons = (
                <div className="tile-member-buttons grid-x">
                    <li key="wanted" className="cell small-3">Want<button className="button member-option" onClick={wantMedia}></button></li>
                    <li key="owned" className="cell small-3">Own<button className="button member-option" onClick={ownMedia}></button></li>
                    <li key="consumed" className="cell small-3">Watched<button className="button member-option" onClick={consumeMedia}></button></li>
                </div>  
        )
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
        <div className="cell small-3 media-tile">
            <Link to={`/${id}`}>
                <img src={cover_image} className="media-tile-cover"/>
                <p className="media-tile-title">{title}</p>
            </Link>
            <div className="grid-x">
                {memberButtons}
                {adminButtons}
            </div>
        </div> 
    )  
} 

export default MediaTile