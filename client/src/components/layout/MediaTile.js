import React from "react"
import { Link } from "react-router-dom"

const MediaTile = ({ item }) => {
    const { id, title, cover_image } = item

    return (
        <Link to={`/${id}`} className="cell small-3 media-tile">
            <img src={cover_image} className="media-tile-cover"/>
            <p className="media-tile-title">{title}</p>
        </Link>
    )
} 

export default MediaTile