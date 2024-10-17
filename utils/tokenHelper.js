const jwt = require('jsonwebtoken');
const Admin = require('../modules/admin/adminProfile/model');

const {
  accessTokenSecret,
  refreshTokenSecret,
  accessTokenExpiresIn,
  refreshTokenExpiresIn,
  sessionTokenSecret, // Add session token secret to your config
  sessionTokenExpiresIn // Add session token expiration to your config
} = require('../configs/jwt.config');

// Generate Access Token
const generateAccessToken = (userOrAdmin) => {
  return jwt.sign({ id: userOrAdmin._id, role: userOrAdmin instanceof Admin ? 'admin' : 'user' }, accessTokenSecret, { expiresIn: accessTokenExpiresIn });
};


// Generate Refresh Token
const generateRefreshToken = (userOrAdmin) => {
  return jwt.sign(
    { id: userOrAdmin._id },
    refreshTokenSecret,
    { expiresIn: refreshTokenExpiresIn }
  );
};

// Generate Session Token
const generateSessionToken = (userOrAdmin) => {
  return jwt.sign(
    { id: userOrAdmin._id },
    sessionTokenSecret,
    { expiresIn: sessionTokenExpiresIn }
  );
};

// Verify Token
const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = { generateAccessToken, generateRefreshToken, generateSessionToken, verifyToken };
