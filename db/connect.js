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
        .then(async client => {
          _db = client;

          // Reference for create index: db.collection.createIndex( <keys>, <options>, <commitQuorum>)
          // https://www.mongodb.com/docs/manual/reference/method/db.collection.createIndex/
          // Reference for drop index: db.collection.drop( { writeConcern: <document> } )
          // https://www.mongodb.com/docs/manual/reference/method/db.collection.dropIndex/
          // Indexes are used to find documents quicker.  

          // const contactsCollection = await _db.db("cse341db").collection("contacts");

          // await contactsCollection.createIndex(
          //   // 1 means sorting alphabetically in ascending order
          //   // -1 means sorting alphaetcially in descending order
          //   { lastName: 1 },
          //   { name: "lastName_index"}  
          // );
          
          // await contactsCollection.createIndex(
          //   { email: 1 },
          //   { unique: true, name: "email_unique_index"}
          // )

          // console.log('Database connected and single indexes for lastName and email created.');

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