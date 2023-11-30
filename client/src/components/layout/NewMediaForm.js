import React, { useState } from "react"
import { Redirect } from "react-router-dom"

import ErrorList from "./ErrorList"
import translateServerErrors from "../../services/translateServerErrors"

const NewMediaForm = ({ user }) => {
    const { id, type } = user
    
    if (type === "member") {
        return (
            <div className="admin-restricted-page">
                <h1>WARNING!<br/>CODE 403: Forbidden Area</h1>
                <p>Return home, Rebel Scum</p>
            </div>
        )
    }

    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [serverErrors, setServerErrors] = useState([])
    const [newMedia, setNewMedia] = useState({
        type: "",
        title: "",
        release_date: "",
        cover_image: "",
        description: "",
        fictional_year_start: "",
        fictional_year_end: "",
        canon: "",
        animated: "",
        lego: "false",
        rating: ""
    })

    const persistNewMedia = async () => {
        try {
            const response = await fetch(`/api/v1/media`, {
                method: 'POST',
                headers: new Headers({"Content-Type":"application/json"}),
                body: JSON.stringify(newMedia)
            })
            if (!response.ok) {
                if (response.status === 422) {
                    const body = await response.json();
                    const newErrors = translateServerErrors(body.errors);
                    return setServerErrors(newErrors);
                } else {
                    const errorMessage = `${response.status} ${response.statusText}`
                    const error = new Error(errorMessage)
                    throw error
                }
            }
            const body = await response.json()
            location.href=`/${body.persistedMediaId}`
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    const handleInputChange = (event) => {
        setNewMedia({...newMedia,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const clearForm = (event) => {
        setNewMedia({
            type: "",
            title: "",
            release_date: "",
            cover_image: "",
            description: "",
            fictional_year_start: "",
            fictional_year_end: "",
            canon: "",
            animated: "",
            lego: "",
            rating: ""
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        persistNewMedia()
    } 

    return (
        <div className="form-page">
            <h1>New Media</h1>
            <ErrorList errors={serverErrors}/>
            <form onSubmit={handleSubmit}>
                <label>
                    <span className="required">*</span>Media Type:
                    <select name="type" onChange={handleInputChange}>
                        <option value="">--Please choose an option--</option>
                        <option value="film">Film</option>
                        <option value="tv_series">TV Series</option>
                        <option value="book">Book</option>
                        <option value="comic">Comic</option>
                        <option value="video_game">Video Game</option>
                    </select>
                </label>
                <label>
                    <span className="required">*</span>Title:
                    <input type="text" name="title" value={newMedia.title} onChange={handleInputChange} />
                </label>
                <label>
                    Description:
                    <input type="text" name="description" value={newMedia.description} onChange={handleInputChange} />
                </label>
                <div className="grid-x">
                    <label className="cell medium-6">
                        <span className="required">*</span>Release Date:
                        <input type="date" name="release_date" value={newMedia.release_date} onChange={handleInputChange} />
                    </label>

                    <label className="cell medium-6">
                        <span className="required">*</span>Rating:
                        <input type="text" name="rating" value={newMedia.rating} onChange={handleInputChange} />
                    </label>
                </div>
                <label>
                    Cover Image:
                    <input type="text" name="cover_image" value={newMedia.cover_image} onChange={handleInputChange} />
                </label>
                <div className="grid-x">
                    <label className="cell medium-6">
                        Beginning Year:
                        <input type="text" name="fictional_year_start" value={newMedia.fictional_year_start} onChange={handleInputChange} />
                    </label>

                    <label className="cell medium-6">
                        Ending Year:
                        <input type="text" name="fictional_year_end" value={newMedia.fictional_year_end} onChange={handleInputChange} />
                    </label>
                </div>
                <div className="choice-grid">
                <fieldset className="grid-x">
                    <label className="cell small-3"><span className="required">*</span>Select one:</label>
                    <div className="cell small-2">
                        <label className="radio-choice">
                            Canon
                            <input type="radio" name="canon" id="canon" value={true} onChange={handleInputChange} checked={newMedia.canon === "true"} />
                        </label>
                    </div>
                    <div className="cell small-2">
                        <label className="radio-choice">
                            Legend
                            <input type="radio" name="canon" id="legend" value={false} onChange={handleInputChange} checked={newMedia.canon === "false"} />
                        </label>
                    </div>
                </fieldset>
                <fieldset className="grid-x">
                    <label className="cell small-3"><span className="required">*</span>Is this animated?</label>
                    <div className="cell small-2">
                        <label className="radio-choice">
                            Yes
                            <input type="radio" name="animated" id="animated" value={true} onChange={handleInputChange} checked={newMedia.animated === "true"} />
                        </label>
                    </div>
                    <div className="cell small-2">
                        <label className="radio-choice">
                            No
                            <input type="radio" name="animated" id="live-action" value={false} onChange={handleInputChange} checked={newMedia.animated === "false"} />
                        </label>
                    </div>
                </fieldset>
                <fieldset className="grid-x">
                    <label className="cell small-3">Is this Lego?</label>
                    <div className="cell small-2">
                        <label className="radio-choice">
                            Yes
                            <input type="radio" name="lego" id="lego" value={true} onChange={handleInputChange} checked={newMedia.lego === "true"} />
                        </label>
                    </div>
                    <div className="cell small-2">
                        <label className="radio-choice">
                            No
                            <input type="radio" name="lego" id="non-lego" value={false} onChange={handleInputChange} checked={newMedia.lego === "false"} />
                        </label>
                    </div>
                </fieldset>
                </div>
                <div className="grid-x form-buttons">
                    <input type="reset" value="Clear Form" className="button cell small-3 form-button" onClick={clearForm} />
                    <input type="submit" value="Submit Form" className="button cell small-3 form-button" />
                </div>
            </form>
        </div>
    )
}

export default NewMediaForm