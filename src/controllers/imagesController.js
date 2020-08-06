const { fetchImages, createImage } = require("../models/imagesModel");

exports.getImages = (req, res, next) => {
  fetchImages().then((images) => {
    res.status(200).send({ images });
  });
};

exports.addImage = (req, res, next) => {
  const image = req.body;
  createImage(image)
    .then((createdImage) => {
      res.status(201).send({ image: createdImage });
    })
    .catch(next);
};
