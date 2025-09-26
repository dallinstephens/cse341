const routes = require('express').Router();

const contactsController = require('../controllers/contactsController');

routes.get('/', contactsController.contactsMenu);
routes.get('/contacts', contactsController.getAllContacts);
routes.get('/contacts/single', contactsController.getSingleContact);

module.exports = routes;