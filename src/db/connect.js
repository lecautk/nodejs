const mongoose = require('mongoose');
const PASSWORD = process.env.PASSWORD || 'abcd1234';
const DB_USERNAME = process.env.DB_USERNAME || 'list_truyen';
const connectString = `mongodb+srv://vnsdrking:${PASSWORD}@vnsdrking.1bmd9om.mongodb.net/${DB_USERNAME}`; // Update with your MongoDB connection string

const connectDB = async () => {
  try {
    await mongoose.connect(connectString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Failed to connect to the database', error);
    process.exit(1);
  }
};

module.exports = connectDB;