const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const pathologyConn = require('../connections/pathology');

router.route('/packs').get(function (req, res) {
  const predicate = {};
  const creatorId = req.query.creatorId;
  const id = req.query.id;

  if (creatorId) {
    predicate.creatorId = ObjectId(creatorId);
  }

  if (id) {
    predicate._id = ObjectId(id);
  }

  pathologyConn.models['Pack'].find(predicate, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
