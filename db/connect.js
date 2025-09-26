// Reference for moving nodejs mongodb connection code to another file:
// https://stackoverflow.com/questions/58354629/moving-nodejs-mongodb-connection-code-to-another-file
const mongoClient = require('mongodb').MongoClient;

// Reference for using .env file: https://www.youtube.com/watch?v=S25ggtvC4AM
const dotenv = require('dotenv');
dotenv.config(); // This loads the environment variables from the .env file.

const mongoURI = process.env.MONGODB_URI;

let _db;

const initDb = callback => {
    if (_db) {
        console.log('Db is already initialized!');
        return callback(null, _db);
    }
    mongoClient.connect(mongoURI)
        .then(client => {
          _db = client;
          callback(null, _db);  
        })
        .catch(err => {
            callback(err);
        });
};

const getDb = () => {
    if (!_db) {
        throw Error('Db not initialized');
    }
    return _db;
}

module.exports = {
    initDb,
    getDb
};