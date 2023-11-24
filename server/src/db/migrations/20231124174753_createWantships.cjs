/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("wantships", (table) => {
        table.bigIncrements("id").notNullable()
        table.bigInteger("userId").notNullable().unsigned().index().references("users.id")
        table.bigInteger("mediaId").notNullable().unsigned().index().references("media.id")
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("wantships")
}
