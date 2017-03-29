'use strict';

const
  Generator = require('yeoman-generator'),
  _ = require('lodash');
let
  questions = require('./resources/prompts'),
  initialPrompt = questions.initialPrompt,
  secondPrompt = questions.secondPrompt,
  pluginsPrompt = questions.pluginsPrompt;

let plugins = require('./resources/plugins');

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
function setPlugins(answers){
  return this.prompt(pluginsPrompt)
    .then((res) =>{
      _.set(answers,'plugins', res);
      return answers;
    });
}
function finishPrompts(answers){
  let plugins = answers.plugins;
  console.log('plugins :', plugins);
  //var that = this;
  /*
  _.forIn(plugins, function(val, key){
    if(val){
      addPlugin(key).bind(that);
    }
  });
  */
  this.props = answers;
}


function addPlugin(plugin){

  //let hook   = '/*******  plugins  *******/',
  /*  path   = 'skill/_MainStateMachine.js',
    file   = this.read(path),
    i = _.indexOf(plugins,'name.' + plugin),
    dependencies = plugins[i].dependencies,
    usage = plugins[i].usage;

  console.log('i ', i);
  console.log('dependencies ', dependencies);
  console.log('usage ', usage);

  //inserting dependencies
  if (file.indexOf(dependencies) === -1) {
   this.write(path, file.replace(hook, dependencies + '\n' + hook));
  }

  //inserting usage
  if (file.indexOf(usage) === -1) {
   this.write(path, file.replace(hook, usage + '\n' + hook));
  }
  */
  console.log(`plugin ${plugin} added`);
}
module.exports = Generator.extend({

  // Configurations will be loaded here.
  // Ask for user input
  prompting() {
    _.set(initialPrompt[0],'default', this.appname);
    return this.prompt(initialPrompt)
      .then(setPrompts.bind(this))
      //.then(setPlugins.bind(this))
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
      //this.installDependencies();
    }
  }
});
