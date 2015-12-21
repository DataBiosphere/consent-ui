'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var gulpNgConfig = require('gulp-ng-config');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

gulp.task('configuration', function () {
    gulp.src('/app/consent-ui.conf')
        .pipe(gulpNgConfig('ConsentConfiguration'))
        .pipe(gulp.dest(path.join(conf.paths.src, '/app/configuration')));
});

gulp.task('appScripts', function () {
  return gulp.src(path.join(conf.paths.src, '/app/**/*.js'))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe(browserSync.reload({ stream: true }))
    .pipe($.size())
});

gulp.task('scripts', ['configuration', 'appScripts']);


