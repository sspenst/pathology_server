const mongoose = require('mongoose');

const connection = mongoose.createConnection(
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

module.exports = {
  psychopathConn: connection,
  PsychopathLevel: connection.model('Level', require('../schemas/psychopath/level')),
  Review: connection.model('Review', require('../schemas/psychopath/review')),
  Universe: connection.model('Universe', require('../schemas/psychopath/universe')),
  World: connection.model('World', require('../schemas/psychopath/world')),
}
