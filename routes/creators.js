const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const { Creator } = require('../connections/pathology');

router.get('/creators', function (req, res) {
  const predicate = {};
  const id = req.query.id;

  if (id) {
    predicate._id = ObjectId(id);
  }

  Creator.find(predicate, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
