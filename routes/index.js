const routes = require('express').Router();
const baseController = require('../controllers');
// const baseController = require('../controllers/index.js');


routes.get('/', baseController.getName);
routes.get('/myname', baseController.getMyName);
// app.get('/', lesson1Controller.dallinRoute);
// app.get('/sharlene', lesson1Controller.sharleneRoute);
// app.get('/', (req, res) => {
//   res.send("Hello Dallin Stephens!");
// });

// app.get('/sharlene', (req, res) => {
//     res.send("Hello Sharlene!");
// });

module.exports = routes;