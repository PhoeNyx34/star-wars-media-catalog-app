const Model = require("./Model.js")

class Consumership extends Model {
    static get tableName() {
        return "consumerships"
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
                    from: "consumerships.userId",
                    to: "users.id"
                }
            },
            media: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "consumerships.mediaId",
                    to: "media.id"
                }
            }
        }
    }
}

module.exports = Consumership