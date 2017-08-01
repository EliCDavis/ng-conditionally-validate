const karmaConf = require('./karma.conf.js');

const coverage_reporters = [
  { type: 'text-summary' },
];
const reporters = [
  /*'spec',*/
  'progress', 'kjhtml', 'coverage', 'remap-coverage'
];

if (process.env.TRAVIS) {
  console.log('On Travis sending coveralls');
  coverage_reporters.push({ type: 'lcov', dir: 'coverage' });
  reporters.push('coveralls');
} else {
  console.log('Not on Travis so not sending coveralls');
  coverage_reporters.push({ type: 'html', dir: 'coverage', 'subdir': '.' });
}

module.exports = function (config) {
  // Generic Karma Configuration
  karmaConf(config);

  //Extended Configuration for Karma Coverage Reports
  config.set({
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-coveralls'),
      require('karma-remap-coverage')
    ],
    customLaunchers: {
      // From the CLI. Not used here but interesting
      // chrome setup for travis CI using chromium
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    preprocessors: {
      './test/**/!(*spec).js': 'coverage'
    },
    reporters: reporters,
    coverageReporter: coverage_reporters,
    remapCoverageReporter: {
      'text-summary': null,
      html: './coverage/html',
      cobertura: './coverage/coverage.xml'
    }
  })
}
