'use strict';

let initialPrompt = [
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

let secondPrompt = [
  {
    type    : 'input',
    name    : 'subDir',
    message : 'Please enter your directory name',
    default: ''
  }
];

let pluginsPrompt = [
  {
    type: 'confirm',
    name: 'cloud-watch',
    message: 'Would you like to install the Cloud-watch plugin?',
    default: false
  },
  {
    type: 'confirm',
    name: 'state-flow',
    message: 'Would you like to install the State-flow plugin?',
    default: false
  },
  {
    type: 'confirm',
    name: 'autoload',
    message: 'Would you like to install the autoload plugin?',
    default: false
  }
];

let installPrompt = [
  {
    type: 'confirm',
    name: 'dependencies',
    message: 'Would you like to install the project dependencies?',
    default: true
  }
];

module.exports = { initialPrompt, secondPrompt, pluginsPrompt, installPrompt };
