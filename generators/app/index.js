'use strict';

var Generator = require('yeoman-generator');

module.exports = Generator.extend({

  // Configurations will be loaded here.
  // Ask for user input
  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : this.appname // Default to current folder name
    }, {
      type    : 'input',
      name    : 'author',
      message : 'Please enter your name or company?',
      default: 'Author'
    }]).then((answers) => {
      this.props = answers;
      this.log('app name', answers.name);
      this.log('author', answers.author);
    });
  },

  // Writing Logic here
  writing: {
    // Copy the configuration files
    config: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'), {
          name: this.props.name,
          author: this.props.author
        }
      );
      this.fs.copy(
        this.templatePath('.nvmrc'),
        this.destinationPath('.nvmrc')
      );
      this.fs.copy(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
      this.fs.copy(
        this.templatePath('README.md'),
        this.destinationPath('README.md')
      );
      this.fs.copy(
        this.templatePath('server.js'),
        this.destinationPath('server.js')
      );
      this.fs.copy(
        this.templatePath('serverless.yml'),
        this.destinationPath('serverless.yml')
      );
    },

    // Copy application files
    app: function () {
      this.fs.copy(
        this.templatePath('config'),
        this.destinationPath('config')
      );
      this.fs.copy(
        this.templatePath('services/.gitkeep'),
        this.destinationPath('services/.gitkeep')
      );
      this.fs.copy(
        this.templatePath('skill'),
        this.destinationPath('skill')
      );
      this.fs.copy(
        this.templatePath('speechAssets'),
        this.destinationPath('speechAssets')
      );
      this.fs.copy(
        this.templatePath('test'),
        this.destinationPath('test')
      );
    },

    // Install Dependencies
    install: function () {
      this.installDependencies();
    }
  }
});
