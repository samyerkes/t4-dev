module.exports = function(grunt) {
 
  grunt.registerTask('watch', [ 'watch' ]);
 
  grunt.initConfig({
    sass: {
      build: {
        files: {
          "assets/css/global.css": "build/sass/global.sass"
        },
        options: {
            style: 'compressed'
        }
      }
    },
    replace: {
      images: {
        src: ['build/text/*.txt'],
        dest: 'assets/text/',
        replacements: [{
          from: 'Red',
          to: 'Blue'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
 
// Default task.
grunt.registerTask('default', ['replace', 'sass']);

};
