const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, required: true},
  author: {type: String, required: true},
  data: {type: String, required: true},
  height: {type: Number, required: true},
  leastMoves: {type: Number, required: true},
  name: {type: String, required: true},
  packId: {type: mongoose.Schema.Types.ObjectId, required: true},
  psychopathId: Number,
  width: {type: Number, required: true},
});;
