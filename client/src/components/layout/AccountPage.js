import React, { useState, useEffect } from "react"
import { useCollapse } from "react-collapsed"
import { Link } from "react-router-dom"
import WantedMediaList from "./WantedMediaList"
import OwnedMediaList from "./OwnedMediaList"
import ConsumedMediaList from "./ConsumedMediaList"

const AccountPage = ({ user }) => {
    const { id, email, type } = user
    const [ownedMedia, setOwnedMedia] = useState([])
    const [consumedMedia, setConsumedMedia] = useState([])
    const [wantedMedia, setWantedMedia] = useState([])


    // const [isExpanded, setExpanded] = useState(true)
    // const { getCollapseProps, getToggleProps } = useCollapse(isExpanded)

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
            <li key={media.id}><Link to={`../${media.id}`} className="media-title">{media.title}</Link> &ndash; {media.type}</li>
        )
    })
    const consumedMediaList = consumedMedia.map(media => {
        return (
            <li key={media.id}><Link to={`../${media.id}`} className="media-title">{media.title}</Link> &ndash; {media.type}</li>
        )
    })
    const wantedMediaList = wantedMedia.map(media => {
        return (
            <li key={media.id}><Link to={`../${media.id}`} className="media-title">{media.title}</Link> &ndash; {media.type}</li>
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
                <p><strong>Email:</strong> {email}</p>
                {adminButtons}
            </div>
            <div className="grid-x user-account-media-lists">
                <WantedMediaList wantedMediaList={wantedMediaList} className="cell medium-12"/>
                <OwnedMediaList ownedMediaList={ownedMediaList} className="cell medium-12"/>
                <ConsumedMediaList consumedMediaList={consumedMediaList} className="cell medium-12"/>
            </div>
        </div>
    )
}

export default AccountPage