const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const { Creator, Level, Pack } = require('../connections/pathology');
const { PsychopathLevel, Review, Universe, World } = require('../connections/psychopath');

// GET universes
router.get('/psychopath/universes', async function (req, res) {
  const universesAsync = Universe.find({hasWorld: true});
  const creators = await Creator.find();
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
router.get('/psychopath/worlds/:universeId', async function (req, res) {
  const worldsAsync = World.find({
    universeId: ObjectId(req.params.universeId),
  });
  const packs = await Pack.find();
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
router.get('/psychopath/levels/:worldId', async function (req, res) {
  const levelsAsync = PsychopathLevel.find({
    worldId: ObjectId(req.params.worldId)
  });
  const pathologyLevels = await Level.find();
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
router.get('/psychopath/reviews/:levelId', async function (req, res) {
  const reviews = await Review.find({
    levelId: ObjectId(req.params.levelId)
  });
  const universes = reviews.map(
    r => Universe.find({_id: r.universeId})
  );

  for (let i = 0; i < universes.length; i++) {
    const universe = await universes[i];
    reviews[i].name = universe[0].name;
  }

  res.json(reviews);
});

module.exports = router;
