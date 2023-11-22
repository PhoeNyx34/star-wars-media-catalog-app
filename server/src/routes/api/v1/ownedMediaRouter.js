import express from "express"

import { Media, User } from "../../../models/index.js"
import MediaSerializer from "../../../serializers/MediaSerializer.js"

const ownedMediaRouter = new express.Router()

ownedMediaRouter.post("/:mediaId", async (req,res) => {
    const body = req.body
    const { mediaId, userId } = body

    try {
        const media = await Media.query().findById(mediaId)
        const user = await User.query().findById(userId)
        const currentRelationship = await media.$relatedQuery('users').where('userId', userId)
        if (currentRelationship.length > 0) {
            await media.$relatedQuery('users').unrelate().where('userId', userId)
        }
        else {
            await media.$relatedQuery('users').relate(user)
        }
        return res.status(201)
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

ownedMediaRouter.get("/:userId", async (req, res) => {
    const id = req.params.userId
    try {
        const user = await User.query().findById(id)
        const ownedMedia = await user.$relatedQuery('media')
        const serializedMedia = MediaSerializer.getTitleAndType(ownedMedia)
        return res.status(200).json({ ownedMedia: ownedMedia })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

export default ownedMediaRouter