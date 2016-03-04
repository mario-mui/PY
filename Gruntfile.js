module.exports = function(grunt) {

  grunt.initConfig({
    coffee: {
      dev: {
        options: {
          bare: true,
          sourceMap: true,
          sourceRoot: './'
        },
        files: [{
          expand: true,
          cwd: 'assets/coffee/',
          src: ['**/*.coffee'],
          dest: 'public/js/',
          ext: '.js'
        }]
      }
    },
    watch: {
      coffee:{
        files: ['assets/coffee/**'],
        tasks: ['coffee:dev']
      },
      jade:{
        files: ['assets/dialog/**'],
        tasks: ['jade:dev']
      },
      css:{
        files: ['assets/styles/**'],
        tasks: ['copy:dev']
      }
    },
    jade:{
      dev: {
        files: [ {
          expand: true,
          cwd: "assets/dialog/",
          src: "**/*.jade",
          dest: "public/dialog/",
          ext: ".html"
        } ]
      }
    },
    clean:{
      dev: ['public/**','!public/user'],
    },
    copy:{
      dev: {
        files: [{
          expand: true,
          cwd: './assets',
          src: ['**/*.!(coffee|less|jade)'],
          dest: 'public'
        }]
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['clean:dev','coffee:dev','jade:dev','copy:dev','watch']);

};