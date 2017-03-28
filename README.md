# generator-voxa-skill [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> generator-voxa-skill

## Installation

First, install [Yeoman](http://yeoman.io) and generator-voxa-skill using [npm](https://www.npmjs.com/).

```bash
npm install -g yo
npm install -g generator-voxa-skill
```

Then generate your new project in the directory that you prefers:

```bash
yo voxa-skill
```

The generator is going to ask you some questions in order to customize your skill project.

### Directory Structure

Your directory structure should look like this:

	`config/` -> Environment variables or configuration
	`services/` -> API clients, Authentications and Extras
	`skill/` -> Amazon Echo Skill login, the state machine and flow
	`speechAssets/` -> Amazon Echo Utterances, Intent Schema and Custom Slots.
	`tests/` -> Unit Tests
	`server.js` -> Development server.
	`gulpfile.js` -> Gulp tasks
	`serverless.yml` -> Serverless configuration
	`package.json` -> Dependencies
	`README.md`


## License

MIT © [Carlos A. Vaca Morales]()


[npm-image]: https://badge.fury.io/js/generator-skill.svg
[npm-url]: https://npmjs.org/package/generator-skill
[travis-image]: https://travis-ci.org/cvaca7/generator-skill.svg?branch=master
[travis-url]: https://travis-ci.org/cvaca7/generator-skill
[daviddm-image]: https://david-dm.org/cvaca7/generator-skill.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/cvaca7/generator-skill
[coveralls-image]: https://coveralls.io/repos/cvaca7/generator-skill/badge.svg
[coveralls-url]: https://coveralls.io/r/cvaca7/generator-skill
