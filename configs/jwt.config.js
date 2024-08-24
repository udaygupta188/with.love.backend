require('dotenv').config();

module.exports = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'fnvSilentdksfhgEyefvng',
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME || '1h',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'fnvSilentdksfhgEyefvngRefreshnfrn',
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRY_TIME || '7d',
  sessionTokenSecret: process.env.SESSION_TOKEN_SECRET ||  'sessionhghtokenjBhjdshfwithlovJhgYiO',
  sessionTokenExpiresIn: process.env.SESSION_TOKEN_EXPIRY_TIME || '30d'
};
