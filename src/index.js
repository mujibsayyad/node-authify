const jwt = require('jsonwebtoken');

const checkAuth = (secretKey) => (req, res, next) => {
  console.log('secretKey', secretKey);
  const token = req.headers.authorization.split(' ')[1];
  console.log("🚀 req.headers.authorization:", req.headers.authorization)
  console.log('token', token);
  	
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
