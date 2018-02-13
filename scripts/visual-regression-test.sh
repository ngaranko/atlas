#!/bin/bash

# if [ '$NODE_ENV' = 'development' ]
# then
#   docker run \
#     -d \
#     -v $(pwd):/app \
#     -w="/app" \
#     --rm \
#     --shm-size 1G \
#     alekzonder/puppeteer:0.13.0 \
#     npm i babel-cli && \
#     babel-node ./test/visual-regression.js
# else
#     NODE_ENV=test babel-node $(pwd)/test/visual-regression.js
# fi

PATH=./node_modules/.bin/:$PATH
# NODE_ENV=test babel-node $(pwd)/test/visual-regression.js

jest --config=jest.visual.config.js --runInBand
