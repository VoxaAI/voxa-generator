const _ = require('lodash');
let
  questions = require('./prompts'),
  initialPrompt = questions.initialPrompt,
  secondPrompt = questions.secondPrompt,
  pluginsPrompt = questions.pluginsPrompt;
  _plugins = require('./plugins');

module.exports = class PromptHandler {

	constructor(){

	}

	initialPrompt(){	
		_.set(initialPrompt[0],'default', this.appname);
		return this.prompt(initialPrompt)
	}

	secondPrompt(answers){
		_.set(secondPrompt[0],'default', answers.name);

		if(answers.subDirConfim){
			return this.prompt(secondPrompt)
			  .then((res)=>{
			    _.set(answers,'subDir', res.subDir);
			    return answers;
			  });
		}

		return answers;
	}

	setPlugins(answers){
		return this.prompt(pluginsPrompt)
		.then((res) =>{
		  _.set(answers,'plugins', res);
		  return answers;
		});
	}

	finishPrompts(answers){
		let plugins = answers.plugins,
		path =  this.templatePath('skill/_MainStateMachine.js'),
		newPath =  this.templatePath('skill/MainStateMachine.js'),

		configPath = this.templatePath('config/_index.js'),
		configNewPath = this.templatePath('config/index.js'),
		configFile = this.fs.read(configPath),

		jsonPath = this.templatePath('_package.json'),
		jsonNewPath = this.templatePath('package.json'),
		jsonFile = JSON.parse(this.fs.read(jsonPath)),

		envPath = this.templatePath('config/local.json.example'),
		envNewPath = this.templatePath('config/local.json'),
		stagNewPath = this.templatePath('config/staging.json'),
		prodNewPath = this.templatePath('config/production.json'),
		envFile = JSON.parse(this.fs.read(envPath)),

		filerBuffer   = this.fs.read(path),
		hook  = '/*******  plugins  *******/',
		newBuffer = '',
		configBuffer = '',

		arrFiles = [],

		dir = answers.subDirConfim ? answers.subDir + '/' : '';
		_.set(answers,'dir', dir);

		if(_.keys(answers).length > 0){
		 _.forIn(plugins, (val, key) =>{
		    if(val){
		      let i = _.findIndex(_plugins,{name: key} ), 
		      usage = _plugins[i].usage,
		      dependencies = _plugins[i].dependencies,
		      files = _plugins[i].files,
		      env = _plugins[i].env,
		      config = _plugins[i].config;

		      if(config){
		        configBuffer += config + '\n\n';
		      }

		      if(dependencies){
		        _.forEach(dependencies, function(item){
		          _.set(jsonFile,`dependencies.${item.name}`,item.version); 
		        });
		      }

		      if(files){
		        _.forEach(files, (item) =>{
		          arrFiles.push(item);
		        });
		      }

		      if(env){
		        _.forEach(env, (item) =>{
		          _.mapKeys(item, (value, key) => {
		            _.set(envFile, key, value);  
		          });
		        });
		      }

		      //inserting usage
		      newBuffer += usage + '\n\n';
		    }
		  });

		  //creating MainStateMachine
		  newBuffer = filerBuffer.replace(hook, hook + '\n' + newBuffer + '\n');
		  this.fs.write(newPath, newBuffer);

		  //creating config/index.js
		  configBuffer = configFile.replace(hook, hook + '\n' + configBuffer + '\n');
		  this.fs.write(configNewPath, configBuffer);

		  //creating package.json
		  this.fs.write(jsonNewPath,JSON.stringify(jsonFile, null, '\t'));
		}

		if(arrFiles.length > 0){
		_.set(answers,'services', arrFiles);  
		}

		_.set(answers,'env', envFile);  
		this.fs.write(envNewPath, JSON.stringify(envFile, null, '\t'));
		this.fs.write(stagNewPath, JSON.stringify(envFile, null, '\t'));
		this.fs.write(prodNewPath, JSON.stringify(envFile, null, '\t'));

		return answers;
	}

	creatingConfigFiles(){
		this.fs.copy(
			this.templatePath('.editorconfig'),
			this.destinationPath(this.props.dir + '.editorconfig')
		);
		this.fs.copy(
			this.templatePath('.eslintrc.json'),
			this.destinationPath(this.props.dir + '.eslintrc.json')
		);
		this.fs.copy(
			this.templatePath('_gitignore'),
			this.destinationPath(this.props.dir + '.gitignore')
		);
		this.fs.copy(
			this.templatePath('.nvmrc'),
			this.destinationPath(this.props.dir + '.nvmrc')
		);
		this.fs.copyTpl(
			this.templatePath('package.json'),
			this.destinationPath(this.props.dir + 'package.json'), {
			  name: this.props.name,
			  author: this.props.author
			}
		);
		this.fs.copy(
			this.templatePath('gulpfile.js'),
			this.destinationPath(this.props.dir + 'gulpfile.js')
		);
		this.fs.copyTpl(
			this.templatePath('README.md'),
			this.destinationPath(this.props.dir + 'README.md'), {
			  name: this.props.name
			}
		);
		this.fs.copy(
			this.templatePath('server.js'),
			this.destinationPath(this.props.dir + 'server.js')
		);
		this.fs.copy(
			this.templatePath('serverless.yml'),
			this.destinationPath(this.props.dir + 'serverless.yml')
		);
	}

	creatingAppFiles(){
		this.fs.copy(
			this.templatePath('config'),
			this.destinationPath(this.props.dir + 'config')
		);

		if(this.props.services){
			_.forEach(this.props.services, (item) =>{
			  this.fs.copy(
			    this.templatePath(item),
			    this.destinationPath(this.props.dir + item)
			  );
			});
		}
		else{
			this.fs.copy(
			  this.templatePath('services/.gitkeep'),
			  this.destinationPath(this.props.dir + 'services/.gitkeep')
			);  
		}

		this.fs.copy(
			this.templatePath('skill'),
			this.destinationPath(this.props.dir + 'skill')
		);
		this.fs.copy(
			this.templatePath('speechAssets'),
			this.destinationPath(this.props.dir + 'speechAssets')
		);
		this.fs.copy(
			this.templatePath('test'),
			this.destinationPath(this.props.dir + 'test')
		);
	}

	removingUnnecessaryFiles(){
		//config files
		this.fs.delete(this.templatePath('package.json'));

		//app files
		this.fs.delete(this.templatePath('skill/MainStateMachine.js'));
		this.fs.delete(this.destinationPath(this.props.dir + 'skill/_MainStateMachine.js'));

		this.fs.delete(this.templatePath('config/local.json'));
		this.fs.delete(this.destinationPath(this.props.dir + 'config/local.json.example'));

		this.fs.delete(this.templatePath('config/production.json'));
		this.fs.delete(this.destinationPath(this.props.dir + 'config/production.json.example'));

		this.fs.delete(this.templatePath('config/staging.json'));
		this.fs.delete(this.destinationPath(this.props.dir + 'config/staging.json.example'));

		this.fs.delete(this.templatePath('config/index.js'));
		this.fs.delete(this.destinationPath(this.props.dir + 'config/_index.js'));
	}

}