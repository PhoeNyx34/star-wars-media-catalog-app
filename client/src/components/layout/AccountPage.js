import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const AccountPage = ({ user }) => {
    const { id, email, type } = user
    const [ownedMedia, setOwnedMedia] = useState([])
    const [consumedMedia, setConsumedMedia] = useState([])
    const [wantedMedia, setWantedMedia] = useState([])

    const getUserMedia = async () => {
        try {
            const response = await fetch(`/api/v1/user-sessions/${id}`)
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            setOwnedMedia(body.media.ownerships)
            setConsumedMedia(body.media.consumerships)
            setWantedMedia(body.media.wantships)
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
    const consumedMediaList = consumedMedia.map(media => {
        return (
            <li key={media.id}><Link to={`../${media.id}`} className="media-title">{media.title}</Link> &mdash; {media.type}</li>
        )
    })
    const wantedMediaList = wantedMedia.map(media => {
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
            <div className="non-media-page-top">
                <h1>Account</h1>
                <p>Email: {email}</p>
                {adminButtons}
            </div>
            <div className="grid-x user-account-media-lists">
                <div className="cell small-4">
                    <h3>Media I Want</h3>
                    <ul>
                        {wantedMediaList}
                    </ul>
                </div>
                <div className="cell small-4">
                    <h3>Media I Own</h3>
                    <ul>
                        {ownedMediaList}
                    </ul>
                </div>
                <div className="cell small-4">
                    <h3>Media I've Consumed</h3>
                    <ul>
                        {consumedMediaList}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AccountPage