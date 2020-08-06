const imagesRouter = require("express").Router();
const { getImages, addImage } = require("../controllers/imagesController");
const { send405Error } = require("../errors");

imagesRouter.route("/").get(getImages).post(addImage).all(send405Error);
// .post(postImage)
// .all(handle405)

module.exports = imagesRouter;
