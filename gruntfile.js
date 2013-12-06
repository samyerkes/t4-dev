'use strict';

module.exports = function(grunt) {
  // configure tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: '*.html',
        tasks: ['validation']
      },
      css: {
        files: ['build/sass/*.sass'],
        tasks: ['compass:dist', 'replace', 'uncss']
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'build/sass',
          cssDir: 'assets/css',
          config: 'config.rb'
        }
      }
    },
    replace: {
      images: {
        src: ['assets/css/global.css'],
        overwrite: true,
        replacements: [{
          from: 'puppy', //this is where you replace local images with t4 urls
          to: 'dog'
        }]
      }
    },
    uncss: {
      dist: {
        files: {
          'assets/css/global.css': ['*.html']
        },
        options: {
          compress: true
        }
      }
    },
    validation: {
      files: {
        src: ['*.html']
      }
    }
  });
  // load plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-html-validation');

  // Default task.
grunt.registerTask('default', ['watch']);


};