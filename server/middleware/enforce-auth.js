module.exports = () => {
  const R = require('ramda');
  return (req, res, next) => {
    // adding dummy token to check requested valid user with token
    req.headers['x-jwt-assertion'] = 'YTMwOTI5NjUtNmVmYi0zNmM2LThjZTctYzJmNmU4NjJhMWNi';
    if (typeof req.headers['x-jwt-assertion'] !== 'undefined') {
      const jwtDecode = require('jwt-decode');
      // commented verification
      // req.JWTtoken = jwtDecode(req.headers['x-jwt-assertion']);
      return next();
    } else {
      const error = new Error('Authorization required');
      error.statusCode = 401;
      return next(error);
    }
  };
};
