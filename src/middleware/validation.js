export default (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log("error", error);

    if (error) {
      return res
        .status(400)
        .json({ message: "Bad request. Check provided data", error: error });
    }
    return next();
  };
};
