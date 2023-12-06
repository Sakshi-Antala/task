
require("dotenv").config();
const express = require('express');
const app = express();
var mongoose = require('./db/index');
const server = require('http').createServer(app);
const cors = require('cors');
require('./utils/helpers/passport');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 8000;
app.get('/', (req, res) => {
  res.send('Server is up!');
});


require('./routes')(app);


server.listen(PORT, () => {

  console.log(`Server running at http://localhost:${PORT}/`);
});


module.exports = app