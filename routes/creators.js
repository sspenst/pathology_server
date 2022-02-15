const express = require('express');
const router = express.Router();
const db = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;

router.route('/creators').get(function (req, res) {
  const predicate = {};
  const id = req.query.id;

  if (id) {
    predicate['_id'] = ObjectId(id);
  }

  db.getDb('pathology')
    .collection('creators')
    .find(predicate)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = router;
