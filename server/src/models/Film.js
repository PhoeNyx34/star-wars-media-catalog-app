const Model = require("./Model.js")

class Film extends Model {
    static get tableName() {
        return "films"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["title", "release_date", "canon", "animated", "rating"],
            properties: {
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
}

module.exports = Film