const mongoose = require('mongoose');

const connection = mongoose.createConnection(
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

module.exports = {
  Creator: connection.model('Creator', require('../schemas/pathology/creator')),
  Level: connection.model('Level', require('../schemas/pathology/level')),
  Pack: connection.model('Pack', require('../schemas/pathology/pack')),
  pathologyConn: connection,
  User: connection.model('User', require('../schemas/pathology/user')),
}
