const mongoose = require('mongoose');
const PASSWORD = process.env.PASSWORD;
const DB_USERNAME = process.env.DB_USERNAME;
const connectString = `mongodb+srv://vnsdrking:${PASSWORD}@vnsdrking.1bmd9om.mongodb.net/${DB_USERNAME}`;
const connectDB = async () => {
  try {
    await mongoose.connect(connectString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database ' + DB_USERNAME);
  } catch (error) {
    console.error('Failed to connect to the database', error);
    process.exit(1);
  }
};

module.exports = connectDB;