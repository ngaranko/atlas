var modules = require('./modules'),
    cssFiles = ['build/temp/bower_components/bower_components.css'];

modules.forEach(function (module) {
    cssFiles.push('build/temp/' + module.slug + '.css');
});

cssFiles.push('modules/shared/styles/vendor-fix.css');

module.exports = cssFiles;
