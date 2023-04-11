const jwt = require('jsonwebtoken');

const checkAuth = (secretKey) => (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'No Token, Authentication failed!',
    });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken;

    next();
  } catch (error) {
    console.log('checkAuth error', error);
    res.status(401).json({
      message: 'checkAuth Unauthorized: token invalid',
    });
  }
};

module.exports = checkAuth;
