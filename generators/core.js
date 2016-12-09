'use strict';
const _ = require('lodash');
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
    isSelected: (generator, bundlerName) => {
        let settings = generator.config.getAll();
        return settings[VIEW_ENGINE_CONFIG_KEY] === bundlerName;
    }
}

const TaskRunner = {
    config: getModuleConfig(TASK_RUNNER_CONFIG_KEY),
    isSelected: (generator, bundlerName) => {
        let settings = generator.config.getAll();
        return settings[TASK_RUNNER_CONFIG_KEY] === bundlerName;
    }
}


const Bundler = {
    config: getModuleConfig(BUNDLER_CONFIG_KEY),
    isSelected: (generator, bundlerName) => {
        let settings = generator.config.getAll();
        return settings[BUNDLER_CONFIG_KEY] === bundlerName;
    }
}

module.exports = {
    DdiyException,
    TaskRunner,
    Bundler,
    ViewEngine
};