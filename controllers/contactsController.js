// References:
// https://www.youtube.com/watch?v=ZuT8rk0Ssfk
// https://www.youtube.com/watch?v=S25ggtvC4AM
// Reference to use mongodb in this file: https://stackoverflow.com/questions/58354629/moving-nodejs-mongodb-connection-code-to-another-file
// https://github.com/byui-cse/cse341-code-student/tree/L02-team-solution-stretch

// References for swagger comments:
// https://swagger-autogen.github.io/docs/endpoints/tags/
// https://swagger-autogen.github.io/docs/endpoints/description/
// https://swagger-autogen.github.io/docs/swagger-2/responses
// https://swagger-autogen.github.io/docs/swagger-2/parameters

const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');
const ContactModel = require('../models/ContactModel');

// const contactsMenu = (req, res) => {
//   res.status(200).send(`
//         <h1>Contacts Menu:</h1>
//         <h2>Select one of the following:</h2>
//         <p>
//           <a href="/contacts/">View all contacts</a><br>
//           <a href="/contacts/single">View a single contact</a><br>
//           <a href="/contacts/api-docs">View API Documentation</a>
//         </p>`);
// };

// GET: Retrieve all contacts
const getAllContacts = async (req, res) => {
  /*  #swagger.tags = ['GET']
      #swagger.description = 'This is used to retrieve all the contacts.'   
      #swagger.responses[200] = {
          description: 'All contacts were sucessfully found.',
          schema: {
            type: 'array',
            items: { $ref: '#/definitions/Contact' }
          }
      }
      #swagger.responses[404] = {
          description: 'No contacts were found in the database.',
          schema: { message: 'No contacts were found.' }
      }
      #swagger.responses[500] = {
          description: 'Internal server error: no contacts were retrieved.',
          schema: { message: 'An internal server error occurred while retrieving contacts.' }
      }
  */

  try {
    const result = await mongodb.getDb().db('cse341db').collection('contacts').find();
    const lists = await result.toArray();
    if (lists.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    } else {
      res.status(404).json({ message: 'No contacts were found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An internal server error occurred while retrieving contacts.' });
  }
};

// GET: Retrieve one contact by id
const getSingleContact = async (req, res) => {
  /*  #swagger.tags = ['GET']
      #swagger.description = 'This is used to find a single contact with an id.'
      #swagger.parameters['id'] = {
          in: 'path',
          type: 'string',
          required: true,
          description: 'This is the object id of the contact to retrieve. Example id: 68e1a0b3ee5576c136630326',
          example: '68e1a0b3ee5576c136630326'
      }          
      #swagger.responses[200] = {
          description: 'A single contact was successfully found with a specific id.',
          schema: { $ref: '#/definitions/Contact' }
      }
      #swagger.responses[404] = {
          description: 'The contact with the specifed id was not found.',
          schema: { message: 'The contact with the given id was not found.' }
      }
      #swagger.responses[500] = {
          description: 'Internal server error: the contact was not retrieved.',
          schema: { message: 'An internal server error occurred while retrieving the contact with the given id.' }
      }                    
  */

  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('cse341db')
      .collection('contacts')
      .findOne({ _id: contactId });

    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json({message: `The contact with the given id: ${contactId} was not found.`});
    }
  } catch (error) {
    res.status(500).json({ message: 'An internal server error occurred while retrieving the contact with the given id.' });
  }
};

// const contacts = [
//   { name: 'Barbara Stephens', id: '68d366e449379c1b0d7a8595' },
//   { name: 'Corbin Stephens', id: '68d3674c49379c1b0d7a8596' },
//   { name: 'Quentin Stephens', id: '68d367d349379c1b0d7a8597' },
//   { name: 'Shlenae McBride', id: '68d368cc49379c1b0d7a8598' },
// ];

// // GET: Retrieve one contact
// const getSingleContact = async (req, res) => {
//   try {
//     const contactId = new ObjectId(req.query.id);
//     const result = await mongodb
//       .getDb()
//       .db('cse341db')
//       .collection('contacts')
//       .findOne({ _id: contactId });

//     if (result) {
//       res.setHeader('Content-Type', 'application/json');
//       res.status(200).json(result);
//     } else {
//       const htmlLinks = contacts
//         .map((contact) => `<a href="/contacts/single?id=${contact.id}">${contact.name}</a><br>`)
//         .join('');
//       res.status(200).send(`
//         <h1>Choose a contact:</h1>
//         <p>${htmlLinks}</p>`);
//       // res.status(404).json({message: `An id parameter is missing.`});
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'An error happened while the contact.' });
//   }
// };

// POST: Create one contact
const createContact = async (req, res) => {
  /*  #swagger.tags = ['POST']
      #swagger.description = 'This is used to create a new contact.'
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          description: 'This contains the contact object that contains the data to create.',
          schema: { $ref: '#/definitions/Contact' }
      }      
      #swagger.responses[201] = {
          description: 'A contact was successfully created.',
          schema: { $ref: '#/definitions/Contact' }
      }
      #swagger.responses[400] = {
          description: 'One or more required fields are missing from the request body.',
          schema: { message: 'One or more required fields are missing.' }
      }
      #swagger.responses[500] = {
          description: 'An internal server error with creating a contact.',
          schema: { message: 'Internal server error: the contact failed to be added.' }
      }
  */

  if (!ContactModel.isValid(req.body)) {
    // The return statement exits the function createContact and so the line
    // const newContact = ContactModel.secureData(req.body); is not ran next.
    return res.status(400).json({ message: 'One or more required fields are missing.' });
  }

  const newContact = ContactModel.secureData(req.body);

  try {
    const result = await mongodb
      .getDb()
      .db('cse341db')
      .collection('contacts')
      .insertOne(newContact);

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
        newContactId: result.insertedId,
      });
    }
  } catch (error) {
    // error.message is used to give a simple string rather than the whole error object.
    // || 'There was an internal server error.' is so that there is a fallback message in case there was no error message.
    return res
      .status(500)
      .json({ message: error.message || 'Internal server error: the contact failed to be added.' });
  }
};

// PUT: Update one contact by id
const updateContact = async (req, res) => {
  /*  #swagger.tags = ['PUT']
      #swagger.description = 'This is used to update a contact by a the object id in the request.'
      #swagger.parameters['id'] = {
          in: 'path',
          type: 'string',
          required: true,
          description: 'This is the object id of the contact to update. Example id: 68e1a0b3ee5576c136630326',
          example: '68e1a0b3ee5576c136630326'
      }
      #swagger.parameters['body'] = {
          in: 'body',
          required: true,
          description: 'This contains the fields for the contact object to update.',
          schema: { $ref: '#/definitions/Contact' }
      }
      #swagger.responses[204] = {
          description: 'A contact was updated by a id in the request.'
      }                
      // #swagger.responses[200] = {
      //     description: 'A contact was updated by a id in the request.',
      //     schema: { message: 'The contact with the given id was successfully updated.' }
      // }
      #swagger.responses[404] = {
          description: 'The contact with the specified id was not found or there was not a change in the request body.',
          schema: { message: 'The contact with the given id failed to update because that id was not found or there was no change in the body for that id.' }
      }
      #swagger.responses[500] = {
        description: 'An internal server error occurred with updating a contact with a given id.',
        schema: { message: 'Internal server error: the contact with the given id was not updated.' }
      }       
  */

  const contactId = new ObjectId(req.params.id);

  // This gets the updated contact data from the request body.
  const updateContactData = req.body;

  try {
    // Reference for updateOne:
    // https://www.mongodb.com/docs/drivers/node/current/crud/update/modify/
    const result = await mongodb
      .getDb()
      .db('cse341db')
      .collection('contacts')
      .updateOne({ _id: contactId }, { $set: updateContactData });

    // This is used to confirm that the contact update was successful.
    // .modifiedCount is a property of mongodb and checks if update is different than what is there.
    if (result.modifiedCount > 0) {
      // A status is 204 is the recommended practice when PUT is successful.
      return res.status(204).send();

      // A status of 200 is used when PUT is successful.
      // return res
      //   .status(200)
      //   .json({ message: `The contact with the given id ${contactId} was successfully updated.` });
    }

    // A status of 404 means something is not found.
    return res.status(404).json({
      message: `The contact with the given id ${contactId} failed to update because that id was not found or there was no change in the body for that id.`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || 'Internal server error: the contact with the given id was not updated.' });
  }
};

// DELETE: Delete one contact by id
const deleteContact = async (req, res) => {
  /*  #swagger.tags = ['DELETE']
      #swagger.description = 'This is used to delete a contact with a specified id in the request.'
      #swagger.parameters['id'] = {
          in: 'path',
          type: 'string',
          required: true,
          description: 'This is the id of the contact to delete. Example id: 68e1a0b3ee5576c136630326',
          example: '68e1a0b3ee5576c136630326'
      }              
      #swagger.responses[204] = {
          description: 'The contact with specified id was deleted successfully.',
      }
      #swagger.responses[404] = {
          description: 'The contact with the specified id was not found.',
          schema: { message: 'The contact with the specified id failed to delete because the id was not found.' }
      }
      #swagger.responses[500] = {
        description: 'An internal server error occurred with deleting a contact with a given id.',
        schema: { message: 'Internal server error: the contact with the given id was not deleted.' }
      } 
  */

  const contactId = new ObjectId(req.params.id);

  // Note: The request body is not needed to delete a document.

  try {
    // Reference for updateOne:
    // https://www.mongodb.com/docs/drivers/node/current/crud/update/modify/
    const result = await mongodb
      .getDb()
      .db('cse341db')
      .collection('contacts')
      .deleteOne({ _id: contactId });

    // This is used to confirm that the contact update was successful.
    // .modifiedCount is a property of mongodb and checks if update is different than what is there.
    if (result.deletedCount > 0) {
      // A status of 204 (No Content) is the recommended standard for delete.
      return res.status(204).send();
      // A status of 200 is used when DELETE is successful.
      // When it is successful, it will say "200 (OK)".
      // return res.status(200).json({ 
      //   message: `The contact with the specified id ${contactId} was successfully deleted.` 
      // });
    }

    // A status of 404 means something is not found.
    return res.status(404).json({
      message: `The contact with specified id ${contactId} failed to delete because the id was not found.`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || 'Internal server error: the contact with the given id was not deleted.' });
  }
};

module.exports = {
  // contactsMenu,
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};
