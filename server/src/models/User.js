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
      required: ["email", "type"],
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
    const { Media, OwnedMedia } = require("./index.js")

    return {
      media: {
        relation: Model.ManyToManyRelation,
        modelClass: Media,
        join: {
          from: "users.id",
          through: {
            from: "userOwns.userId",
            to: "userOwns.mediaId"
          },
          to: "media.id"
        }
      },
      owns: {
        relation: Model.HasManyRelation,
        modelClass: OwnedMedia,
        join: {
          from: "users.id",
          to: "userOwns.userId"
        }
      }
    }
  }
}

module.exports = User;
