const express = require('express');
const router = express.Router();
const db = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;

// GET packs by packid
router.route('/levels/:packid').get(function (req, res) {
  db.getDb()
    .collection('levels')
    .find({ pack: ObjectId( req.params.packid )})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = router;
