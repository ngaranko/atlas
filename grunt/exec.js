module.exports = {
    'protractor-flake': {
        command: './node_modules/protractor-flake/bin/protractor-flake ' +
            '--protractor-path=./node_modules/protractor/bin/protractor ' +
            '--parser standard ' +
            '--node-bin node ' +
            '--max-attempts=3 ' +
            '--color=magenta ' +
            '-- protractor.conf.js'
    }
};
