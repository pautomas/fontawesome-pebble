module.exports = function(grunt) {

  var bower = require('bower');

  var BOWER_PATH = bower.config.directory;
  var PEBBLEJS_PATH = BOWER_PATH + '/pebblejs';
  var APP_PATH = 'app/';
  var SRC_PATH = APP_PATH + 'src/';
  var TMP_PATH = '.tmp/';
  var BUILD_PATH = 'build/';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: [TMP_PATH, BUILD_PATH],
    copy: {
      toTemp: {
        files: [{
          expand: true,
          cwd: PEBBLEJS_PATH,
          src: ['src/**', 'wscript'],
          dest: TMP_PATH,
          filter: 'isFile'
        },{
          expand: true,
          cwd: SRC_PATH,
          src: ['**'],
          dest: TMP_PATH + '/src/js',
          filter: 'isFile'
        },{
          expand: true,
          cwd: APP_PATH,
          src: ['appinfo.json', 'resources/**'],
          dest: TMP_PATH,
          filter: 'isFile'
        }]
      },
      fromTemp: {
          files: [{
            expand: true,
            cwd: TMP_PATH,
            src: [BUILD_PATH + '.tmp.pbw'],
            dest: '',
            filter: 'isFile'
          }]
        }
    },
    rename: {
      tempPwb: {
        src: BUILD_PATH + '.tmp.pbw',
        dest: BUILD_PATH + '<%= pkg.name %>.pbw'
      }
    },
    shell: {
      build : {
        options: {
            stderr: true
        },
        command: [
          'cd ' + TMP_PATH,
          'pebble build'
        ].join('&&')
      },
      runEmulator : {
        command : function(emulator) {
          var command = 'pebble install';
          if (emulator) {
            command += ' --emulator ' + emulator;
          }
          return command;
        }
      },
      logs : {
        command : 'pebble logs'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-rename');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('build', 'Builds the app into the build/ folder', ['clean', 'copy:toTemp', 'shell:build', 'copy:fromTemp', 'rename:tempPwb']);
  grunt.registerTask('install', 'Runs the emulator and installs the app', function(emulator) {
    var emu = emulator || 'basalt';
    grunt.task.run('shell:runEmulator:' + emu);
  });
  grunt.registerTask('logs', 'Displays the log file', ['shell:logs']);
  grunt.registerTask('run', 'Builds, installs and runs the app', function(emulator) {
    var emu = emulator || 'basalt';
    grunt.task.run('build', 'install:' + emu);
  });
};
