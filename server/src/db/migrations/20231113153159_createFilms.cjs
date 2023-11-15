/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("films", (table) => {
        table.bigIncrements("id").notNullable()
        table.string("title").notNullable()
        table.date("release_date").notNullable()
        table.string("cover_image")
        table.text("description")
        table.string("fictional_year_start")
        table.string("fictional_year_end")
        table.boolean("canon").notNullable()
        table.boolean("animated").notNullable()
        table.boolean("lego")
        table.string("rating").notNullable()
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("films")
}
