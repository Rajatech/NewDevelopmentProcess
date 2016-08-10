/*
 * grunt-js-beautify
 * https://github.com/steve/grunt-js-beautify
 *
 * Copyright (c) 2015 Steven Edouard
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks





    grunt.registerMultiTask('js_beautify', 'Grunt plugin for running js-beautify', function () {
        // Merge task-specific and/or target-specific options with these defaults.

        var options = this.options({
            "indent_size": 4,
            "indent_char": " ",
            "indent_level": 0,
            "indent_with_tabs": false,
            "preserve_newlines": true,
            "max_preserve_newlines": 10,
            "jslint_happy": false,
            "space_after_anon_function": true,
            "brace_style": "collapse",
            "keep_array_indentation": false,
            "keep_function_indentation": false,
            "space_before_conditional": true,
            "break_chained_methods": false,
            "eval_code": false,
            "unescape_strings": false,
            "wrap_line_length": 0,
            "wrap_attributes": "auto",
            "wrap_attributes_indent_size": 4
        });
        // Iterate over all specified file groups.
        this.files.forEach(function (f) {
            // Concat specified files.
            var src = f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function (filepath) {
                // Read file source.
                var beautify = require('js-beautify').js_beautify;
                var beautified = beautify(grunt.file.read(filepath), options);
                grunt.file.write(filepath, beautified);
                grunt.log.writeln('sucessfully beautified ' + filepath);

            });
        });
    });
};