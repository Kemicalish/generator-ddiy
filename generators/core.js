const BUNDLER_CONFIG_KEY = 'BUNDLER';

function DdiyException(value, message) {
    this.value = value;
    this.message = message;
    this.toString = function () {
        return `${this.value}: ${this.message}`;
    };
}

const Bundler = {
    config: (generator, bundlerName, bundlerOptions) => {
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

            return settings;
    },
    isSelected: (generator, bundlerName) => {
        let settings = generator.config.getAll();
        return settings[BUNDLER_CONFIG_KEY] === bundlerName;
    }
}

module.exports = {
    DdiyException,
    Bundler
};