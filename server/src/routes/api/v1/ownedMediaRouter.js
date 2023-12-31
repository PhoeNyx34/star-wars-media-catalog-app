import express from "express"

import { Media, User } from "../../../models/index.js"
import MediaSerializer from "../../../serializers/MediaSerializer.js"

const ownedMediaRouter = new express.Router()

ownedMediaRouter.post("/:mediaId", async (req,res) => {
    const mediaId = req.params.mediaId
    const userId = req.user.id

    try {
        const media = await Media.query().findById(mediaId)
        const user = await User.query().findById(userId)
        const currentRelationship = await media.$relatedQuery('ownedBy').where('userId', userId)
        if (currentRelationship.length > 0) {
            await media.$relatedQuery('ownedBy').unrelate().where('userId', userId)
        }
        else {
            await media.$relatedQuery('ownedBy').relate(user)
        }
        return res.status(201)
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

export default ownedMediaRouter