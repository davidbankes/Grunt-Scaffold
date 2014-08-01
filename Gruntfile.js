var jsConfig = require('./jsConfig.js');

module.exports = function(grunt) {


	/* 
		DOES!!
			jshint
			smushit
			sass watch (ruby sass)
			css live reload
			grunt reload on edit
			uglify javascript

	*//*
		Questions:
			run sass:dev and sass:dist at same time always?
			js uglify stuff in watch vs as a separately run task?
			test for uglification didn't have nasty side effects?
	*/

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				// the banner is inserted at the top of the output
				//banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'www/res/js/site.js': jsConfig.uglificationConfig()
				}
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'www/res/js/site.js'],
			options: {
				// options here to override JSHint defaults
				asi:true,
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},
		smushit: {
			mygroup: {
				src: ['www/res/images/**/*.png','www/res/images/**/*.jpg','www/res/images/**/*.jpeg'],
				dest: 'www/res/images_min'
			}
		},
		sass: {                                 // task
			dist: {                             // target
				options:{
					sourcemap:false,
					style:'compressed'
				},
				files: {                        // dictionary of files
					'www/res/css/style.css': 'www/res/css/sass/style.scss'     // 'destination': 'source'
				}
			},
			dev: {                              // another target
				options:{
					sourcemap:true,
					style:'expanded',
					quiet:true // hide all the deprecated notices
				},
				files: {
					'www/res/css/style-dev.css': 'www/res/css/sass/style.scss'     // 'destination': 'source'
				}
			}
		},
		watch: {
			options: {livereload:true},
			sass:{
				options: {livereload:false},
				files: ['www/res/css/**/*.scss'],
				tasks: ['sass:dev','sass:dist']
			},
			css:{
				files: ['www/res/css/style-dev.css'],
				tasks: []
			},
			/*js:{
				options: {livereload:false},
				files: ['www/res/js/site-dev.js'],
				tasks: ['uglify:dist']
			},*/
			configFiles: {
				options: {reload: true},
				files: ['Gruntfile.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-smushit');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-contrib-qunit');
	//grunt.loadNpmTasks('grunt-contrib-concat');
	//grunt.loadNpmTasks('grunt-sass');

	//grunt.registerTask('test', ['jshint',]);
	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('deploy', ['uglify:dist']);

	//grunt.registerTask('deploy', ['smushit', 'jshint', 'concat js', 'check session config time']);

};
