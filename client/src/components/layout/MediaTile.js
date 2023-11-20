import React from "react"
import { Link } from "react-router-dom"

const MediaTile = ({ item, user }) => {
    const { id, title, cover_image } = item

    if (!user) {
        return (
            <Link to={`/${id}`} className="cell small-3 media-tile">
                <img src={cover_image} className="media-tile-cover"/>
                <p className="media-tile-title">{title}</p>
            </Link> 
        )   
    }

    if (user.type === "member") {
        return (
            <Link to={`/${id}`} className="cell small-3 media-tile">
                <img src={cover_image} className="media-tile-cover"/>
                <p className="media-tile-title">{title}</p>
            </Link>    
        )    
    }

    const deleteMedia = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`/api/v1/media/${id}`, {method: "DELETE"})
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            location.href = "/"
        } catch (error) {
            window.alert("Delete unsuccessful")
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    if (user.type === "admin") {
        return (
            <Link to={`/${id}`} className="cell small-3 media-tile">
                <img src={cover_image} className="media-tile-cover"/>
                <p className="media-tile-title">{title}</p>
                <button className="button" onClick={deleteMedia}>Delete</button>
            </Link>
        )
    }
} 

export default MediaTile