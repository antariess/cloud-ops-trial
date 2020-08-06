exports.up = function (knex) {
  console.log("creating images table...");
  return knex.schema.createTable("images", (imagesTable) => {
    imagesTable.increments("image_id").primary();
    imagesTable.string("image_title").notNullable();
    imagesTable.string("image_url").notNullable();
    imagesTable.string("category").notNullable();
  });
};

exports.down = function (knex) {
  console.log("destroy images table...");
  return knex.schema.dropTable("images");
};
