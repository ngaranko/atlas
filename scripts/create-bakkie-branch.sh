#!/bin/bash

echo Temporary solution for deploying a feature branch to the demo1 test server.\
     This wil be replaced with a feature branch test CI/CD flow. \
     It creates a bakkie branch from the current branch \
     This version can be the deployed in Jenkins to the demo1 test server

CURRENT_BRANCH=$(git status | head -n 1 | awk '{print $3}')

if [ $CURRENT_BRANCH != "bakkie" ]; then
  git branch -D bakkie
  git checkout -b bakkie
fi

git push --no-verify --set-upstream origin bakkie --force
git checkout $CURRENT_BRANCH
