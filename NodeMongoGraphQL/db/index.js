const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect('mongodb://localhost/blogdb');
  console.log('MongoDB Connected');
};

module.exports = { connectDB };
