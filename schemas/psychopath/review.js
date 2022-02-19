const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, required: true},
  levelId: {type: mongoose.Schema.Types.ObjectId, required: true},
  name: String,
  psychopathId: {type: Number, required: true},
  score: {type: Number, required: true},
  text: {type: String, required: true},
  ts: {type: Number, required: true},
  universeId: {type: mongoose.Schema.Types.ObjectId, required: true},
});;
