const Model = require("./Model.js")

class Media extends Model {
    static get tableName() {
        return "media"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["type", "title", "release_date", "canon", "animated", "rating"],
            properties: {
                type: { type: "string" },
                title: { type: "string" },
                release_date: { type: "string", format: "date" },
                cover_image: { type: "string" },
                description: { type: "string" },
                fictional_year_start: { type: "string" },
                fictional_year_end: { type: "string" },
                canon: { type: "boolean" },
                animated: { type: "boolean" },
                lego: { type: "boolean" },
                rating: { type: "string" },
            }
        }
    }

    static get relationMappings() {
        const { Contributor, BehindSceneRole } = require("./index.js")

        return {
            behindSceneRoles: {
                relation: Model.HasManyRelation,
                modelClass: BehindSceneRole,
                join: {
                    from: "media.id",
                    to: "behindSceneRoles.mediaId"
                }
            },
            contributors: {
                relation: Model.ManyToManyRelation,
                modelClass: Contributor,
                join: {
                    from: "media.id",
                    through: {
                        from: "behindSceneRoles.mediaId",
                        to: "behindSceneRoles.contributorId"
                    },
                    to: "contributors.id"
                }
            }
        }
    }
}

module.exports = Media