// References on how to get started with creating swagger.js:
// https://www.npmjs.com/package/swagger-autogen?activeTab=readme#documentation
// https://swagger-autogen.github.io/docs/getting-started/quick-start
// https://www.npmjs.com/package/swagger-ui-express
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'This is a Contacts API for CSE 341.'
    },
    // host: 'localhost:3000',
    host: 'cse341-8k60.onrender.com',
    schemes: ['https'],
    definitions: {
        Contact: {
            firstName: 'Dallin',
            lastName: 'Stephens',
            email: 'dallinstephens1@gmail.com',
            favoriteColor: 'Red',
            birthday: 'December 20'        
        }
    }    
}

const outputFile = './swagger.json';

// It is called endpointsFiles because [] indicate an array of items even though
// in this case there is only one endpoints file which is routes/index.js.
// npm run swagger is needed after comments are added or changed to show up in localhost:8080/api-docs.
const endpointsFiles = ['./routes/contacts.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);