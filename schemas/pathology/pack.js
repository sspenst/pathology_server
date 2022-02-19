const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, required: true},
  creatorId: {type: mongoose.Schema.Types.ObjectId, required: true},
  name: {type: String, required: true},
  psychopathId: Number,
});
