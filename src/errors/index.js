exports.send405Error = (req, res, next) => {
  res.status(405).send({ msg: "method not allowed" });
};

exports.psqlErrors = (err, req, res, next) => {
  const psqlCodes = ["22P02", "23502", "42703"];
  if (psqlCodes.includes(err.code))
    res.status(400).send({ msg: err.message || "Bad Request" });
  else next(err);
};
