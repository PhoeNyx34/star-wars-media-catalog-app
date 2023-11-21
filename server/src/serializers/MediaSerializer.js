import RoleSerializer from "./RoleSerializer.js"

class MediaSerializer {
    static async getContributors(media, userId) {
        const allowedAttributes = ["id", "type", "title", "cover_image", "release_date", "description", "fictional_year_start", "fictional_year_end", "canon", "animated", "lego", "rating"]
        const serializedMedia = {}
        
        for (const attribute of allowedAttributes) {
            serializedMedia[attribute] = media[attribute]
        }

        const roles = await media.$relatedQuery("behindSceneRoles")
        const serializedRoles = await RoleSerializer.getContributors(roles)
        serializedMedia.behindSceneRoles = serializedRoles

        if (userId) {
            const isOwned = await media.$relatedQuery('users').where('userId', userId)
            if (isOwned.length > 0) {
                serializedMedia.isOwned = true
            } else {
                serializedMedia.isOwned = false
            }
        }

        return serializedMedia
    }
    
    static async getCoverAndTitle(media, userId) {
        const allowedAttributes = ["id", "title", "cover_image"]
        
        if (userId) {
            const serializedMedia = await Promise.all(media.map(async (item) => {
                let serializedItem = {}
                for (const attribute of allowedAttributes) {
                    serializedItem[attribute] = item[attribute]
                }
    
                const isOwned = await item.$relatedQuery('users').where('userId', userId)
                if (isOwned.length > 0) {
                    serializedItem.isOwned = true
                }
    
                return serializedItem
            }))
            return serializedMedia
        } else {
            const serializedMedia = media.map(item => {
                let serializedItem = {}
                for (const attribute of allowedAttributes) {
                    serializedItem[attribute] = item[attribute]
                }
    
                return serializedItem
            })
            return serializedMedia
        }
    }

    static getTitleAndType(media) {
        const allowedAttributes = ["id", "title", "type"]
        const serializedMedia = media.map(item => {
            let serializedItem = {}
            for (const attribute of allowedAttributes) {
                serializedItem[attribute] = item[attribute]
            }
            return serializedItem
        }) 
        return serializedMedia
    }
}

export default MediaSerializer