module.exports = function(grunt) {
  // configure tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: '*.html'
      },
      css: {
        files: ['build/sass/*.sass'],
        tasks: ['compass:dist', 'replace']
      }
    }
  });
  // load plugins
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Default task.
grunt.registerTask('default', ['watch', 'replace']);


};