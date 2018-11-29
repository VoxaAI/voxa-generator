'use strict';

// Include the state machine module, the state machine,
// the responses and variables to be used in this app
const app = require('./main');
require('./states');

exports.handler = function handler(event, context, callback) {
  app.execute(event)
    .then(response => callback(null, response))
    .catch(error => callback(error));
};
