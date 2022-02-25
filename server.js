const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 8000;
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.ORIGIN,
}));
app.use(express.json());
app.use(require('./routes/creators'));
app.use(require('./routes/levels'));
app.use(require('./routes/packs'));
app.use(require('./routes/psychopath'));
app.use(require('./routes/users'));

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

const { pathologyConn } = require('./connections/pathology');
const { psychopathConn } = require('./connections/psychopath');

pathologyConn.once('open', function() {
  isPathologyConnected = true;
  listen();
});

psychopathConn.once('open', function() {
  isPsychopathConnected = true;
  listen();
});
