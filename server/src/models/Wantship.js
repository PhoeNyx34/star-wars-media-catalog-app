const Model = require("./Model.js")

class Wantship extends Model {
    static get tableName() {
        return "wantships"
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
                    from: "wantships.userId",
                    to: "users.id"
                }
            },
            media: {
                relation: Model.BelongsToOneRelation,
                modelClass: Media,
                join: {
                    from: "wantships.mediaId",
                    to: "media.id"
                }
            }
        }
    }
}

module.exports = Wantship