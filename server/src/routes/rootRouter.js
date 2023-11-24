import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import mediaRouter from "./api/v1/mediaRouter.js";
import ownedMediaRouter from "./api/v1/ownedMediaRouter.js";
import consumedMediaRouter from "./api/v1/consumedMediaRouter.js"
import wantedMediaRouter from "./api/v1/wantedMediaRouter.js";
const rootRouter = new express.Router();

rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/media", mediaRouter)
rootRouter.use("/api/v1/owned-media", ownedMediaRouter)
rootRouter.use("/api/v1/consumed-media", consumedMediaRouter)
rootRouter.use("/api/v1/wanted-media", wantedMediaRouter)

export default rootRouter;
