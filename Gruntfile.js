module.exports = function(grunt) {

/* grunt.registerTask('default', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });
*/

grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

      jshint: {
        "globals": {
            "angular"   : true,
            "jasmine"   : false,
            "$"         : false,
            "_"         : false,
            "module"    : false,
            "require"   : false
        },
        files: {
          src: ['src/app/modules/client/**/*.js']
        }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/app/modules/**/*Controller.js'],
        dest: 'src/app/lib/all.controller.js',
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
        mangle : false
        },
        my_target: {
          files: {
            'src/app/lib/billingApp/all.controllers.min.js': ['<%=concat.dist.src %>'],
            'src/app/lib/billingApp/all.validator.min.js': ['src/app/modules/**/*Validator.js'],
            'src/app/lib/billingApp/all.services.min.js': ['src/app/modules/**/*Service.js'],
            'src/app/lib/billingApp/all.factory.min.js': ['src/app/modules/**/*Factory.js'],
          }
        }
  }

});

grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-uglify');

grunt.registerTask('default',['concat','uglify']);

};