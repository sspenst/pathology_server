const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const { Pack } = require('../connections/pathology');

router.get('/packs', function (req, res) {
  const predicate = {};
  const creatorId = req.query.creatorId;
  const id = req.query.id;

  if (creatorId) {
    predicate.creatorId = ObjectId(creatorId);
  }

  if (id) {
    predicate._id = ObjectId(id);
  }

  Pack.find(predicate, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
