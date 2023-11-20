/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.alterTable("users", (table) => {
        table.string("type").notNullable().defaultTo("member")
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.alterTable("users", (table) => {
        table.dropColumn("type")
    })
}