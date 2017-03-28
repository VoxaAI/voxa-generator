'use strict';

const Generator = require('yeoman-generator');
const _ = require('lodash');

let firsQuestions = [
  {
    type    : 'input',
    name    : 'name',
    message : 'Please enter your project name',
    default : ''// Default to current folder name
  }, {
    type    : 'input',
    name    : 'author',
    message : 'Please enter your name/company?',
    default: 'Author'
  },{
    type    : 'confirm',
    name    : 'subDirConfim',
    message : 'Would you like to create the project inside a new directory?',
    default: true
  }
];

let secondQuestions = [
  {
    type    : 'input',
    name    : 'subDir',
    message : 'Please enter your directory name',
    default: ''
  }
];

module.exports = Generator.extend({

  // Configurations will be loaded here.
  // Ask for user input
  prompting() {
    _.set(firsQuestions[0],'default', this.appname);
    return this.prompt(firsQuestions)
      .then((answers)=>{
        _.set(secondQuestions[0],'default', answers.name);

        if(answers.subDirConfim){
          return this.prompt(secondQuestions)
            .then((res)=>{
              _.set(answers,'subDir', res.subDir);
              return answers;
            });
        }

        return answers;
      })
      .then((answers)=>{
        console.log('answers: ', answers);
        this.props = answers;
      });
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
