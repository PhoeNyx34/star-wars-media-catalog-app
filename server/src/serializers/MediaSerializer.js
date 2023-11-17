import RoleSerializer from "./RoleSerializer.js"

class MediaSerializer {
    static async getContributors(media) {
        const allowedAttributes = ["id", "type", "title", "cover_image", "release_date", "description", "fictional_year_start", "fictional_year_end", "canon", "animated", "lego", "rating"]
        const serializedMedia = {}
        
        for (const attribute of allowedAttributes) {
            serializedMedia[attribute] = media[attribute]
        }

        const roles = await media.$relatedQuery("behindSceneRoles")
        const serializedRoles = await RoleSerializer.getContributors(roles)
        
        serializedMedia.behindSceneRoles = serializedRoles

        return serializedMedia
    }
    
    static getCoverAndTitle(media) {
        const allowedAttributes = ["id", "title", "cover_image"]
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