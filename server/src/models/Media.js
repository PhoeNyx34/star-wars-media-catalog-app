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
                fictional_year_start: { type: ["string", "integer"] },
                fictional_year_end: { type: ["string", "integer"] },
                canon: { type: [ "boolean", "string" ] },
                animated: { type: [ "boolean", "string" ] },
                lego: { type: [ "boolean", "string" ] },
                rating: { type: "string" },
            }
        }
    }

    static get relationMappings() {
        const { Contributor, BehindSceneRole, User, Ownership, Consumership, Wantship } = require("./index.js")

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
            },
            ownerships: {
                relation: Model.HasManyRelation,
                modelClass: Ownership,
                join: {
                    from: "media.id",
                    to: "ownerships.mediaId"
                }
            },
            ownedBy: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: "media.id",
                    through: {
                        from: "ownerships.mediaId",
                        to: "ownerships.userId"
                    },
                    to: "users.id"
                }
            },
            consumerships: {
                relation: Model.HasManyRelation,
                modelClass: Consumership,
                join: {
                    from: "media.id",
                    to: "consumerships.mediaId"
                }
            },
            consumedBy: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: "media.id",
                    through: {
                        from: "consumerships.mediaId",
                        to: "consumerships.userId"
                    },
                    to: "users.id"
                }
            },
            wantships: {
                relation: Model.HasManyRelation,
                modelClass: Wantship,
                join: {
                    from: "media.id",
                    to: "wantships.mediaId"
                }
            },
            wantedBy: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: "media.id",
                    through: {
                        from: "wantships.mediaId",
                        to: "wantships.userId"
                    },
                    to: "users.id"
                }
            }
        }
    }
}

module.exports = Media