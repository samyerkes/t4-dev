module.exports = function(grunt) {
 
  grunt.registerTask('watch', [ 'watch' ]);
 
  grunt.initConfig({
    sass: {
      build: {
        files: {
          "assets/css/global.css": "build/sass/global.sass"
        },
        options: {
            style: 'compressed',
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
    }
  });

  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
 
// Default task.
grunt.registerTask('default', ['sass', 'replace']);

};
