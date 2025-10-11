// Resources for node and express tutorial:
// https://www.youtube.com/watch?v=K00J87SofEc
// https://codeforgeek.com/express-nodejs-tutorial/

// express web server
const express = require('express');
// CORS 
const cors = require('cors');
// const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app
  .use(express.json())
  .use(cors())
  // .use(body-parser.json())
  // .use((req, res, next) => {
  //     res.setHeader('Access-Control-Allow-Origin', '*');
  //     res.setHeader(
  //       'Access-Control-Allow-Headers',
  //       'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  //     );
  //     res.setHeader('Content-Type', 'application/json');
  //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  //     next();
  // })
  .use('/contacts/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use('/contacts', require('./routes/contacts')); // same as app.use('/', require('./routes/index'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT);
    console.log(`Web Server is listening at port ${PORT}.`);
    console.log(`Access at http://localhost:${PORT}/contacts/api-docs`);
  }
});
