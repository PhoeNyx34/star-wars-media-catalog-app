/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email"],
      properties: {
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        cryptedPassword: { type: "string" },
        type: { type: "string" }
      },
    };
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }

  static get relationMappings() {
    const { Media, Ownership, Consumership } = require("./index.js")

    return {
      ownedMedia: {
        relation: Model.ManyToManyRelation,
        modelClass: Media,
        join: {
          from: "users.id",
          through: {
            from: "ownerships.userId",
            to: "ownerships.mediaId"
          },
          to: "media.id"
        }
      },
      ownerships: {
        relation: Model.HasManyRelation,
        modelClass: Ownership,
        join: {
          from: "users.id",
          to: "ownerships.userId"
        }
      },
      consumedMedia: {
        relation: Model.ManyToManyRelation,
        modelClass: Media,
        join: {
          from: "users.id",
          through: {
            from: "consumerships.userId",
            to: "consumerships.mediaId"
          },
          to: "media.id"
        }
      },
      consumerships: {
        relation: Model.HasManyRelation,
        modelClass: Consumership,
        join: {
          from: "users.id",
          to: "consumerships.userId"
        }
      }
    }
  }
}

module.exports = User;
