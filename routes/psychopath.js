const express = require('express');
const router = express.Router();
const db = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;

// GET universes
router.route('/psychopath/universes').get(async function (req, res) {
  const universes = await db.getDb('psychopath')
    .collection('universes')
    .find({hasWorld: true})
    .toArray();

  const creators = await db.getDb('pathology')
    .collection('creators')
    .find()
    .toArray();

  const psychopathIds = creators.map(c => c['psychopathId']);

  for (let i = 0; i < universes.length; i++) {
    if (psychopathIds.includes(universes[i]['psychopathId'])) {
      universes[i]['inPathology'] = true;
    }
  }
  
  res.json(universes);
});

// GET worlds by universeId
router.route('/psychopath/worlds/:universeId').get(async function (req, res) {
  const worldsAsync = db.getDb('psychopath')
    .collection('worlds')
    .find({universeId: ObjectId(req.params.universeId)})
    .toArray();

  const packs = await db.getDb('pathology')
    .collection('packs')
    .find()
    .toArray();

  const psychopathIds = packs.map(p => p['psychopathId']);
  const worlds = await worldsAsync;

  for (let i = 0; i < worlds.length; i++) {
    if (psychopathIds.includes(worlds[i]['psychopathId'])) {
      worlds[i]['inPathology'] = true;
    }
  }
  
  res.json(worlds);
});

// GET levels by worldId
router.route('/psychopath/levels/:worldId').get(async function (req, res) {
  const levelsAsync = db.getDb('psychopath')
    .collection('levels')
    .find({worldId: ObjectId(req.params.worldId)})
    .toArray();

  const pathologyLevels = await db.getDb('pathology')
    .collection('levels')
    .find()
    .toArray();

  const psychopathIds = pathologyLevels.map(p => p['psychopathId']);
  const levels = await levelsAsync;

  for (let i = 0; i < levels.length; i++) {
    if (psychopathIds.includes(levels[i]['psychopathId'])) {
      levels[i]['inPathology'] = true;
    }
  }
  
  res.json(levels);
});

// GET reviews by levelId
router.route('/psychopath/reviews/:levelId').get(async function (req, res) {
  const reviews = await db.getDb('psychopath')
    .collection('reviews')
    .find({levelId: ObjectId(req.params.levelId)})
    .toArray();
  
  const universes = reviews.map(r => db.getDb('psychopath')
    .collection('universes')
    .find({'_id': r['universeId']})
    .toArray());

  for (let i = 0; i < universes.length; i++) {
    const universe = await universes[i];
    reviews[i]['name'] = universe[0]['name'];
  }

  res.json(reviews);
});

module.exports = router;
