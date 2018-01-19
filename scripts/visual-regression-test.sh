#!/bin/bash
docker run \
  -d \
  -v $(pwd):/app \
  -w="/app" \
  --rm \
  --shm-size 1G \
  alekzonder/puppeteer:0.13.0 \
  npm i babel-cli && \
  babel-node ./test/visual-regression.js
