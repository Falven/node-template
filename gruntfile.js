module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
          includePaths: [ 'src/sass/' ],
          sourceMap: false
      },
      dev: {
        options: {
          outputStyle: 'expanded'
        },
        files: {
          'dist/styles/index.css': 'src/sass/index.scss'
        }
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'dist/styles/index.css': 'src/sass/index.scss'
        }
      }
    },

    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')()
        ]
      },
      dev: {
        src: 'dist/styles/*.css'
      },
      dist: {
        src: 'dist/styles/*.css'
      }
    },

    concat: {
      dev: {
        src: 'src/js/*.js',
        dest: 'dist/scripts/index.js'
      },
      dist: {
        src: 'dist/scripts/*.js',
        dest: 'dist/scripts/index.js'
      }
    },

    jshint: {
      dev: {
        options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          browser: true,
          globals: {
            jQuery: true
          }
        },
        src: [ 'gruntfile.js', 'dist/scripts/index.js' ]
      },
      dist: {
        options: {
          curly: true,
          eqeqeq: true,
          eqnull: true,
          browser: true,
          globals: {
            jQuery: true
          }
        },
        src: [ 'gruntfile.js', 'dist/scripts/index.js' ]
      }
    },

    uglify: {
      dev: {
        options: {
          mangle: false,
          compress: false,
          beautify: true,
          sourceMap: false
        },
        files: {
          'dist/scripts/index.js': 'dist/scripts/index.js'
        }
      },
      dist: {
        options: {
          mangle: true,
          compress: {
            drop_console: true,
            global_defs: {
              "DEBUG": false
            },
            dead_code: true,
            unused: true
          },
          sourceMap: false
        },
        files: {
          'dist/scripts/index.min.js': 'dist/scripts/index.js'
        }
      }
    },

    clean: {
      dev: null,
      dist: 'dist/scripts/index.js'
    },

    express: {
      options: {
      },
      dev: {
        options: {
          script: 'app.js',
          node_env: 'development'
        }
      },
      dist: {
        options: {
          script: 'app.js',
          node_env: 'production'
        }
      }
    },

    open : {
      dev : {
        path: 'http://localhost:3000'
      }
    },

    watch: {
      css: {
        files: 'src/sass/*.scss',
        tasks: [ 'sass:dev', 'postcss:dev' ]
      },
      js: {
        files: [ 'gruntfile.js', 'src/js/*.js' ],
        tasks: [ 'concat:dev', 'jshint:dev', 'uglify:dev' ]
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [ 'src/jade/*', 'dist/**/*' ]
      }
    }
  });

  grunt.registerTask('default', [
    'express:dev',
    'open:dev',
    'watch'
  ]);
  grunt.registerTask('dev', [
    'sass:dev',
    'postcss:dev',
    'concat:dev',
    'jshint:dev',
    'uglify:dev'
  ]);
  grunt.registerTask('dist', [
    'sass:dist',
    'postcss:dist',
    'concat:dist',
    'jshint:dist',
    'uglify:dist',
    'clean:dist'
  ]);
};