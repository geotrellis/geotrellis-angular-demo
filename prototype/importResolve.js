var importResolve = require('import-resolve');

importResolve({
    ext: 'scss',
    pathToMain: 'app/sass/_main.scss',
    output: 'app/sass/main.scss'
});
