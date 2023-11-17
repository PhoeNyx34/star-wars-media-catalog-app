const Model = require("./Model.js")

class Contributor extends Model {
    static get tableName() {
        return "contributors"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: [ "name" ],
            properties: {
                name: { type: "string" },
            }
        }
    }

    static get relationMappings() {
        const { Media, BehindSceneRole } = require("./index.js")

        return {
            behindSceneRoles: {
                relation: Model.HasManyRelation,
                modelClass: BehindSceneRole,
                join: {
                    from: "contributor.id",
                    to: "behindSceneRoles.contributorId"
                }
            },
            media: {
                relation: Model.ManyToManyRelation,
                modelClass: Media,
                join: {
                    from: "contributor.id",
                    through: {
                        from: "behindSceneRoles.contributorId",
                        to: "behindSceneRoles.mediaId"
                    },
                    to: "media.id"
                }
            }
        }
    }
}

module.exports = Contributor