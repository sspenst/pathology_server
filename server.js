const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(require('./routes/creators'));
app.use(require('./routes/levels'));
app.use(require('./routes/packs'));
app.use(require('./routes/psychopath'));

let isPathologyConnected = false;
let isPsychopathConnected = false;

function readyToListen() {
  return isPathologyConnected && isPsychopathConnected;
}

function listen() {
  if (readyToListen()) {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  }
}

const pathologyConn = require('./connections/pathology');
const psychopathConn = require('./connections/psychopath');

pathologyConn.once('open', function() {
  isPathologyConnected = true;
  listen();
});

psychopathConn.once('open', function() {
  isPsychopathConnected = true;
  listen();
});
