module.exports = function (grunt) {

  grunt.initConfig({
    watch: {
      scripts: {
        options: { livereload: true },
        files: ['js/*.js', 'spec/*.js'],
        tasks: ['newer:jshint']
      }
    },
    jshint: {
      files: ['**/script.js']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-newer');

};