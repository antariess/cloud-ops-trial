const imagesData = require("../data/images");

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("images").insert(imagesData).returning("*");
    });
};
