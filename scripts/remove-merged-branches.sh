#!/bin/bash

# Thanks to Sander van Driel :-)

CURRENT_BRANCH=$(git status | head -n 1 | awk '{print $3}')

if [ $CURRENT_BRANCH != "develop" ]; then
    echo "Current branch is not 'develop'" >&2
    exit 1
else
    echo "Removing merged branches:"
    git branch --merged | grep -v dev | xargs git branch -d
fi
