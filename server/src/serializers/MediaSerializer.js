import RoleSerializer from "./RoleSerializer.js"
import SearchAndFilterSerializer from "./SearchAndFilterSerializer.js"

class MediaSerializer {
    static async getAllInfo(media, userId) {
        const allowedAttributes = ["id", "type", "title", "cover_image", "release_date", "description", "fictional_year_start", "fictional_year_end", "canon", "animated", "lego", "rating"]
        const serializedMedia = {}
        
        for (const attribute of allowedAttributes) {
            serializedMedia[attribute] = media[attribute]
        }

        const roles = await media.$relatedQuery("behindSceneRoles")
        const serializedRoles = await RoleSerializer.getContributors(roles)
        serializedMedia.behindSceneRoles = serializedRoles

        if (userId) {
            const isOwned = await media.$relatedQuery('ownedBy').where('userId', userId)
            if (isOwned.length > 0) {
                serializedMedia.isOwned = true
            }
            const isConsumed = await media.$relatedQuery('consumedBy').where('userId', userId)
            if (isConsumed.length > 0) {
                serializedMedia.isConsumed = true
            }
            const isWanted = await media.$relatedQuery('wantedBy').where('userId', userId)
            if (isWanted.length > 0) {
                serializedMedia.isWanted = true
            }
        }

        return serializedMedia
    }
    
    static async getAllMedia(media, userId) {
        const allowedAttributes = ["id", "type", "title", "cover_image", "release_date", "description", "fictional_year_start", "fictional_year_end", "canon", "animated", "lego", "rating"]
        
        if (userId) {
            const serializedMedia = await Promise.all(media.map(async (item) => {
                let serializedItem = {}
                for (const attribute of allowedAttributes) {
                    serializedItem[attribute] = item[attribute]
                }

                let searchArray = await SearchAndFilterSerializer.getSearchableArray(item)
                serializedItem.search = searchArray
    
                const isOwned = await item.$relatedQuery('ownedBy').where('userId', userId)
                if (isOwned.length > 0) {
                    serializedItem.isOwned = true
                }
                const isConsumed = await item.$relatedQuery('consumedBy').where('userId', userId)
                if (isConsumed.length > 0) {
                    serializedItem.isConsumed = true
                }
                const isWanted = await item.$relatedQuery('wantedBy').where('userId', userId)
                if (isWanted.length > 0) {
                    serializedItem.isWanted = true
                }
    
                return serializedItem
            }))
            return serializedMedia
        } else {
            const serializedMedia = await Promise.all(media.map(async (item) => {
                let serializedItem = {}
                for (const attribute of allowedAttributes) {
                    serializedItem[attribute] = item[attribute]
                }

                let searchArray = await SearchAndFilterSerializer.getSearchableArray(item)
                serializedItem.search = searchArray
    
                return serializedItem
            }))
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