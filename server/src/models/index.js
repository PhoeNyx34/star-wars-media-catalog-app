// include all of your models here using CommonJS requires
const User = require("./User.js")
const Ownership = require("./Ownership.js")
const Consumership = require("./Consumership.js")
const Wantship = require("./Wantship.js")
const Media = require("./Media.js")
const Contributor = require("./Contributor.js");
const BehindSceneRole = require("./BehindSceneRole.js");

module.exports = { 
    User, 
    Ownership, Consumership, Wantship, 
    Media, 
    Contributor, BehindSceneRole };
