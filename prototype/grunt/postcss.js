module.exports = {
    options: {
        map: false,
        processors: [
            require('autoprefixer'),
            require('cssnano')({'safe': true})
        ],
    },

    dist: {
        src: 'app/css/*.css'
    }
};
