
export const catchedAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res).catch((err) => next(err));
    };
};

export const response = (res, statusCode, data) => {
    res.status(statusCode).json({
      status: 'success',
      data
    });
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    status: 'error',
    message,
  });
};

export default errorHandler;
