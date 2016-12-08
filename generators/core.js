'use strict';
const _ = require('lodash');
const BUNDLER_CONFIG_KEY = 'BUNDLER';
const TASK_RUNNER_CONFIG_KEY = 'TASK_RUNNER'

function DdiyException(value, message) {
    this.value = value;
    this.message = message;
    this.toString = function () {
        return `${this.value}: ${this.message}`;
    };
}

const PackageJson = {
    merge:(generator, packageJson) => {
        let settings = generator.config.getAll();
        generator.config.set('packageJson',
            _.merge(packageJson,settings.packageJson || {}));
        generator.config.save();
        generator.log('NEW PACKAGE JSON')
        generator.log(generator.config.get('packageJson'));
    }
}

const TaskRunner = {
    config: (generator, name, options, packageJson) => {
        let settings = generator.config.getAll();
            let current = generator.config.get(TASK_RUNNER_CONFIG_KEY);

            if (current === null || typeof (current) === 'undefined') {
                generator.config.set(TASK_RUNNER_CONFIG_KEY, name);
            } else if (current !== name) {
                return settings;
            }

            generator.log(`${name.toUpperCase()} CONFIG`);
            generator.config.set(TASK_RUNNER_CONFIG_KEY, name);
            generator.config.set(`${TASK_RUNNER_CONFIG_KEY}_OPTIONS`, options);
            generator.config.save();
            settings = generator.config.getAll();

            PackageJson.merge(generator, packageJson);

            return settings;
    },
    isSelected: (generator, bundlerName) => {
        let settings = generator.config.getAll();
        return settings[BUNDLER_CONFIG_KEY] === bundlerName;
    }
}


const Bundler = {
    config: (generator, bundlerName, bundlerOptions, packageJson) => {
        let settings = generator.config.getAll();
            let currentBundler = generator.config.get(BUNDLER_CONFIG_KEY);

            if (currentBundler === null || typeof (currentBundler) === 'undefined') {
                generator.config.set(BUNDLER_CONFIG_KEY, bundlerName);
            } else if (currentBundler !== bundlerName) {
                return settings;
            }

            generator.log(`${bundlerName.toUpperCase()} CONFIG`);
            generator.config.set(BUNDLER_CONFIG_KEY, bundlerName);
            generator.config.set(`${BUNDLER_CONFIG_KEY}_OPTIONS`, bundlerOptions);
            generator.config.save();
            settings = generator.config.getAll();

            PackageJson.merge(generator, packageJson);

            return settings;
    },
    isSelected: (generator, bundlerName) => {
        let settings = generator.config.getAll();
        return settings[BUNDLER_CONFIG_KEY] === bundlerName;
    }
}

module.exports = {
    DdiyException,
    TaskRunner,
    Bundler
};