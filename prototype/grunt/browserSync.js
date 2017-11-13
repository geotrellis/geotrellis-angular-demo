module.exports = {
    dev: {
        bsFiles: {
            src : [
                'app/**/*.js',
                'app/**/*.css',
                'app/**/*.html'
            ]
        },

        options: {
            watchTask: true,
            server: './app'
        }
    }
};
