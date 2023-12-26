const crypto = require('crypto');

const generateJWTSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

const secretKey = generateJWTSecretKey();
console.log('JWT Secret Key:', secretKey);
