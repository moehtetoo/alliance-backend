const jwt = require('jsonwebtoken')
const config = require('../configs/auth.config')

const checkJwt = (req, res, next) => {
  const token = req.headers["auth"];
  let jwtPayload;

  try {
    jwtPayload = jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized' });
    return;
  }

  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
    expiresIn: "1h"
  });
  res.setHeader("token", newToken);
  next();
};

module.exports = checkJwt