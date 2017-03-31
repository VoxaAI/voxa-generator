# generator-voxa-skill

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
