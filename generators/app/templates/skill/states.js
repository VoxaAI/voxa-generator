'use strict';

/*
* States are the controller part of the Voxa's mvc model
* more info at http://voxa.readthedocs.io/en/latest/controllers.html
*/

exports.register = function register(skill) {
  /**
   * If you want to handle a specific state onIntent
   * see more http://voxa.readthedocs.io/en/latest/controllers.html#the-onintent-helper
   * See more handlers at http://voxa.readthedocs.io/en/latest/statemachine-skill.html
   */

  skill.onIntent('LaunchIntent', () => ({ reply: 'Intent.Launch', to: 'entry' }));

  // See how to manage the transition
  // http://voxa.readthedocs.io/en/latest/transition.html
  skill.onIntent('AMAZON.HelpIntent', () => ({ reply: 'Intent.Help', to: 'die' }));
};
