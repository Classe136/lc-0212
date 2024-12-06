function errorsHandler(err, req, res, next) {
  console.error(err.stack.split("\n")[1]);
  //console.log(err);
  res.status(err.statusCode || 500);
  res.json({
    error: err.message,
  });
}

module.exports = errorsHandler;
