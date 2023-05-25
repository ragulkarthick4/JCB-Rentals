const mongoose = require('mongoose');

const newNameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  }
});

const NewName = mongoose.model('Name', newNameSchema);

module.exports = NewName;
