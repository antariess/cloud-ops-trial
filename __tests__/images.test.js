process.env.NODE_ENV = "test";
const app = require("../src/app");
const request = require("supertest")(app);
const connection = require("../db/connection");

describe("craft_gallery", () => {
  beforeEach(() => connection.seed.run());
  afterAll(() => {
    connection.destroy();
  });
  test("status:404", () => {
    request.get("/smth").expect(404);
  });
  describe("Images", () => {
    test("status:405", () => {
      const invalidMethods = ["patch", "put", "delete"];
      const methodPromises = invalidMethods.map((method) => {
        return request[method]("/api/images")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
    test("success GET all images", () => {
      return request
        .get("/api/images")
        .expect(200)
        .then(({ body: { images } }) => {
          expect(images).toEqual(expect.any(Array));
          expect(Object.keys(images[0])).toEqual(
            expect.arrayContaining([
              "category",
              "image_title",
              "image_url",
              "image_id",
            ])
          );
        });
    });
    describe("POST", () => {
      test("success, posts an image", () => {
        return request
          .post("/api/images")
          .send({
            category: "bat",
            image_title: "bat",
            image_url:
              "https://cdn.britannica.com/21/75121-050-8CF5E1DB/Bats-structures-organs-sound-frequencies-signals-contexts.jpg",
          })
          .expect(201)
          .then(({ body: { image } }) => {
            expect(image.image_title).toEqual("bat");
          });
      });
      test("status:400 when missing required columns", () => {
        return request
          .post("/api/images")
          .send({
            image_title: "bat",
            image_url:
              "https://cdn.britannica.com/21/75121-050-8CF5E1DB/Bats-structures-organs-sound-frequencies-signals-contexts.jpg",
          })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toEqual(
              'insert into "images" ("image_title", "image_url") values ($1, $2) returning * - null value in column "category" violates not-null constraint'
            );
          });
      });
      test("status:400 when adding non-existent columns", () => {
        return request
          .post("/api/images")
          .send({
            image_title: "bat",
            category: "bat",
            pudding: "yes",
            image_url:
              "https://cdn.britannica.com/21/75121-050-8CF5E1DB/Bats-structures-organs-sound-frequencies-signals-contexts.jpg",
          })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toEqual(
              'insert into "images" ("category", "image_title", "image_url", "pudding") values ($1, $2, $3, $4) returning * - column "pudding" of relation "images" does not exist'
            );
          });
      });
    });
  });
});
