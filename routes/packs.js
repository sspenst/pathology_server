const express = require('express');
const router = express.Router();
const db = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;

// GET packs by creatorid
router.route('/packs/:creatorid').get(function (req, res) {
  db.getDb()
    .collection('packs')
    .find({ creator: ObjectId( req.params.creatorid )})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = router;
