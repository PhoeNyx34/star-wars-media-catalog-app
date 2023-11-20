import express from "express"

import { Media } from "../../../models/index.js"
import MediaSerializer from "../../../serializers/MediaSerializer.js"

const mediaRouter = new express.Router()

mediaRouter.get("/index-page", async (req, res) => {
    try {
        const media = await Media.query()
        const serializedMedia = MediaSerializer.getCoverAndTitle(media)
        return res.status(200).json({ media: serializedMedia })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

mediaRouter.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const media = await Media.query().findById(id)
        const mediaToSend = await MediaSerializer.getContributors(media)
        return res.status(200).json({ media: mediaToSend })
    } catch (error) {
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
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

export default mediaRouter