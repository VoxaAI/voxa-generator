"use strict";

const views = (function views() {
  return {
    Intent: {
      Help: {
        say: "Some help text here."
      },
      Launch: {
        tell: "Welcome!"
      }
    }
  };
})();

module.exports = {
  en: {
    translation: views
  }
};
