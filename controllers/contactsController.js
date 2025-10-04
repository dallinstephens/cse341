// References:
// https://www.youtube.com/watch?v=ZuT8rk0Ssfk
// https://www.youtube.com/watch?v=S25ggtvC4AM
// Reference to use mongodb in this file: https://stackoverflow.com/questions/58354629/moving-nodejs-mongodb-connection-code-to-another-file
// https://github.com/byui-cse/cse341-code-student/tree/L02-team-solution-stretch
const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');
const ContactModel = require('../models/ContactModel');

const deleteContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);

  // Note: The request body is not needed to delete a document.

  try {
    // Reference for updateOne:
    // https://www.mongodb.com/docs/drivers/node/current/crud/update/modify/
    const result = await mongodb.getDb().db("cse341db").collection("contacts").deleteOne({_id: contactId});

    // This is used to confirm that the contact update was successful.
    // .modifiedCount is a property of mongodb and checks if update is different than what is there.
    if (result.deletedCount > 0) {
      // A status of 200 is used when DELETE is successful.
      // When it is successful, it will say "200 (OK)".
      return res.status(200).json();
    }  

    // A status of 404 means something is not found.
    return res.status(404).json({message: `The contact with id ${contactId} failed to delete because that id was not found.`});
  } catch (error) {
    return res.status(500).json({message: error.message || 'There was an internal server error.'});
  }
}

const updateContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);

  // This gets the updated contact data from the request body.
  const updateContactData = req.body;

  try {
    // Reference for updateOne:
    // https://www.mongodb.com/docs/drivers/node/current/crud/update/modify/
    const result = await mongodb.getDb().db("cse341db").collection("contacts").updateOne(
      {_id: contactId},
      {$set: updateContactData}
    );

    // This is used to confirm that the contact update was successful.
    // .modifiedCount is a property of mongodb and checks if update is different than what is there.
    if (result.modifiedCount > 0) {
      // A status of 204 is used when PUT is successful.
      // When it is successful, it will say "204 No Content".
      return res.status(204).json({message: `The contact with id ${contactId} was successfully updated.`});
    }  

    // A status of 404 means something is not found.
    return res.status(404).json({message: `The contact with id ${contactId} failed to update because that id was not found or there was no change in the body for that id.`});
  } catch (error) {
    return res.status(500).json({message: error.message || 'There was an internal server error.'});
  }
}

const createContact = async (req, res) => {
  if (!ContactModel.isValid(req.body)) {
    // The return statement exits the function createContact and so the line
    // const newContact = ContactModel.secureData(req.body); is not ran next.
    return res.status(400).json({message: 'You are missing one or more required fields.'});
  }

  const newContact = ContactModel.secureData(req.body);

  try {
    const result = await mongodb.getDb().db("cse341db").collection("contacts").insertOne(newContact);

    // This code block is used to inform the client that the insertOne was successful.
    if (result.acknowledged) {
      // The status code 201 is used to show a successful POST.
      // An example of what will be returned by this is:
      // {
      //   "acknowledged": true,
      //   "insertedId": "123456..."
      // }
      return res.status(201).json({
        acknowledged: result.acknowledged,
        newContactId: result.insertedId
      });      
    }

    return res.status(500).json({message: 'The contact failed to be added.'});

  } catch (error) {
    // error.message is used to give a simple string rather than the whole error object.
    // || 'There was an internal server error.' is so that there is a fallback message in case there was no error message.
    return res.status(500).json({message: error.message || 'There was an internal server error.'});
  }
}


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
    const result = await mongodb.getDb().db("cse341db").collection("contacts").find();
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
    const result = await mongodb.getDb().db("cse341db").collection("contacts").findOne({_id: contactId});

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

module.exports = { deleteContact, updateContact, createContact, contactsMenu, getAllContacts, getSingleContact };