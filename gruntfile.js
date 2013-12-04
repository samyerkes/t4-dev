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
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
 
// Default task.
grunt.registerTask('default', ['sass', 'watch']);

};
