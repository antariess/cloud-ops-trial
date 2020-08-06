const apiRouter = require("express").Router();
const imagesRouter = require("./imagesRouter");
const { send405Error } = require("../errors");

apiRouter.use("/images", imagesRouter);

module.exports = apiRouter;
