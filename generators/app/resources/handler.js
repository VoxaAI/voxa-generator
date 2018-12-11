const _ = require('lodash');
let
  questions = require('./prompts'),
  initialPrompt = questions.initialPrompt,
  secondPrompt = questions.secondPrompt,
  pluginsPrompt = questions.pluginsPrompt,
  installPrompt = questions.installPrompt,
  _plugins = require('./plugins');

function requiresToString(requiresObject) {
  return _.reduce(requiresObject, (str, value, key) => {
    return `${str}\nconst ${key} = require('${value}');`;
  }, '');
}

module.exports = class PromptHandler {

  initialPrompt() {
    _.set(initialPrompt[0], 'default', this.appname);
    return this.prompt(initialPrompt);
  }

  secondPrompt(answers) {
    _.set(secondPrompt[0], 'default', answers.name);
    if (answers.subDirConfim) {
      return this.prompt(secondPrompt)
        .then((res) => {
          _.set(answers, 'subDir', res.subDir);
          return answers;
        });
    }
    return answers;
  }

  thirdPrompt(answers) {
    return this.prompt(installPrompt)
      .then((res) => {
        _.set(answers, 'install', res);
        return answers;
      });
  }

  setPlugins(answers) {
    return this.prompt(pluginsPrompt)
      .then((res) => {
        _.set(answers, 'plugins', res);
        return answers;
      });
  }

  finishPrompts(answers) {
    const { language } = answers.install;
    this.language = language.toLowerCase();
    this.ext = {
      javascript: 'js',
      typescript: 'ts'
    }[this.language];

    const plugins = answers.plugins,
      path = this.templatePath(`${this.language}/src/app/_main.${this.ext}`),
      newPath = this.templatePath(`${this.language}/src/app/main.${this.ext}`),

      configPath = this.templatePath(`${this.language}/src/config/_index.${this.ext}`),
      configNewPath = this.templatePath(`${this.language}/src/config/index.${this.ext}`),
      configFile = this.fs.read(configPath),

      jsonPath = this.templatePath(`${this.language}/_package.json`),
      jsonNewPath = this.templatePath(`${this.language}/package.json`),
      jsonFile = JSON.parse(this.fs.read(jsonPath)),

      envPath = this.templatePath(`common/config/local.json.example`),
      envNewPath = this.templatePath(`common/config/local.json`),
      stagNewPath = this.templatePath(`common/config/staging.json`),
      prodNewPath = this.templatePath(`common/config/production.json`),
      envFile = JSON.parse(this.fs.read(envPath)),

      filerBuffer = this.fs.read(path),
      requiresHook = '/*******  requires  *******/',
      hook = '/*******  plugins  *******/',

      arrFiles = [],

      dir = answers.subDirConfim ? answers.subDir + '/' : '';

    let newRequires = {},
      newBuffer = '',
      configRequires = {},
      configBuffer = '';

    _.set(answers, 'dir', dir);

    if (_.keys(answers).length > 0) {
      _.forIn(plugins, (val, key) => {
        if (val) {
          let i = _.findIndex(_plugins, { name: key }),
            requires = _plugins[i].requires,
            usage = _plugins[i].usage,
            dependencies = _plugins[i].dependencies,
            files = _plugins[i].files,
            env = _plugins[i].env,
            config = _plugins[i].config;

          if (requires) {
            newRequires = Object.assign({}, newRequires || {}, requires);
          }

          if (config) {
            configRequires = Object.assign({}, configRequires || {}, config.requires);
            configBuffer += config.usage + '\n\n';
          }

          if (dependencies) {
            _.forEach(dependencies, function (item) {
              _.set(jsonFile, `dependencies.${item.name}`, item.version);
            });
          }

          if (files) {
            _.forEach(files, (item) => {
              arrFiles.push(item);
            });
          }

          if (env) {
            _.forEach(env, (item) => {
              _.mapKeys(item, (value, key) => {
                _.set(envFile, key, value);
              });
            });
          }

          //inserting usage
          newBuffer += usage + '\n\n';
        }
      });

      //creating main
      newBuffer = filerBuffer.replace(hook, hook + '\n' + newBuffer.trimRight());
      newBuffer = newBuffer.replace(requiresHook, requiresHook + '\n' + requiresToString(newRequires).trim());
      this.fs.write(newPath, newBuffer);

      //creating config/index.js
      configBuffer = configFile.replace(hook, hook + '\n' + configBuffer.trimRight());
      configBuffer = configBuffer.replace(requiresHook, requiresHook + '\n' + requiresToString(configRequires).trimRight());
      this.fs.write(configNewPath, configBuffer);

      //creating package.json
      this.fs.write(jsonNewPath, JSON.stringify(jsonFile, null, '\t'));
    }

    if (arrFiles.length > 0) {
      _.set(answers, 'services', arrFiles);
    }

    _.set(answers, 'env', envFile);
    this.fs.write(envNewPath, JSON.stringify(envFile, null, '\t'));
    this.fs.write(stagNewPath, JSON.stringify(envFile, null, '\t'));
    this.fs.write(prodNewPath, JSON.stringify(envFile, null, '\t'));

    this.props = answers;
    return this.props;
  }

  setNewDestinationRoot(newRoute) {
    this.destinationRoot(newRoute);
  }

  creatingConfigFiles() {
    switch (this.language) {
      case 'javascript':
        this.fs.copy(
          this.templatePath(`${this.language}/.eslintrc.json`),
          this.destinationPath('.eslintrc.json')
        );
      break;
      case 'typescript':
        this.fs.copy(
          this.templatePath(`${this.language}/tsconfig.json`),
          this.destinationPath('tsconfig.json')
        );
        this.fs.copy(
          this.templatePath(`${this.language}/tslint.json`),
          this.destinationPath('tslint.json')
        );
      break;
    }
    this.fs.copy(
      this.templatePath(`common/.editorconfig`),
      this.destinationPath('.editorconfig')
    );
    this.fs.copy(
      this.templatePath('common/_gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath(`common/.nvmrc`),
      this.destinationPath('.nvmrc')
    );
    this.fs.copyTpl(
      this.templatePath(`${this.language}/package.json`),
      this.destinationPath('package.json'), {
        name: this.props.name,
        author: this.props.author
      }
    );
    this.fs.copyTpl(
      this.templatePath(`${this.language}/README.md`),
      this.destinationPath('README.md'), {
        name: this.props.name
      }
    );
    this.fs.copy(
      this.templatePath(`${this.language}/server.${this.ext}`),
      this.destinationPath(`server.${this.ext}`)
    );
    this.fs.copy(
      this.templatePath(`common/serverless.yml`),
      this.destinationPath('serverless.yml')
    );
  }

  creatingAppFiles() {
    this.fs.copy(
      this.templatePath('common/config'),
      this.destinationPath('src/config')
    );

    this.fs.copy(
      this.templatePath(`${this.language}/src/config/index.${this.ext}`),
      this.destinationPath(`src/config/index.${this.ext}`)
    );

    this.fs.copy(
      this.templatePath(`${this.language}/src/config/env.${this.ext}`),
      this.destinationPath(`src/config/env.${this.ext}`)
    );

    if (this.props.services) {
      _.forEach(this.props.services, (item) => {
        this.fs.copy(
          this.templatePath(`${this.language}/src/${item}`),
          this.destinationPath(`src/${item}`)
        );
      });
    }
    else {
      this.fs.copy(
        this.templatePath(`${this.language}/src/services/.gitkeep`),
        this.destinationPath('src/services/.gitkeep')
      );
    }

    this.fs.copy(
      this.templatePath(`${this.language}/src/app/`),
      this.destinationPath('src/app/')
    );
    this.fs.copy(
      this.templatePath('common/speech-assets'),
      this.destinationPath('speech-assets')
    );
    this.fs.copy(
      this.templatePath(`${this.language}/test`),
      this.destinationPath('test')
    );
  }

  removingUnnecessaryFiles() {
    //config files
    this.fs.delete(this.templatePath(`${this.language}/package.json`));

    //app files
    this.fs.delete(this.templatePath(`${this.language}/src/app/main.${this.ext}`));
    this.fs.delete(this.destinationPath(`src/app/_main.${this.ext}`));

    this.fs.delete(this.templatePath(`common/config/local.json`));
    this.fs.delete(this.destinationPath('src/config/local.json.example'));

    this.fs.delete(this.templatePath('common/config/production.json'));
    this.fs.delete(this.destinationPath('src/config/production.json.example'));

    this.fs.delete(this.templatePath('common/config/staging.json'));
    this.fs.delete(this.destinationPath('src/config/staging.json.example'));

    this.fs.delete(this.templatePath(`${this.language}/src/config/index.${this.ext}`));
  }

};
