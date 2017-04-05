'use strict';
const Generator = require('../generators/app/index'),
	helpers = require('yeoman-test'),
	assert = require('yeoman-assert'),
	path = require('path');

describe('Generator', () => {
	beforeEach(function () {
	  // The object returned act like a promise, so return it to wait until the process is done
	  return helpers.run(path.join(__dirname, '../generators/app'))
	    .withOptions({ foo: 'bar' })    // Mock options passed in
	    .withArguments(['name'])      // Mock the arguments
	    .withPrompts({ name: 'name', author: 'author', subDirConfim: false }); // Mock the prompt answers
	});

});