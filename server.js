// Resources for node and express tutorial:
// https://www.youtube.com/watch?v=K00J87SofEc
// https://codeforgeek.com/express-nodejs-tutorial/

// express web server
const express = require('express');
const app = express();

const localhostPort = 3000;

app.use('/', require('./routes')); // same as app.use('/', require('./routes/index'));

app.listen(process.env.PORT || localhostPort, () => {
    console.log('Web Server is listening at port ' + (process.env.PORT || 3000) + '.');
})