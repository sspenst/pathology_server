const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, required: true},
  inPathology: Boolean,
  name: {type: String, required: true},
  psychopathId: {type: Number, required: true},
  worldId: {type: mongoose.Schema.Types.ObjectId, required: true},
});
