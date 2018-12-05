'use strict';

const states = require('./states');

function register(app) {
  states.register(app);
}

/*******  plugins  *******/
/*****  plugins end *****/

module.exports.register = register;
