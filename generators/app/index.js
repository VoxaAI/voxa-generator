'use strict';

const
  Generator = require('yeoman-generator'),
  _ = require('lodash');
let
  questions = require('./resources/prompts'),
  initialPrompt = questions.initialPrompt,
  secondPrompt = questions.secondPrompt;

function setPrompts(answers){
  _.set(secondPrompt[0],'default', answers.name);

  if(answers.subDirConfim){
    return this.prompt(secondPrompt)
      .then((res)=>{
        _.set(answers,'subDir', res.subDir);
        return answers;
      });
  }

  return answers;
}
function finishPrompts(answers){
  this.props = answers;
}

module.exports = Generator.extend({

  // Configurations will be loaded here.
  // Ask for user input
  prompting() {
    _.set(initialPrompt[0],'default', this.appname);
    return this.prompt(initialPrompt)
      .then(setPrompts.bind(this))
      .then(finishPrompts.bind(this));
  },

  // Writing Logic here
  writing: {

    // Copy the configuration files
    config: function () {
      this.dir = this.props.subDirConfim ? this.props.subDir + '/' : '';

      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath(this.dir + 'package.json'), {
          name: this.props.name,
          author: this.props.author
        }
      );
      this.fs.copy(
        this.templatePath('.nvmrc'),
        this.destinationPath(this.dir + '.nvmrc')
      );
      this.fs.copy(
        this.templatePath('gulpfile.js'),
        this.destinationPath(this.dir + 'gulpfile.js')
      );
      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath(this.dir + 'README.md'), {
          name: this.props.name
        }
      );
      this.fs.copy(
        this.templatePath('server.js'),
        this.destinationPath(this.dir + 'server.js')
      );
      this.fs.copy(
        this.templatePath('serverless.yml'),
        this.destinationPath(this.dir + 'serverless.yml')
      );
    },

    // Copy application files
    app: function () {
      this.fs.copy(
        this.templatePath('config'),
        this.destinationPath(this.dir + 'config')
      );
      this.fs.copy(
        this.templatePath('services/.gitkeep'),
        this.destinationPath(this.dir + 'services/.gitkeep')
      );
      this.fs.copy(
        this.templatePath('skill'),
        this.destinationPath(this.dir + 'skill')
      );
      this.fs.copy(
        this.templatePath('speechAssets'),
        this.destinationPath(this.dir + 'speechAssets')
      );
      this.fs.copy(
        this.templatePath('test'),
        this.destinationPath(this.dir + 'test')
      );
    },

    // Install Dependencies if wanted
    install: function () {
      this.installDependencies();
    }
  }
});
