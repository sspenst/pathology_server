const { MongoClient } = require('mongodb');
const atlasUri = process.env.ATLAS_URI;
const client = new MongoClient(atlasUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good 'db' object
      if (db)
      {
        _db = db;
        console.log('Successfully connected to MongoDB.');
      }

      return callback(err);
    });
  },
  getDb: function (db) {
    return _db.db(db);
  },
};
