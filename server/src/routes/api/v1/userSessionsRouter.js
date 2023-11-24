import express from "express";
import passport from "passport";

import { User } from "../../../models/index.js"
import MediaSerializer from "../../../serializers/MediaSerializer.js";

const sessionRouter = new express.Router();

sessionRouter.post("/", (req, res, next) => {
  return passport.authenticate("local", (err, user) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return res.status(422).json({ errors: err.message })
    }

    if (user) {
      return req.login(user, () => {
        return res.status(201).json(user);
      });
    }

    return res.status(401).json(undefined);
  })(req, res, next);
});

sessionRouter.get("/current", async (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json(undefined);
  }
});

sessionRouter.delete("/", (req, res) => {
  req.logout();
  res.status(200).json({ message: "User signed out" });
});

sessionRouter.get("/:userId", async (req, res) => {
  const id = req.params.userId
    try {
      const user = await User.query().findById(id)
      const ownedMedia = await user.$relatedQuery('ownedMedia')
      const consumedMedia = await user.$relatedQuery('consumedMedia')
      const serializedOwnership = MediaSerializer.getTitleAndType(ownedMedia)
      const serializedConsumership = MediaSerializer.getTitleAndType(consumedMedia)
      return res.status(200).json({ media: {ownerships: serializedOwnership, consumerships: serializedConsumership} })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ errors: error })
    }
})

export default sessionRouter;
