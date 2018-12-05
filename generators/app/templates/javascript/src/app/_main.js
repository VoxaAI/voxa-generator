'use strict';

// Include the state machine module and the replyWith function
const Voxa = require('voxa');

const states = require('./states');

function register(app) {
  states.register(app);
}

/*******  plugins  *******/
/*****  plugins end *****/

module.exports.register = register;
