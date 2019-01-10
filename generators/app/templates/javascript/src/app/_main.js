"use strict";

/**  requires  **/
/**  requires end  **/
// prettier-ignore
const states = [
  require("./states/launch.states"),
];

function register(app) {
  states.forEach(state => state.register(app));

  // You can also define here the following
  // app.onRequestStarted, app.onIntentRequest, app.onCanFulfillIntentRequest,
  // app.onAfterStateChanged, app.onBeforeReplySent, app.onUnhandledState
  // expect voxaEvent and reply params.
  // i.e. app.onCanFulfillIntentRequest((voxaEvent, reply) => {});

  /**  plugins  **/
  /**  plugins end  **/
}

module.exports.register = register;
