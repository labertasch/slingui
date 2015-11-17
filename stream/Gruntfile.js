module.exports = function(grunt) {
    grunt.initConfig({
        exec: {
            install: {
                command: 'mvn install',
                stdout: true,
                stderr: true
            }
        },
        qunit: {
               options: {
                 timeout: 99999,
                   page: {
                       userName: "admin",
                       password: "admin"
                   },
                //   inject: "/libs/slingui/client/tests/phantomjs/bridge.js",
                   httpBase: {
                       host: "http://localhost:4502",
                       doRewrite: function (file) {
                           return file.replace("src/main/resources/SLING-INF/", "");
                       }
                   }
               },
            all: ['src/main/resources/SLING-INF/libs/slingui/client/tests/**/*.html']
        },
        uglify: {
            options: {
                mangle: {
                    except: ['SlingAwesome2']
                },
                banner: "/******************************************************************************\n" +
                        " * ADOBE CONFIDENTIAL                                                         *\n" +
                        " * ---------------------------------------------------------------------------*\n" +
                        " * Copyright 2015  Adobe Systems Incorporated                                 *\n" +
                        " * All Rights Reserved.                                                       *\n" +
                        " * ---------------------------------------------------------------------------*\n" +
                        " * NOTICE:  All information contained herein is, and remains                  *\n" +
                        " * the property of Adobe Systems Incorporated and its suppliers,              *\n" +
                        " * if any.  The intellectual and technical concepts contained                 *\n" +
                        " * herein are proprietary to Adobe Systems Incorporated and its               *\n" +
                        " * suppliers and are protected by trade secret or copyright law.              *\n" +
                        " * Dissemination of this information or reproduction of this material         *\n" +
                        " * is strictly forbidden unless prior written permission is obtained          *\n" +
                        " * from Adobe Systems Incorporated.                                           *\n" +
                        " * ---------------------------------------------------------------------------*\n" +
                        " * Please note that some portions of this project are written by third parties*\n" +
                        " * under different license terms. Your use of those portions are governed by  *\n" +
                        " * the license terms contained in the corresponding files.                    *\n" +
                        " * ---------------------------------------------------------------------------*\n" +
                        " * SlingUI Client API                             		                       *\n" +
                        " ******************************************************************************/\n"
            },
            slingawesome: {
                files: {
                    'src/main/resources/SLING-INF/libs/slingui/client/stream.min.js': ['src/main/resources/SLING-INF/libs/slingui/client/stream.js']
                }
            }
        },
        browserify: {
            browserifyOptions: {
              standalone: "SlingUI"
            },
            dist: {
                files: {
                    'src/main/resources/SLING-INF/libs/slingui/client/stream.js': ['src/main/resources/SLING-INF/libs/slingui/client/src/**/*.js']
                }
            }
        },
        watch: {
            javafiles: {
                files: ['src/**/*.java'],
                tasks: ['exec:install'],
                options: {
                    spawn: true,
                    livereload: true
                }
            },
            scripts: {
                files: ['src/main/resources/SLING-INF/libs/slingui/client/src/**/*.js', 'src/main/resources/SLING-INF/libs/slingui/demo/**/*.html', 'src/main/resources/SLING-INF/libs/slingui/client/tests/**/*.*'],
                tasks: ['browserify', 'jsdoc', 'exec:install', 'qunit'],
                options: {
                    spawn: true,
                    livereload: true
                }
            }
        },
        jsdoc : {
            dist : {
                src: ['src/main/resources/SLING-INF/libs/slingui/client/src/**/*.js'],
                options: {
                    destination: 'src/main/resources/SLING-INF/libs/slingui/client//docs'/*,
                    template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
                    configure : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"*/
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-watch');

};
