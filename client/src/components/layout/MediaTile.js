import React from "react"

const MediaTile = ({ film }) => {
    const { id, title, cover_image } = film

    return (
        <div className="cell small-3 media-tile">
            <img src={cover_image} className="media-tile-cover"/>
            <p className="media-tile-title">{title}</p>
        </div>
    )
} 

export default MediaTile