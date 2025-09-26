// References:
// https://www.youtube.com/watch?v=ZuT8rk0Ssfk
// https://www.youtube.com/watch?v=S25ggtvC4AM
// Reference to use mongodb in this file: https://stackoverflow.com/questions/58354629/moving-nodejs-mongodb-connection-code-to-another-file
// https://github.com/byui-cse/cse341-code-student/tree/L02-team-solution-stretch
const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');


const contactsMenu = (req, res) => {
      res.status(200).send(`
        <h1>Contacts Menu:</h1>
        <h2>Select one of the following:</h2>
        <p>
          <a href="/contacts/">View all contacts</a><br>
          <a href="/contacts/single">View a single contact</a><br>
        </p>`
      );
};

const getAllContacts = async (req, res) => {
  try {
    const result = await mongodb.getDb().db("lesson2").collection("contacts").find();
    const lists = await result.toArray();
    if (lists.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    }
    else {
      res.status(404).json({message: 'No json found.'});
    }
  } catch (error) {
    res.status(505).json({message: 'An error occurred while retrieving contacts.'})
  }  
}

contacts = [
  { name: "Barbara Stephens", id: "68d366e449379c1b0d7a8595"},
  { name: "Corbin Stephens", id: "68d3674c49379c1b0d7a8596"},
  { name: "Quentin Stephens", id: "68d367d349379c1b0d7a8597"},
  { name: "Shlenae McBride", id: "68d368cc49379c1b0d7a8598"}
];

const getSingleContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.query.id);
    const result = await mongodb.getDb().db("lesson2").collection("contacts").findOne({_id: contactId});

    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    }
    else {
      const htmlLinks = contacts.map(contact =>
        `<a href="/contacts/single?id=${contact.id}">${contact.name}</a><br>`
      ).join('');
      res.status(200).send(`
        <h1>Choose a contact:</h1>
        <p>${htmlLinks}</p>`);
      // res.status(404).json({message: `An id parameter is missing.`});
    }
  } catch (error) {
      res.status(505).json({message: 'An error happened while the contact.'});
  }
}

module.exports = { contactsMenu, getAllContacts, getSingleContact };