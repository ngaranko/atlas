var modules = require('./modules'),
    cssFiles = ['build/temp/bower_components/bower_components.css',
    'build/temp/npm_components/leaflet-draw/**/*.css'];

modules.forEach(function (module) {
    cssFiles.push('build/temp/' + module.slug + '.css');
});

module.exports = cssFiles;
