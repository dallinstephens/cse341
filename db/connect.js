// Reference for moving nodejs mongodb connection code to another file:
// https://stackoverflow.com/questions/58354629/moving-nodejs-mongodb-connection-code-to-another-file
const mongoClient = require('mongodb').MongoClient;

// Reference for using .env file: https://www.youtube.com/watch?v=S25ggtvC4AM
const dotenv = require('dotenv');

dotenv.config(); // This loads the environment variables from the .env file.

const mongoURI = process.env.MONGODB_URI;

let db;

const initDb = (callback) => {
  if (db) {
    console.log('Db is already initialized!');
    return callback(null, db);
  }
  return mongoClient
    .connect(mongoURI)
    .then(async (client) => {
      db = client;

      // Reference for create index: db.collection.createIndex( <keys>, <options>, <commitQuorum>)
      // https://www.mongodb.com/docs/manual/reference/method/db.collection.createIndex/
      // Reference for drop index: db.collection.drop( { writeConcern: <document> } )
      // https://www.mongodb.com/docs/manual/reference/method/db.collection.dropIndex/
      // Indexes are used to find documents quicker.

      // const contactsCollection = await db.db("cse341db").collection("contacts");

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

      // This is used if I want to drop indexes later after I created them.
      // try {
      //   // This is used if I want to drop the lastName index that was created:
      //   await db.db("cse341db").collection("contacts").dropIndex("lastName_index");

      //   // This is used if I want to drop the email index that was created:
      //   await db.db("cse341db").collection("contacts").dropIndex("email_unique_index");

      //   console.log("Indexes successfully dropped or were already dropped.");
      // } catch (error) {
      //   if (error.codeName !== 'IndexNotFound') {
      //     console.error("Error occurred during index drop:", error);
      //   }
      // }

      callback(null, db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!db) {
    throw Error('Db not initialized');
  }
  return db;
};

module.exports = {
  initDb,
  getDb,
};
