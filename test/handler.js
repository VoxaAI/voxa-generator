'use strict';
const PromptHandler = require('../generators/app/resources/handler'),
	handler = new PromptHandler(),
	Generator = require('../generators/app/index'),
	_super = Generator.extend().__super__,
	//helpers = require('yeoman-test'),
	//assert = require('yeoman-assert'),
	//path = require('path'),
	chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Generator Handler', () => {
	it('initialPrompt function', () => {
		/*
		_super.prompting().then((res) => {
			console.log('res', res);
		}).catch((err) => {
			console.log('err', err);
		});
		*/
		/*
		let sub = Generator;
		Generator.extend({
			constructor(){
				handler.initialPrompt.call(this).then((answers) =>{
					console.log(answers);
				});	
			}
		});
		*/
		const sub = Generator.extend({
			testInitial: () => {
				console.log('testInitial');
				return _super.initialPrompt.bind(this);
			},
			testConfig: () => {
				console.log('testConfig');
				return _super.writing.config.bind(this);
			}
		});

		console.log(Generator);
		console.log(' ------- ');
		console.log(sub.extend().__super__.testInitial());
		console.log(' ------- ');
		console.log(sub.extend().__super__.testConfig());
		//console.log(_super.writing.config());
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
