const express = require('express');
const router = express.Router();
const db = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;

router.route('/packs').get(function (req, res) {
  const predicate = {};
  const creatorId = req.query.creatorId;
  const id = req.query.id;

  if (creatorId) {
    predicate['creatorId'] = ObjectId(creatorId);
  }

  if (id) {
    predicate['_id'] = ObjectId(id);
  }

  db.getDb('pathology')
    .collection('packs')
    .find(predicate)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = router;
