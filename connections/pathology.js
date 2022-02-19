const mongoose = require('mongoose');

const pathologyConn = mongoose.createConnection(
  process.env.PATHOLOGY_URI,
  {useNewUrlParser: true, useUnifiedTopology: true},
  function(err) {
    if (err) {
      throw err;
    } else {
      console.log('Successfully connected to pathology DB');
    }
  }
);

pathologyConn.model('Creator', require('../schemas/pathology/creator'));
pathologyConn.model('Level', require('../schemas/pathology/level'));
pathologyConn.model('Pack', require('../schemas/pathology/pack'));

module.exports = pathologyConn;
