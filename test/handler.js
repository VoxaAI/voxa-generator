'use strict';
const PromptHandler = require('../generators/app/resources/handler'),
	handler = new PromptHandler(),
	Generator = require('../generators/app'),
	_super = Generator.extend().__super__,
	//helpers = require('yeoman-test'),
	//assert = require('yeoman-assert'),
	//path = require('path'),
	chai = require('chai'),
  chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
// const expect = chai.expect;

describe('Generator Handler', () => {
	it('initialPrompt function', () => {
	});

	it('secondPrompt function');

	it('setPlugins function');

	it('finishPrompts function');

	it('creatingConfigFiles function');

	it('creatingAppFiles function');

	it('removingUnnecessaryFiles function');
});
