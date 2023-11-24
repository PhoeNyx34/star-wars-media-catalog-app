const Model = require("./Model.js")

class Ownership extends Model {
    static get tableName() {
        return "ownerships"
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
                    from: "ownerships.userId",
                    to: "users.id"
                }
            },
            media: {
                relation: Model.BelongsToOneRelation,
                modelClass: Media,
                join: {
                    from: "ownerships.mediaId",
                    to: "media.id"
                }
            }
        }
    }
}

module.exports = Ownership