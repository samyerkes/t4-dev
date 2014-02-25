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
        files: 'build/views/*.html',
        tasks: ['includereplace', 'sails-linker', 'validation', 't4']
      },
      js: {
        files: ['build/js/*.js'],
        tasks: ['uglify', 't4']
      },
      css: {
        files: ['build/sass/*.sass'],
        tasks: ['compass', 't4', 'cmq', 'cssmin']
      },
      images: {
        files: ['build/imgs/*'],
        tasks: ['imagemin', 't4']
      },
      includes: {
        files: ['build/inc/*'],
        tasks: ['includereplace', 'sails-linker', 'validation', 't4']
      }
    },

    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'assets/js/global.js' : ['build/js/*.js']
        }
      }
    },
    copy: {
      bower: {
        cwd: 'bower_components',
        src: '*/**',
        dest: 'assets/lib',
        expand: true
      },
      t4: {
        cwd: 'assets/',
        src: '*/**',
        dest: 't4/',
        expand: true
      }
    },
    replace: {
      t4css: {
        src: ['t4/css/*.css'],
        overwrite: true,
        replacements: []
      },
      t4html: {
        src: ['t4/views/*.html'],
        overwrite: true,
        replacements: []
      },
    },
    validation: {
      files: {
        src: ['assets/views/*.html']
      }
    },
    cmq: {
      dist: {
        files: {
          't4/css/' : ['t4/css/*.css']
        }
      }
    },
    cssmin: {
      dist: {
        files: {
          't4/css/global.css': ['t4/css/global.css']
        }
      }
    },
    bower: {
      install:{
      }
    },
    'sails-linker': {
      modern: {
        options: {
          startTag: '<!--MODERNIZR-->',
          endTag: '<!--MODERNIZR END-->',
          fileTmpl: '<script src="../%s"></script>',
          appRoot: 'assets/'
        },
        files: {
          'assets/views/*.html': ['assets/lib/modernizr/modernizr.js']
        }
      },
      js : {
        options: {
          startTag: '<!--GLOBAL:JS-->',
          endTag: '<!--GLOBAL:JS END-->',
          fileTmpl: '<script src="../%s"></script>',
          appRoot: 'assets/'
        },
        files: {
          'assets/views/*.html': ['assets/js/*.js']
        }
      },
      css : {
        options: {
          startTag: '<!--GLOBAL:CSS-->',
          endTag: '<!--GLOBAL:CSS END-->',
          fileTmpl: '<link rel="stylesheet" href="../%s" />',
          appRoot: 'assets/'
        },
        files: {
          'assets/views/*.html': ['assets/css/*.css']
        }
      }
    },
    imagemin: {
      dynamic: {
        options: {
          cache: false,
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: 'build/imgs/',
          src: ['*.{png,jpg,gif}'],
          dest: 'assets/imgs/'
        }]
      }
    },
    includereplace: {
      dist: {
        options: {
          includesDir: 'build/inc/'
        },
        src: '*.html',
        dest: 'assets/views/',
        cwd: 'build/views/',
        expand: 'true'
      }
    }
  });
  // load plugins
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-combine-media-queries');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-include-replace');
  grunt.loadNpmTasks('grunt-sails-linker');
  grunt.loadNpmTasks('grunt-text-replace');

grunt.registerTask('replace-t4', function() {
  var cssReplacements = grunt.file.readJSON('replacements.json');
  grunt.config('replace.t4css.replacements', cssReplacements);
  grunt.task.run('replace');
});

//Build the initial directories
grunt.registerTask('build', ['bower', 'compass', 'uglify', 'imagemin', 'copy:bower',  'includereplace', 'sails-linker', 't4', 'cmq', 'cssmin', 'watch']);

//Builds T4 directory
grunt.registerTask('t4', ['copy:t4', 'replace-t4']);

// Default task.
grunt.registerTask('default', ['watch']);

};