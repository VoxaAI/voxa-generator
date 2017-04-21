'use strict';
const //Generator = require('../generators/app/index'),
	helpers = require('yeoman-test'),
	assert = require('yeoman-assert'),
	path = require('path'),
	chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;

const Generator = require('../generators/app/index.js');

describe('Generator', () => {
	it('Should work', () => {
		let res = helpers.run(path.join(__dirname, '../generators/app'))
				    .withOptions({ foo: 'bar' })    // Mock options passed in
				    .withArguments(['arg'])      // Mock the arguments
				    .withPrompts({ name: 'name', author: 'author', subDirConfim: false }); // Mock the prompt answers

		//console.log(res, 'res');
		let answers = res.answers;
		expect(answers.name).to.equal('name');
		expect(answers.author).to.equal('author');
		expect(answers.subDirConfim).to.equal(false);
		
		expect(res.args[0]).to.equal('arg');
	});
});