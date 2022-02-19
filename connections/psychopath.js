const mongoose = require('mongoose');

const psychopathConn = mongoose.createConnection(
  process.env.PSYCHOPATH_URI,
  {useNewUrlParser: true, useUnifiedTopology: true},
  function(err) {
    if (err) {
      throw err;
    } else {
      console.log('Successfully connected to psychopath DB');
    }
  }
);

psychopathConn.model('Level', require('../schemas/psychopath/level'));
psychopathConn.model('Review', require('../schemas/psychopath/review'));
psychopathConn.model('Universe', require('../schemas/psychopath/universe'));
psychopathConn.model('World', require('../schemas/psychopath/world'));

module.exports = psychopathConn;
