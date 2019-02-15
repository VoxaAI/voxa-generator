"use strict";

exports.register = function register(app) {
  app.onIntent("LaunchIntent", () => ({ reply: "Intent.Launch", to: "entry" }));
  app.onIntent("HelpIntent", () => ({
    reply: "Intent.Help",
    to: "die"
  }));
};
