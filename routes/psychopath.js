const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const pathologyConn = require('../connections/pathology');
const psychopathConn = require('../connections/psychopath');

// GET universes
router.route('/psychopath/universes').get(async function (req, res) {
  const universesAsync = psychopathConn.models['Universe'].find({hasWorld: true});
  const creators = await pathologyConn.models['Creator'].find();
  const psychopathIds = creators.map(c => c.psychopathId).filter(id => id);
  const universes = await universesAsync;

  for (let i = 0; i < universes.length; i++) {
    if (psychopathIds.includes(universes[i].psychopathId)) {
      universes[i].inPathology = true;
    }
  }
  
  res.json(universes);
});

// GET worlds by universeId
router.route('/psychopath/worlds/:universeId').get(async function (req, res) {
  const worldsAsync = psychopathConn.models['World'].find({
    universeId: ObjectId(req.params.universeId),
  });
  const packs = await pathologyConn.models['Pack'].find();
  const psychopathIds = packs.map(p => p.psychopathId).filter(id => id);
  const worlds = await worldsAsync;

  for (let i = 0; i < worlds.length; i++) {
    if (psychopathIds.includes(worlds[i].psychopathId)) {
      worlds[i].inPathology = true;
    }
  }
  
  res.json(worlds);
});

// GET levels by worldId
router.route('/psychopath/levels/:worldId').get(async function (req, res) {
  const levelsAsync = psychopathConn.models['Level'].find({
    worldId: ObjectId(req.params.worldId)
  });
  const pathologyLevels = await pathologyConn.models['Level'].find();
  const psychopathIds = pathologyLevels.map(p => p.psychopathId);
  const levels = await levelsAsync;

  for (let i = 0; i < levels.length; i++) {
    if (psychopathIds.includes(levels[i].psychopathId)) {
      levels[i].inPathology = true;
    }
  }
  
  res.json(levels);
});

// GET reviews by levelId
router.route('/psychopath/reviews/:levelId').get(async function (req, res) {
  const reviews = await psychopathConn.models['Review'].find({
    levelId: ObjectId(req.params.levelId)
  });
  const universes = reviews.map(
    r => psychopathConn.models['Universe'].find({_id: r.universeId})
  );

  for (let i = 0; i < universes.length; i++) {
    const universe = await universes[i];
    reviews[i].name = universe[0].name;
  }

  res.json(reviews);
});

module.exports = router;
