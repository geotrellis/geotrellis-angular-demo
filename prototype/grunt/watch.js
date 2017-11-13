module.exports = {
    script: {
		files: ['app/**/*.js'],
		options: {
			spawn: false,
		}
	},

	css: {
        files: ['app/**/*.scss'],
        tasks: ['sass_import', 'exec', 'sass', 'postcss'],
        options: {
            spawn: false,
        }
	},

    html: {
        files: ['app/**/*.html'],
        options: {
            spawn: false,
        }
    }
};
