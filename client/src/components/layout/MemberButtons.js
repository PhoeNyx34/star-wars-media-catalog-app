import React, { useState} from "react"

import setOwnership from "../../services/setOwnership.js"
import setConsumership from "../../services/setConsumership.js"
import setWantship from "../../services/setWantship.js"

const MemberButtons = ({ media, user }) => {

    const {id, isWanted, isOwned, isConsumed} = media
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
        location.reload()
    }

    let inWantList
    let inOwnList
    let inConsumedList

    if (isWanted) {
        inWantList = <i className="fa-solid fa-check"></i>
    }
    if (isOwned) {
        inOwnList = <i className="fa-solid fa-check"></i>
    }
    if (isConsumed) {
        inConsumedList = <i className="fa-solid fa-check"></i>
    }
        
    return (
        <div className="member-buttons grid-x">
            <li key="wanted" className="cell small-3 medium-7 large-3 button" onClick={wantMedia}>Want{inWantList}</li>
            <li key="owned" className="cell small-3 medium-7 large-3 button"  onClick={ownMedia}>Own{inOwnList}</li>
            <li key="consumed" className="cell small-4 medium-7 large-3 button" onClick={consumeMedia}>Watched{inConsumedList}</li>
        </div>  
    )
}

export default MemberButtons