const REQUIRED_FIELDS = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];

const ContactModel = {
  isValid: (data) => {
    // The data argument receives the entire javascript object that came from the client in the body of the POST request.
    // The req.body is the javascript object that was created by parsing a json object.
    return REQUIRED_FIELDS.every((field) => data[field] && data[field].trim() !== ''); // trim() is used because " " for example would not be empty without trim().
  },

  secureData: (data) => {
    return REQUIRED_FIELDS.reduce((accumulator, field) => {
      if (data[field]) {
        // This is used to build the new object from scratch {} to start with.
        accumulator[field] = data[field];
      }
      return accumulator;
    }, {}); // {} is the initial value
  },
};

module.exports = ContactModel;
