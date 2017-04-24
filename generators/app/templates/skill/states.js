'use strict';

const Reply = require('voxa').Reply;

exports.register = function register(skill) {
  // This event is triggered after new session has started
  skill.onSessionStarted((alexaEvent) => {});
  // This event is triggered before the current session has ended
  skill.onSessionEnded((alexaEvent) => {});
  // This can be used to plug new information in the request
  skill.onRequestStated((alexaEvent) => {});

  // This handler will catch all errors generated when trying to make transitions in the stateMachine, this could include errors in the state machine controllers
  skill.onStateMachineError((alexaEvent, reply, error) =>
    // it gets the current reply, which could be incomplete due to an error.
    new Reply(alexaEvent, { tell: 'An error in the controllers code' }).write(),
  );

  // This is the more general handler and will catch all unhandled errors in the framework
  skill.onError((alexaEvent, error) =>
    new Reply(alexaEvent, { tell: 'An unrecoverable error occurred.' }).write(),
  );

  // This event is triggered before every time the user response to an Alexa event...
  // and it have two parameters, alexaEvent and the reply controller.
  skill.onBeforeReplySent((alexaEvent, reply) => { });
  // Launch intent example
  skill.onIntent('LaunchIntent', () => ({ reply: 'Intent.Launch', to: 'entry' }));
  // AMAMAZON Build-in Help Intent example
  skill.onIntent('AMAZON.HelpIntent', () => ({ reply: 'Intent.Help', to: 'die' }));
};
