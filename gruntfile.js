module.exports = function(grunt) {
 
  grunt.registerTask('watch', [ 'watch' ]);
 
  grunt.initConfig({
    sass: {
      build: {
        files: {
          "assets/css/global.css": "assets/sass/global.sass"
        },
        options: {
            style: 'compressed'
        }
      }
    },
    watch: {
        files: ['assets/css/global.css'],
        options: {
            livereload: true
        }
    },
    replace: {
      images: {
        src: ['assets/imgs/*.jpg'],
        dest: 'build/imgs/',
        replacements: [{
          from: 'puppy',
          to: 'dog'
        }]
      }
    }
  });
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
 
// Default task.
grunt.registerTask('default', ['replace', 'sass', 'watch']);

};
