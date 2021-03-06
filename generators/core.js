'use strict';
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const conf = require('./conf.js');
const BUNDLER_CONFIG_KEY = 'BUNDLER';
const TASK_RUNNER_CONFIG_KEY = 'TASK_RUNNER';
const VIEW_ENGINE_CONFIG_KEY = 'VIEW_ENGINE';
const STATE_CONTAINER_CONFIG_KEY = 'STATE_CONTAINER';


function DdiyException(value, message) {
    this.value = value;
    this.message = message;
    this.toString = function () {
        return `${this.value}: ${this.message}`;
    };
}

const PackageJson = {
    merge: (generator, packageJson) => {
        let settings = generator.config.getAll();
        generator.config.set('packageJson',
            _.merge(packageJson, settings.packageJson || {}));
        generator.config.save();
        generator.log('NEW PACKAGE JSON');
        //generator.log(generator.config.get('packageJson'));
    }
};

const getSettings = (pluginOptions, generator) => _.merge({}, conf, conf.prompt, pluginOptions, ( generator ? generator.config.getAll() : {}) );

const getModuleName = dirname => dirname.split('\\').slice(-1)[0];

const getIsSelected = (configKey) => {
    return (generator, name) => {
        let settings = generator.config.getAll();
        generator.log(`${settings.STACK[configKey]}  === ${name} ???`)
        return settings.STACK[configKey] === name;
    }
}

const copylogo = (generator, conf, name, options) => {
    if(! options.LOGO_PATH){
        generator.log('No LOGO_PATH key found in options for ' + name);
        return;
    }
    generator.fs.copy(
            options.LOGO_PATH,
            generator.destinationPath(`${conf.WORKSPACE_DIRNAME}/${conf.APP_DIRNAME}/images/demo/${name}-logo.png`)
    );
}

const addMainRequire = (generator, options) => {
    const requireFile = path.join(generator.templatePath('..'), 'main-require.js');
    if (fs.existsSync(requireFile)) {
        const currentRequire = require(requireFile);
        const requiresJs = generator.config.get('mainRequireJs') || {};
        const requiresCss = generator.config.get('mainRequireCss') || [];
        generator.config.set('mainRequireJs', _.merge({}, requiresJs, currentRequire.js || {} ));
        generator.config.set('mainRequireCss', _.concat(requiresCss , currentRequire.css || [] ));
    }
}

const getModuleWriting = (configKey) => {
    return (generator, options, packageJson) => {
        if(!options.NAME){
            generator.log.error('Generator Name is not defined');
            return false;
        }
        let name = options.NAME;

        //Always done
        generator.log(`${configKey.toUpperCase()}  => ${name.toUpperCase()} ALWAYS WRITING`)

        copylogo(generator, conf, name, options);

        if (!(getIsSelected(configKey))(generator, name)) {
            return false;
        }

        //Done only if selected
        generator.log(`${configKey.toUpperCase()}  => ${name.toUpperCase()} SELECTED WRITING`)

        return true;
    }
}

const getModuleConfig = (configKey) => {
    return (generator, options, packageJson) => {
        if(!options.NAME){
            generator.log.error('Generator Name is not defined');
            return false;
        }
        let name = options.NAME;

        let settings = generator.config.getAll();
        let current = settings.prompt ? settings.prompt[configKey] : null;
        generator.log(`${configKey.toUpperCase()}  => ${name} START [CHOSEN: ${current}]`);

        if (current === null || typeof (current) === 'undefined') {
            generator.config.set(configKey, name);
        } else if (current !== name) {
            return settings;
        }

        generator.log(`${configKey.toUpperCase()}  => ${name} CONFIG`);
        const stack = generator.config.get('STACK') || {};
         generator.config.set('STACK',
            _.merge({}, 
            stack, 
            _.fromPairs([
                [configKey, name],
                [`${configKey}_OPTIONS`, options]
            ]))
        );

        addMainRequire(generator, options);

        generator.config.save();
        settings = generator.config.getAll();

        PackageJson.merge(generator, packageJson);

        return settings;
    }
}

function createModule(configKey){
    return {
        config: getModuleConfig(configKey),
        writing:getModuleWriting(configKey),
        isSelected: getIsSelected(configKey)
    }
}

const ViewEngine = createModule(VIEW_ENGINE_CONFIG_KEY); 
const Bundler = createModule(BUNDLER_CONFIG_KEY); 
const TaskRunner = createModule(TASK_RUNNER_CONFIG_KEY); 
const StateContainer = createModule(STATE_CONTAINER_CONFIG_KEY); 


module.exports = {
    addMainRequire,
    getSettings,
    getModuleName,
    DdiyException,
    TaskRunner,
    Bundler,
    ViewEngine,
    StateContainer
};