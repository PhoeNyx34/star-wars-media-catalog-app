import express from "express"

import { Media, User } from "../../../models/index.js"
import MediaSerializer from "../../../serializers/MediaSerializer.js"
import objection from "objection"
const { ValidationError } = objection 
import cleanUserInput from "../../services/cleanUserInput.js"
import SearchAndFilterSerializer from "../../../serializers/SearchAndFilterSerializer.js"

const mediaRouter = new express.Router()

mediaRouter.get("/index-page", async (req, res) => {
    const user = req.user
    
    try {
        const media = await Media.query()
        let serializedMedia
        if (user) {
            serializedMedia = await MediaSerializer.getAllMedia(media, user.id)
        } else {
            serializedMedia = await MediaSerializer.getAllMedia(media)
        }
        return res.status(200).json({ media: serializedMedia })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

mediaRouter.get("/:id", async (req, res) => {
    const id = req.params.id
    const user = req.user

    try {
        const media = await Media.query().findById(id)
        let serializedMedia
        if (user) {
            serializedMedia = await MediaSerializer.getAllInfo(media, user.id)
        } else {
            serializedMedia = await MediaSerializer.getAllInfo(media)
        }
        return res.status(200).json({ media: serializedMedia })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

mediaRouter.post("/", async (req,res) => {
    const formInput = req.body
    const newMedia = cleanUserInput(formInput.newMedia)
    const contributors = cleanUserInput(formInput.contributors)

    try {
        const persistedMedia = await Media.query().insertAndFetch(newMedia)
        // check + create contributors
            //for each contributor, check if contributorName already exists in Contributor
            // if yes, fetch; else, insertAndFetch
            // add contributorId as key/value to contributor object
        // link to persistedMedia.id
            // for each contributor, insert into BehindSceneRole relation between contributor,media
        return res.status(201).json({ persistedMediaId: persistedMedia.id })
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error.data })
        }
        return res.status(500).json({ errors: error })
    }
})

mediaRouter.delete("/:id", async (req,res) => {
    const id = req.params.id
    try {
        const media = await Media.query().findById(id)
        await media.$relatedQuery("contributors").unrelate()
        await Media.query().deleteById(id)
        return res.status(201).json()
    }
    catch (error) {
        return res.status(500).json({ errors: error })
    }
})

export default mediaRouter