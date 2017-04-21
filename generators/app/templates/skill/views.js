'use strict';

/**
 * Define all the replies to the user
 * See more http://voxa.readthedocs.io/en/latest/views-and-variables.html#views
 */

const views = (function views() {
  return {
    Intent: {
      // Use ask, tell, say, reprompt, card for your reply
      // See more: http://voxa.readthedocs.io/en/latest/reply.html
      Launch: {
        tell: 'Welcome!',
      },
      Help: {
        say: 'Some help text here.',
      },
    },
  };
}());
module.exports = views;
