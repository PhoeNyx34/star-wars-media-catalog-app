const Model = require("./Model.js")

class BehindSceneRole extends Model {
    static get tableName() {
        return "behindSceneRoles"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: [ "mediaId", "contributorId", "role" ],
            properties: {
                mediaId: { type: ["integer", "string"] },
                contributorId: { type: ["integer", "string"] },
                role: { type: "string" }
            }
        }
    }

    static get relationMappings() {
        const { Media, Contributor } = require("./index.js")

        return {
            contributor: {
                relation: Model.BelongsToOneRelation,
                modelClass: Contributor,
                join: {
                    from: "behindSceneRoles.contributorId",
                    to: "contributors.id"
                }
            },
            media: {
                relation: Model.BelongsToOneRelation,
                modelClass: Media,
                join: {
                    from: "behindSceneRoles.mediaId",
                    to: "media.id"
                }
            }
        }
    }
}

module.exports = BehindSceneRole