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

router.route('/levels/leastmoves').get(async function (req, res) {
  const predicate = {};
  const packIds = req.query.packIds;

  if (packIds) {
    predicate['packId'] = {$in: packIds.split(',').map(p => ObjectId(p))};
  }

  const levels = await db.getDb('pathology')
    .collection('levels')
    .find(predicate)
    .toArray();

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
  const levelsAsync = db.getDb('pathology')
    .collection('levels')
    .find()
    .toArray();

  const packs = await db.getDb('pathology')
    .collection('packs')
    .find()
    .toArray();

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
