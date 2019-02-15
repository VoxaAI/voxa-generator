'use strict';

const initialPrompt = [
  {
    type    : 'input',
    name    : 'name',
    message : 'Please enter your project name',
    default : ''// Default to current folder name
  }, {
    type    : 'input',
    name    : 'description',
    message : 'Please enter a description for your project',
    default : '' // If description is empty not include description
  }, {
    type    : 'input',
    name    : 'author',
    message : 'Please enter your name/company as follow: Full Name <author@example.com> (http://example.com)',
    default: 'Full Name <author@example.com> (http://example.com)'
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
    type: 'list',
    name: 'language',
    choices: [ 'JavaScript', 'TypeScript' ],
    message: 'What language would you like to use to write Voxa app?',
    default: 'JavaScript'
  },
  {
    type: 'confirm',
    name: 'dependencies',
    message: 'Would you like to install the project dependencies?',
    default: true
  }
];

module.exports = { initialPrompt, secondPrompt, pluginsPrompt, installPrompt };
