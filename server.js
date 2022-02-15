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
// get driver connection
const dbo = require('./db/conn');
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});