const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRouter = require("./routes/index");
const { psqlErrors } = require("./errors");

app.use(cors());

app.use(bodyParser.json());
app.use("/api", apiRouter);

app.use("/*", (req, res, next) => next({ status: 404, msg: "Page not found" }));
app.use(psqlErrors);
app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
