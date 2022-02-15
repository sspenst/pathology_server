const express = require('express');
const router = express.Router();
const db = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;

router.route('/levels').get(function (req, res) {
  const predicate = {};
  const id = req.query.id;
  const packId = req.query.packId;

  if (id) {
    predicate['_id'] = ObjectId(id);
  }

  if (packId) {
    predicate['packId'] = ObjectId(packId);
  }

  db.getDb('pathology')
    .collection('levels')
    .find(predicate)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = router;
