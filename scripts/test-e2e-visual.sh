#!/bin/bash
set -u
set -e

# wait
NEXT_WAIT_TIME=0
until nc -z $STORYBOOK_HOST $STORYBOOK_PORT || [ $NEXT_WAIT_TIME -eq 10 ]
do
    echo "Waiting for $STORYBOOK_HOST..."
    sleep $(( NEXT_WAIT_TIME++ ))
done



PATH=./node_modules/.bin/:$PATH
# NODE_ENV=test babel-node $(pwd)/test/visual-regression.js

NODE_ENV=test jest --config=jest.visual.config.js --runInBand
