function errorHandler(error, req, res, next) {
  if (error.name === "SequelizeValidationError") {
    let message = error.errors[0].message;
    res.status(400).json({ message });
  } else if (error.name === "EmptyInput") {
    res.status(400).json({ message: "email & password is required" });
  } else if (error.name === "EmptyInput1") {
    res.status(400).json({ message: "input cannot be empty" });
  } else if (
    error.name === "SequelizeUniqueConstraintError" ||
    error.name === "FileRequired" ||
    error.message === "Unexpected end of form"
  ) {
    res.status(400).json({ message: "validation error" });
  } else if (error.name === "SequelizeValidationError") {
    let error = errors[0].map((err) => {
      return err.message;
    });
  } else if (error.name === "AlreadyExists") {
    res.status(409).json({ message: "Comic is already in watchlist" });
  } else if (error.name === "InvalidInput") {
    res.status(404).json({ message: "data not found" });
  } else if (error.name === "InvalidUser") {
    res.status(401).json({ message: "invalid email or password" });
  } else if (
    error.name === "JsonWebTokenError" ||
    error.name === "InvalidToken"
  ) {
    res.status(401).json({ message: "Error authentication" });
  } else if (error.name === "Forbidden") {
    return res.status(403).json({ message: `your not authorized` });
  } else {
    res.status(500).json({ message: "internal server error" });
  }
}

module.exports = errorHandler;
