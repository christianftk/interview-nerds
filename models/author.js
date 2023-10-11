// author.js
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  dateOfDeath: {
    type: Date,
    required: false, // Optional field for living authors
  },
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
