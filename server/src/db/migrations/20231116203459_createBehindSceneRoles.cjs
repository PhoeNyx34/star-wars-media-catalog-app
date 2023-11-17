/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("behindSceneRoles", (table) => {
        table.bigIncrements("id").notNullable()
        table.bigInteger("contributorId").notNullable().unsigned().index().references("contributors.id")
        table.bigInteger("mediaId").notNullable().unsigned().index().references("media.id")
        table.string("role").notNullable()
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("behindSceneRoles")
}
