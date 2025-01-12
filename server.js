// express web server
// References:
// https://codeforgeek.com/express-nodejs-tutorial/
// https://youtu.be/K00J87SofEc
// https://cse341.netlify.app/lesson1#newRepo
const express = require('express');
const app = express();

// const lesson1Controller = require('./controllers/lesson1');

// app.get('/', lesson1Controller.dallinRoute);
// app.get('/sharlene', lesson1Controller.sharleneRoute);
// app.get('/', (req, res) => {
//   res.send("Hello Dallin Stephens!");
// });

// app.get('/sharlene', (req, res) => {
//     res.send("Hello Sharlene!");
// });

const routes = require('./routes');
const port = 3000;

app.use('/', routes);
// app.use('/', require('./routes'));
// app.use('/', require('./routes/index'));

// If Render will use process.env.PORT. Otherwise, it will use port 3000 (localhost: 3000).
app.listen(process.env.PORT || port, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || port));
});

// Reference: https://www.npmjs.com/package/nodemon
// This makes it so that the localhost will change automatically with each change.
// npm install --save-dev nodemon