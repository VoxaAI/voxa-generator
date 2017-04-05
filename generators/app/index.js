'use strict';

const Generator = require('yeoman-generator'),
PromptHandler = require('./resources/PromptHandler');
let handler = new PromptHandler();

module.exports = Generator.extend({

  // Configurations will be loaded here.
  // Ask for user input
  prompting() {
    return handler.initialPrompt.call(this)
    .then((answers) =>{
      return handler.secondPrompt.call(this, answers);
    })
    .then((answers) =>{
      return handler.setPlugins.call(this, answers);
    })
    .then((answers) => {
      return handler.finishPrompts.call(this,answers);
    })
    .then((answers) => {
      this.props = answers;
      console.log(this.props);
    });
  },

  // Writing Logic here
  writing: {
    // Copy the configuration files
    config: function () { 
      handler.creatingConfigFiles.call(this);
    },

    // Copy application files
    app: function () {
      handler.creatingAppFiles.call(this);
      handler.removingUnnecessaryFiles.call(this);
    },

    // Install Dependencies if wanted
    install: function () {
      //this.installDependencies();
    }
  }
});
