const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');

routes.get('/', lesson1Controller.dallinRoute);
routes.get('/sharlene', lesson1Controller.sharleneRoute);
// app.get('/', lesson1Controller.dallinRoute);
// app.get('/sharlene', lesson1Controller.sharleneRoute);
// app.get('/', (req, res) => {
//   res.send("Hello Dallin Stephens!");
// });

// app.get('/sharlene', (req, res) => {
//     res.send("Hello Sharlene!");
// });

module.exports = routes;