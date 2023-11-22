import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const AccountPage = ({ user }) => {
    const { id, email, type } = user
    const [ownedMedia, setOwnedMedia] = useState([])

    const getUserMedia = async () => {
        try {
            const response = await fetch(`/api/v1/owned-media/${id}`)
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            setOwnedMedia(body.ownedMedia)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getUserMedia()
    }, [])

    const ownedMediaList = ownedMedia.map(media => {
        return (
            <li key={media.id}><Link to={`../${media.id}`} className="media-title">{media.title}</Link> &mdash; {media.type}</li>
        )
    })

    let adminButtons
    if (type === "admin") {
        adminButtons = (
            <Link to="/users/new-media" className="button">Add new media</Link>
        )
    }
    
    return (
        <div className="non-media-page">
            <h1>Account</h1>
            <p>Email: {email}</p>
            {adminButtons}
            <div className="media-list">
                <h3>Media I Own</h3>
                <ul>
                    {ownedMediaList}
                </ul>
            </div>
        </div>
    )
}

export default AccountPage