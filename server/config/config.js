require('dotenv').config();

module.exports = {
  SECRET_KEY: process.env.SECRET_KEY,
  MONGO_URI: process.env.MONGO_URI,
};
