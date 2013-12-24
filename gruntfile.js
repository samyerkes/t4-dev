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
        tasks: ['compass:dist', 'cmq', 'uncss', 'copy', 'replace']
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
      imgs: {
        cwd: 'build/imgs/',
        src: '*',
        dest: 'assets/imgs/',
        expand: true
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
      images: {
        src: ['t4/css/global.css'],
        overwrite: true,
        replacements: [
          {from: '../imgs/body-bg-600.gif', to: '<t4 type="media" id="36477" formatter="path/*"/>'},
          {from: '../imgs/body-bg-768.gif', to: '<t4 type="media" id="36471" formatter="path/*"/>'},
          {from: '../imgs/body-bg-sm.gif', to: '<t4 type="media" id="36471" formatter="path/*"/>'},
          {from: '../imgs/body-bg.gif', to: '<t4 type="media" id="36471" formatter="path/*"/>'},
          {from: '../imgs/makeitreal-600.gif', to: '<t4 type="media" id="36471" formatter="path/*"/>'},
          {from: '../imgs/makeitreal.gif', to: '<t4 type="media" id="36471" formatter="path/*"/>'},
          {from: '../imgs/makeitrealFooter.gif', to: '<t4 type="media" id="36471" formatter="path/*"/>'},
          {from: '../imgs/vcubar-footer.gif', to: '<t4 type="media" id="36471" formatter="path/*"/>'},
          {from: '../imgs/vcubrand-600.gif', to: '<t4 type="media" id="36471" formatter="path/*"/>'},
          {from: '../imgs/vcubrand-768.gif', to: '<t4 type="media" id="36471" formatter="path/*"/>'},
          {from: '../imgs/vcubrand.gif', to: '<t4 type="media" id="36471" formatter="path/*"/>'},
          {from: '../imgs/vcuseal.gif', to: '<t4 type="media" id="36471" formatter="path/*"/>'},
          //Continue adding images that are linked in the CSS here!
        ]
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
    },
    cmq: {
      options: {
        log: true
      },
      dist: {
        files: {
          'assets/css/' : ['assets/css/*.css']
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
          fileTmpl: '<link rel="stylesheet" href="%s"></script>',
          appRoot: ''
        },
        files: {
          '*.html': ['assets/css/*.css']
        }
      }
    }
  });
  // load plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-combine-media-queries');
  grunt.loadNpmTasks('grunt-sails-linker');
  grunt.loadNpmTasks('grunt-bower-task');

  // Default task.
grunt.registerTask('default', ['watch']);
grunt.registerTask('build', ['bower', 'copy', 'sails-linker']);


};