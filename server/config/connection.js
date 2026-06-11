const mongoose = require('mongoose');
require('dotenv').config();

const databaseUrl = process.env.MONGODB_URI || process.env.DB_URL;

if (!databaseUrl) {
  throw new Error('Missing MongoDB connection string. Add MONGODB_URI or DB_URL to your .env file.');
}

mongoose.connect(databaseUrl);

module.exports = mongoose.connection;