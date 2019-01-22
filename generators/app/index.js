"use strict";

const Generator = require("yeoman-generator"),
  PromptHandler = require("./resources/handler"),
  handler = new PromptHandler();

module.exports = Generator.extend({
  // Configurations will be loaded here.
  // Ask for user input
  async prompting() {
    let answers = await handler.initialPrompt.call(this);
    answers = await handler.secondPrompt.call(this, answers);
    answers = await handler.setPlugins.call(this, answers);
    answers = await handler.thirdPrompt.call(this, answers);
    answers = await handler.finishPrompts.call(this, answers);
    answers = await handler.setNewDestinationRoot.call(this, answers.dir);
    return answers;
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
        // REMOVE: 
        // this.installDependencies();
        this.yarnInstall();
      }
    }
  }
});
