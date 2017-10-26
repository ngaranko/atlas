module.exports = function (grunt) {
    const gruntDir = './grunt/';

    grunt.initConfig({
        svg_sprite: require(gruntDir + 'svg-sprite')
    });

    grunt.loadNpmTasks('grunt-svg-sprite');

    grunt.registerTask('default', ['svg_sprite']);
};
