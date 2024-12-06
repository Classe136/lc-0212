function errorsHandler(err, req, res, next) {
  //console.error(err.stack);

  res.status(500);
  res.json({
    error: err.message,
  });
}

module.exports = errorsHandler;
