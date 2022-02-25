const express = require('express');
const router = express.Router();
const { Level, User } = require('../connections/pathology');
const jwt = require('jsonwebtoken');
const withAuth = require('../middleware');

function addTokenCookie(res, email) {
  // Issue token
  const payload = { email };
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: '1d'
  });
  res.cookie('token', token, { httpOnly: true, maxAge: 86400, sameSite: 'none', secure: true });
}

router.post('/signup', function(req, res) {
  const { email, name, password } = req.body;
  const user = new User({
    email: email,
    name: name,
    password: password
  });

  user.save(function(err) {
    if (err) {
      res.status(500)
        .send("Error registering new user please try again.");
    } else {
      addTokenCookie(res, email);
      res.sendStatus(200);
    }
  });
});

router.post('/login', function(req, res) {
  const { email, password } = req.body;

  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401).json({
        error: 'Incorrect email or password'
      });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500).json({
            error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401).json({
            error: 'Incorrect email or password'
          });
        } else {
          addTokenCookie(res, email);
          res.sendStatus(200);
        }
      });
    }
  });
});

router.get('/leaderboard', async function(req, res) {
  const levelsAsync = Level.find();
  const users = await User.find();
  const levels = await levelsAsync;
  const leastMoves = {};
  const result = [];

  for (let i = 0; i < levels.length; i++) {
    leastMoves[levels[i]._id] = levels[i].leastMoves;
  }

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const moves = user.getMoves();
    let completed = 0;

    for (let levelId in moves) {
      if (moves[levelId] <= leastMoves[levelId]) {
        completed++;
      }
    }

    result.push({
      completed: completed,
      name: user.name,
    });
  }

  res.json(result);
});

router.get('/logout', withAuth, function(req, res) {
  res.clearCookie('token', { httpOnly: true, sameSite: 'none', secure: true }).sendStatus(200);
});

router.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

router.get('/user', withAuth, function(req, res) {
  User.findOne({ email: req.email }, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.send(user.toJSON());
    }
  });
});

router.get('/moves', withAuth, function(req, res) {
  User.findOne({ email: req.email }, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.send(user.getMoves());
    }
  });
});

router.put('/moves', withAuth, function(req, res) {
  const { levelId, moves } = req.body;

  User.findOne({email: req.email}, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      const userMoves = user.getMoves();
      const bestMoves = userMoves[levelId];

      if (!bestMoves || moves < bestMoves) {
        userMoves[levelId] = moves;

        User.updateOne({email: req.email}, {moves: JSON.stringify(userMoves)}, function(err, user) {
          if (err) {
            res.send(err);
          } else {
            res.send(user);
          }
        });
      } else {
        res.send(user);
      }
    }
  });
});

module.exports = router;
