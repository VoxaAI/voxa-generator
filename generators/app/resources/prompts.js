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

module.exports = { initialPrompt, secondPrompt };
