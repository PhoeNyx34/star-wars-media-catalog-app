import express from "express";
import passport from "passport";

import { User } from "../../../models/index.js";
import { ValidationError } from "objection";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.query()
    return res.status(200).json({ users })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default usersRouter;