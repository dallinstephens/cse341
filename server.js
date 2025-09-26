// Resources for node and express tutorial:
// https://www.youtube.com/watch?v=K00J87SofEc
// https://codeforgeek.com/express-nodejs-tutorial/

// express web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const url = `http://localhost:${port}`;
const mongodb = require('./db/connect');

app
    .use(bodyParser.json())
    .use(cors())
    // .use((req, res, next) => {
    //     res.setHeader('Access-Control-Allow-Origin', '*');
    //     next();
    // })
    .use('/', require('./routes/contacts')); // same as app.use('/', require('./routes/index'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log('Web Server is listening at ' + url);
  }
});