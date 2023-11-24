/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.renameTable("userOwns", "ownerships")
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.renameTable("ownerships", "userOwns")
}
