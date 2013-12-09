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
        tasks: ['imagemin', 'validation',]
      },
      js: {
        files: ['build/js/*.js'],
        tasks: ['uglify', 'copy:js']
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
    uglify: {
      dist: {
        files: {
          'assets/js/global.js' : ['build/js/*.js', '!build/js/jquery.js', '!build/js/modernizr.js']
        }
      }
    },
    copy: {
      js: {
        expand: true,
        cwd: 'build/js/',
        src: ['jquery.js', 'modernizr.js'],
        dest: 'assets/js/',
        flatten: true,
        filter: 'isFile',
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
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: 'build/imgs/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'assets/imgs/'
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
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-html-validation');

  // Default task.
grunt.registerTask('default', ['watch']);


};