'use strict';

// Include the state machine module and the replyWith function
const Voxa = require('voxa');
const views = require('./views');
const variables = require('./variables');
const states = require('./states');

/**
 * Initial configuration
 * see more: http://voxa.readthedocs.io/en/latest/index.html#initial-configuration
 */
const skill = new Voxa({ variables, views });
states.register(skill);

/**
 * Apply plugins to your Voxa instance
 * See more: http://voxa.readthedocs.io/en/latest/plugins.html
 */

 /**  plugins  **/
 /**  plugins end **/

module.exports = skill;
