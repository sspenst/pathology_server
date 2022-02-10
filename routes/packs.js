const express = require('express');
const router = express.Router();
const db = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;

// GET packs by creatorId
router.route('/packs/:creatorId').get(function (req, res) {
  db.getDb('pathology')
    .collection('packs')
    .find({creatorId: ObjectId(req.params.creatorId)})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = router;
