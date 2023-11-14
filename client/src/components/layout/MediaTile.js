import React from "react"

const MediaTile = ({film}) => {
    const { id, title, cover_image } = film

    return (
        <div>
            <img src={cover_image} />
            <p>{title}</p>
        </div>
    )
} 

export default MediaTile