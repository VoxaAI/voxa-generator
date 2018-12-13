"use strict";

const Generator = require("yeoman-generator"),
  PromptHandler = require("./resources/handler"),
  handler = new PromptHandler();

module.exports = Generator.extend({
  // Configurations will be loaded here.
  // Ask for user input
  prompting() {
    return handler.initialPrompt
      .call(this)
      .then(answers => handler.secondPrompt.call(this, answers))
      .then(answers => handler.setPlugins.call(this, answers))
      .then(answers => handler.thirdPrompt.call(this, answers))
      .then(answers => handler.finishPrompts.call(this, answers))
      .then(answers => handler.setNewDestinationRoot.call(this, answers.dir));
  },

  // Writing Logic here
  writing: {
    // Copy the configuration files
    config: function() {
      handler.creatingConfigFiles.call(this);
    },

    // Copy application files
    app: function() {
      handler.creatingAppFiles.call(this);
      handler.removingUnnecessaryFiles.call(this);
    },

    // Install Dependencies if wanted
    install: function() {
      if (this.props.dependencies) {
        this.installDependencies();
      }
    }
  }
});
