const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const { searchRoles } = require('./Controller/Roles');
const { fetch_fn } = require('./Middlewares');
const cors = require('cors')

// serve static files from public directory
const rootDir = path.resolve(__dirname);
app.use(cors());
app.use(express.static(rootDir));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//Routes
app.post('/searchRoles', function (req, res, next) { searchRoles(req, res, next); });
app.get('/*', function (req, res, next) { fetch_fn(req, res, next); });

var listenPort = process.env.PORT || 3000

app.listen(listenPort, function () {
  console.log('Listening Port:', listenPort)
});
