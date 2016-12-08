module.exports = {
  'private': true,
  'engines': {
    'node': '>=4'
  },
  'devDependencies': {
    'babel-core': '^6.4.0',
    'babel-polyfill': '^6.16.0',
    'babel-preset-es2015': '^6.3.13',
    'babel-register': '^6.5.2',
    'browser-sync': '^2.2.1', 
    'del': '^1.1.1',
    'glob': '^7.0.3',
    'glob-fs': '^0.1.6',
    'lodash': '^4.13.1',
    'require-dir': '^0.3.1',
  },
  'eslintConfig': {
    'env': {
      'es6': true,
      'node': true,
      'browser': true
    },
    'rules': {
      'quotes': [
        2,
        'single'
      ]
    }
  },
  'dependencies': {
    'jquery': '~2.1.1',
    'mobile-detect': '^1.3.5',
    'crossroads': '^0.12.2'
  }
}