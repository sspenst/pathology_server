const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const pathologyConn = require('../connections/pathology');

router.route('/creators').get(function (req, res) {
  const predicate = {};
  const id = req.query.id;

  if (id) {
    predicate._id = ObjectId(id);
  }

  pathologyConn.models['Creator'].find(predicate, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
