const routes = require('express').Router();

const contactsController = require('../controllers/contactsController');

routes.get('/', contactsController.contactsMenu);
routes.get('/contacts', contactsController.getAllContacts);
routes.get('/contacts/single', contactsController.getSingleContact);

routes.post('/contacts', contactsController.createContact);

// The id without the colon is static text in this: /contacts/id
// The id with the colon is a dynamic variable in this: /contacts/:id 
routes.put('/contacts/:id', contactsController.updateContact);

routes.delete('/contacts/:id', contactsController.deleteContact);

// Reference for POST video:
// https://youtu.be/vjf774RKrLc?si=J_Kf-zjWhTb2u5iK

// routes.post('/contacts', (req, res) => {
    // console.log(req.body);
    // If using mongoose, use this code below in comments:
    // const post = new ContactModel({
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     email: req.body.email,
    //     favoriteColor: req.body.favoriteColor,
    //     birthday: req.body.birthday
    // });

    // post.save()
    //     .exec()
    //     .then(data => {
    //         res.json(data)
    //     })
    //     .catch(error => {
    //         res.json({message : error})
    //     });
// });

module.exports = routes;