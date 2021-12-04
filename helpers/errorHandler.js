class ErrorHandler {
  errorLogger(error, req, res, next) {
    console.error(error);
    next(error);
  }

  errorResponder(error, req, res) {
    if (error.type === 'time-out') {
      res.status(408).send(error.message);
    } else {
      res.status(409).send(error.message);
    }
  }
}

module.exports = new ErrorHandler();
