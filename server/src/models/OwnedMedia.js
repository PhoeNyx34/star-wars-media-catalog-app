const Model = require("./Model.js")

class OwnedMedia extends Model {
    static get tableName() {
        return "userOwns"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["userId", "mediaId"],
            properties: {
                userId: { type: ["integer", "string"] },
                mediaId: { type: ["integer", "string"] }
            }
        }
    }

    static get relationMappings() {
        const { User, Media } = require("./index.js")

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "userOwns.userId",
                    to: "users.id"
                }
            },
            media: {
                relation: Model.BelongsToOneRelation,
                modelClass: Media,
                join: {
                    from: "userOwns.mediaId",
                    to: "media.id"
                }
            }
        }
    }
}

module.exports = OwnedMedia