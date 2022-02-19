const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, required: true},
  email: String,
  hasWorld: {type: Boolean, required: true},
  inPathology: Boolean,
  name: {type: String, required: true},
  psychopathId: {type: Number, required: true},
});;
