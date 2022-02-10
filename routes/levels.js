const express = require('express');
const router = express.Router();
const db = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;

// GET levels by packId
router.route('/levels/:packId').get(function (req, res) {
  db.getDb('pathology')
    .collection('levels')
    .find({packId: ObjectId(req.params.packId)})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = router;
