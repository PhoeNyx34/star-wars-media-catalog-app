import express from "express"

import { User, Media } from "../../../models/index.js"

const wantedMediaRouter = new express.Router()

wantedMediaRouter.post("/:mediaId", async (req, res) => {
    const mediaId = req.params.mediaId
    const userId = req.user.id
    try {
        const media = await Media.query().findById(mediaId)
        const user = await User.query().findById(userId)
        const currentRelationship = await media.$relatedQuery('wantedBy').where('userId', userId)
        if (currentRelationship.length > 0) {
            await media.$relatedQuery('wantedBy').unrelate().where('userId', userId)
        }
        else {
            await media.$relatedQuery('wantedBy').relate(user)
        }
        return res.status(201)
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

export default wantedMediaRouter