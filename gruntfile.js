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
        tasks: ['validation', 'copy']
      },
      js: {
        files: ['build/js/*.js'],
        tasks: ['uglify', 'copy']
      },
      css: {
        files: ['build/sass/*.sass'],
        tasks: ['compass:dist', 'cmq', 'copy', 'cssmin', 'replace-t4']
      },
      images: {
        files: ['build/imgs/*'],
        tasks: ['imagemin', 'copy:t4']
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
      },
      t4: {
        cwd: 'assets/',
        src: '*/**',
        dest: 't4/',
        expand: true
      },
      bower: {
        cwd: 'bower_components',
        src: '*/**',
        dest: 'assets/lib',
        expand: true
      }
    },
    replace: {
      t4: {
        src: ['t4/css/global.css'],
        overwrite: true,
        replacements: []
      }
    },
    validation: {
      files: {
        src: ['*.html']
      }
    },
    cmq: {
      dist: {
        files: {
          'assets/css/' : ['assets/css/*.css']
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
          fileTmpl: '<script src="%s"></script>',
          appRoot: ''
        },
        files: {
          '*.html': ['assets/lib/modernizr/modernizr.js']
        }
      },
      jquery: {
        options: {
          startTag: '<!--JQUERY-->',
          endTag: '<!--JQUERY END-->',
          fileTmpl: '<script src="%s"></script>',
          appRoot: ''
        },
        files: {
          '*.html': ['assets/lib/jquery/jquery.min.js']
        }
      },
      js : {
        options: {
          startTag: '<!--GLOBAL:JS-->',
          endTag: '<!--GLOBAL:JS END-->',
          fileTmpl: '<script src="%s"></script>',
          appRoot: ''
        },
        files: {
          '*.html': ['assets/js/*.js']
        }
      },
      css : {
        options: {
          startTag: '<!--GLOBAL:CSS-->',
          endTag: '<!--GLOBAL:CSS END-->',
          fileTmpl: '<link rel="stylesheet" href="%s" />',
          appRoot: ''
        },
        files: {
          '*.html': ['assets/css/*.css']
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
    }
  });
  // load plugins
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-combine-media-queries');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-sails-linker');
  grunt.loadNpmTasks('grunt-text-replace');

grunt.registerTask('replace-t4', function() {
  var replacements = grunt.file.readJSON('replacements.json');
  grunt.config('replace.t4.replacements', replacements);
  grunt.task.run('replace');
});

//Build the initial directories
grunt.registerTask('build', ['bower', 'compass:dist', 'cmq', 'uglify', 'imagemin', 'copy', 'cssmin', 'replace-t4', 'sails-linker']);

// Default task.
grunt.registerTask('default', ['watch']);

};