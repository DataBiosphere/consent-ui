'use strict';

var path = require('path');
var conf = require('./gulp/conf');

var _ = require('lodash');
var wiredep = require('wiredep');

function listFiles() {
    var wiredepOptions = _.extend({}, conf.wiredep, {
        dependencies: true,
        devDependencies: true
    });

    return wiredep(wiredepOptions).js
        .concat([
            path.join(conf.paths.src, '/app/**/*.module.js'),
            path.join(conf.paths.src, '/app/**/*.controller.js'),
            path.join(conf.paths.src, '/app/components/**/*.module.js'),
            path.join(conf.paths.src, '/app/components/**/*.service.js'),
            path.join(conf.paths.src, '/**/*.spec.js'),
            path.join(conf.paths.src, '/**/*.html')
        ]);
}

module.exports = function(config) {

    var configuration = {
        files: listFiles(),

        exclude: [
            path.join(conf.paths.src,'app/components/chart/*.js')
        ],

        singleRun: true,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,

        frameworks: ['jasmine', 'angular-filesort'],

        angularFilesort: {
            whitelist: [path.join(conf.paths.src, '/**/!(*.html|*.spec|*.mock).js')]
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'src/',
            moduleName: 'ConsentManagement'
        },

        browsers : ['PhantomJS'],

        plugins : [
            'karma-jasmine',
            'karma-angular-filesort',
            'karma-phantomjs-launcher',
            'karma-coverage',
            'karma-ng-html2js-preprocessor'
        ],

        reporters: ['progress', 'coverage'],

        coverageReporter : {
            type : 'lcov',
            dir : 'coverage/',
            subdir: '.'
        },

        preprocessors: {
            'src/**/*.html': ['ng-html2js'],
            'src/app/**/*.controller.js': ['coverage']
        }


    };

    // This block is needed to execute Chrome on Travis
    // If you ever plan to use Chrome and Travis, you can keep it
    // If not, you can safely remove it
    // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
    if(configuration.browsers[0] === 'Chrome' && process.env.TRAVIS) {
        configuration.customLaunchers = {
            'chrome-travis-ci': {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        };
        configuration.browsers = ['chrome-travis-ci'];
    }

    config.set(configuration);
};
