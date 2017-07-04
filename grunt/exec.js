module.exports = {
    'protractor-flake': {
        command: 'protractor-flake --protractor-path=./node_modules/protractor/bin/protractor ' +
            '--parser standard --node-bin node --max-attempts=3 --color=magenta -- protractor.conf.js'
    }
};
