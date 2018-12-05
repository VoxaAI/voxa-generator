'use strict';

const Raven = require('raven'); // Official `raven` module
const RavenLambdaWrapper = require('serverless-sentry-lib');
const voxa = require('voxa');
const alexaStates = require('./states/alexa.states');
const dialogflowStates = require('./states/dialogflow.states');

const variables = require('./variables');
const views = require('./views');
const main = require('./main');

const app = new voxa.VoxaApp({ variables, views });

main.register(app);

// alexa
const alexaSkill = new voxa.AlexaPlatform(app);
alexaStates.register(alexaSkill);
exports.alexa = RavenLambdaWrapper.handler(Raven, alexaSkill.lambda());
exports.alexaSkill = alexaSkill;

// dialogFlow
const dialogflowAction = new voxa.DialogFlowPlatform(app);
dialogflowStates.register(dialogflowAction);
exports.dialogflow = RavenLambdaWrapper.handler(Raven, dialogflowAction.lambdaHTTP());
exports.dialogflowAction = dialogflowAction;
