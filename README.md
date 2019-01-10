# generator-voxa

## Installation

First, install [Yeoman](http://yeoman.io) and generator-voxa using [npm](https://www.npmjs.com/).

```bash
npm install -g yo
npm install -g generator-voxa
```

Then generate your new project in the directory that you prefers:

```bash
yo voxa
```

The generator is going to ask you some questions in order to customize your voxa app project.

### Directory Structure

Your directory structure should look like this:

	`src/config/` -> Environment variables or configuration
	`src/services/` -> API clients, Authentications and Extras
	`src/app/` -> Voxa app, the state machine and flow
	`speech-assets/` -> Amazon Utterances, Intent Schema, Custom Slots, etc
	`tests/` -> Unit Tests
	`server.js` -> Development server.
	`gulpfile.js` -> Gulp tasks
	`serverless.yml` -> Serverless configuration
	`package.json` -> Dependencies
	`README.md`

### Resources

  * [Documentation](http://voxa.readthedocs.io/en/latest/)
  * [Bug Tracker](https://github.com/mediarain/voxa/issues)
  * [Mail List](https://groups.google.com/d/forum/voxa-framework)
  * [IRC](irc://chat.freenode.net/voxa) (chat.freenode.net, #voxa)
