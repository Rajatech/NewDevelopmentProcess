/*
 * grunt-js-beautify
 * https://github.com/steve/grunt-js-beautify
 *
 * Copyright (c) 2015 Steven Edouard
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    js_beautify: {
      default_options: {
        options: {
          'good-stuff': true
        },
        files: {
          'tmp/default_options': ['tasks/*.js']
        }
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'js_beautify']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
