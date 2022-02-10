const express = require('express');
const router = express.Router();
const db = require('../db/conn');

// GET creators
router.route('/creators').get(function (req, res) {
  db.getDb('pathology')
    .collection('creators')
    .find()
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = router;
