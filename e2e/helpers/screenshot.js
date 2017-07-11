'use strict';

const fs = require('fs');

/**
 *
 * @description this function makes a screenshot
 */
module.exports = filename => {
    browser.takeScreenshot().then(png => {
        const stream = fs.createWriteStream(filename || 'screenshot.png');
        stream.write(new Buffer(png, 'base64'));
        stream.end();
    });
};
