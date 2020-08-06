const connection = require("../../db/connection");

exports.fetchImages = () => {
  return connection.select("*").from("images");
};

exports.createImage = (imageData) => {
  return connection
    .insert(imageData)
    .into("images")
    .returning("*")
    .then((imagesRows) => {
      return imagesRows[0];
    });
};
