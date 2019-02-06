#!/bin/bash

echo Create a hotfix-release branch from the current branch \
     This version can be the deployed in Jenkins to the demo1 test server

CURRENT_BRANCH=$(git status | head -n 1 | awk '{print $3}')

if [ $CURRENT_BRANCH != "hotfix-release" ]; then
  git branch -D hotfix-release
  git checkout -b hotfix-release
fi

git push --set-upstream origin hotfix-release --force
git checkout $CURRENT_BRANCH
