'use strict';

// const PromptHandler = require('../generators/app/resources/handler');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Generator = require('../generators/app/index');

// const handler = new PromptHandler();
const _super = Generator.extend().__super__;

chai.use(chaiAsPromised);
// const expect = chai.expect;

describe('Generator Handler', () => {
	it('initialPrompt function', () => {
		Generator.extend({
			testInitial: () => _super.initialPrompt.bind(this),
			testConfig: () => _super.writing.config.bind(this),
		});
	});

	it('secondPrompt function', () => {

	});

	it('setPlugins function', () => {

	});

	it('finishPrompts function', () => {

	});

	it('creatingConfigFiles function', () => {

	});

	it('creatingAppFiles function', () => {

	});

	it('removingUnnecessaryFiles function', () => {

	});
});
