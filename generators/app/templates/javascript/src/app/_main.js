'use strict';

const states = [
  require('./states/launch.states'),
]

function register(app) {
  states.forEach(state => state.register(app));
}

/*******  plugins  *******/
/*****  plugins end *****/

module.exports.register = register;
