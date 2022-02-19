const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const pathologyConn = require('../connections/pathology');

router.route('/levels').get(function (req, res) {
  const predicate = {};
  const id = req.query.id;
  const packId = req.query.packId;

  if (id) {
    predicate._id = ObjectId(id);
  }

  if (packId) {
    predicate.packId = ObjectId(packId);
  }

  pathologyConn.models['Level'].find(predicate, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.route('/levels/leastmoves').get(async function (req, res) {
  const predicate = {};
  const packIds = req.query.packIds;

  if (packIds) {
    predicate.packId = {$in: packIds.split(',').map(p => ObjectId(p))};
  }

  const levels = await pathologyConn.models['Level'].find(predicate);

  // packIds mapping to levelIds mapping to leastMoves
  const result = {};
  
  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];
    const packId = level.packId;

    if (!(packId in result)) {
      result[packId] = {};
    }

    result[packId][level._id] = level.leastMoves;
  }

  res.json(result);
});

router.route('/levels/allleastmoves').get(async function (req, res) {
  const levelsAsync = pathologyConn.models['Level'].find();
  const packs = await pathologyConn.models['Pack'].find();

  // creatorIds mapping to packIds mapping to levelIds mapping to leastMoves
  const result = {};
  const packIdToCreatorId = {};

  for (let i = 0; i < packs.length; i++) {
    const pack = packs[i];
    const creatorId = pack.creatorId;

    if (!(creatorId in result)) {
      result[creatorId] = {};
    }

    result[creatorId][pack._id] = {};
    packIdToCreatorId[pack._id] = creatorId;
  }

  const levels = await levelsAsync;
  
  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];
    const packId = level.packId;
    const creatorId = packIdToCreatorId[packId];

    result[creatorId][packId][level._id] = level.leastMoves;
  }

  res.json(result);
});

module.exports = router;
