import React from "react"
import { Link } from "react-router-dom"

const AccountPage = ({ user }) => {
    const { id, email, type } = user

    if (type === "member") {
        return (
            <div className="non-media-page">
                <h1>Account</h1>
                <p>Email: {email}</p>
            </div>
        )
    }
    
    return (
        <div className="non-media-page">
            <h1>Account</h1>
            <p>Email: {email}</p>
            <Link to="/users/new-media" className="button">Add new media</Link>
        </div>
    )
}

export default AccountPage