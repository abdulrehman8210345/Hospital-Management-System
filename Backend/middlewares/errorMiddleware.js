export const errorObject = (message, statuscode) => {
  return {
    message: message,
    statuscode: statuscode
  }
  
};

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statuscode = err.statuscode || 500;

  if (err.code === 11000) {
    const mssg = `Duplicate ${Object.keys(err.keys)} Entered`;
    err = new errorObject(mssg, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const mssg = "Json Web Token is invalid. Try again!";
    err = new errorObject(mssg, 400);
  }
  if (err.name === "TokenExpiredError") {
    const mssg = "Json Web Token is expired. Try again!";
    err = new errorObject(mssg, 400);
  }
  if (err.name === "CastError") {
    const mssg = `Invalid ${err.path}`;
    err = new errorObject(mssg, 400);
  }

  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((errr) => errr.message)
        .join(" ")
    : err.message;

  return res.status(err.statuscode).json({
    success: false,
    message: errorMessage,
  });
};
