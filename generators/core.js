'use strict';
const _ = require('lodash');
const conf = require('./conf.js');
const BUNDLER_CONFIG_KEY = 'BUNDLER';
const TASK_RUNNER_CONFIG_KEY = 'TASK_RUNNER';
const VIEW_ENGINE_CONFIG_KEY = 'VIEW_ENGINE';

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

const getIsSelected = (configKey) => {
    return (generator, name) => {
        let settings = generator.config.getAll();
        return settings[configKey] === name;
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

const getModuleWriting = (configKey) => {
    return (generator, name, options, packageJson) => {
        //Always done
        generator.log(`${name.toUpperCase()} ALWAYS WRITING`)

        copylogo(generator, conf, name, options);

        if (!(getIsSelected(configKey))(generator, name)) {
            return false;
        }

        //Done only if selected
        generator.log(`${name.toUpperCase()} SELECTED WRITING`)

        return true;
    }
}

const getModuleConfig = (configKey) => {
    return (generator, name, options, packageJson) => {
        let settings = generator.config.getAll();
        let current = generator.config.get(configKey);
        generator.log(`${configKey.toUpperCase()}  => ${name} START`);

        if (current === null || typeof (current) === 'undefined') {
            generator.config.set(configKey, name);
        } else if (current !== name) {
            return settings;
        }

        generator.log(`${configKey.toUpperCase()}  => ${name} CONFIG`);
        generator.config.set(configKey, name);
        generator.config.set(`${configKey}_OPTIONS`, options);
        generator.config.save();
        settings = generator.config.getAll();

        PackageJson.merge(generator, packageJson);

        return settings;
    }
}



const ViewEngine = {
    config: getModuleConfig(VIEW_ENGINE_CONFIG_KEY),
    writing:getModuleWriting(VIEW_ENGINE_CONFIG_KEY),
    isSelected: getIsSelected(VIEW_ENGINE_CONFIG_KEY)
}

const TaskRunner = {
    config: getModuleConfig(TASK_RUNNER_CONFIG_KEY),
    writing:getModuleWriting(TASK_RUNNER_CONFIG_KEY),
    isSelected: getIsSelected(TASK_RUNNER_CONFIG_KEY)
}


const Bundler = {
    config: getModuleConfig(BUNDLER_CONFIG_KEY),
    writing:getModuleWriting(BUNDLER_CONFIG_KEY),
    isSelected: getIsSelected(BUNDLER_CONFIG_KEY)
}

module.exports = {
    DdiyException,
    TaskRunner,
    Bundler,
    ViewEngine
};