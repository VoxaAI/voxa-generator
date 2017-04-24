'use strict';

const skill = require('./skill/MainStateMachine');
const config = require('./config');

/**
 * Create a development server for local development
 * see more: http://voxa.readthedocs.io/en/latest/index.html#using-the-development-server
 */
skill.startServer(config.server.port);
