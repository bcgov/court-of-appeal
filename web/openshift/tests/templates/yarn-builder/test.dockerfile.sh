#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
DOCKERFILE=$DIR/../../../templates/yarn-builder

docker build --no-cache -t efiling/node:10.15.1 $DOCKERFILE
NODE_VERSION=$(docker run --rm --name efiling -it efiling/node:10.15.1 node --version)

if [[ $NODE_VERSION != *"v10.15.1"* ]]; then
    echo "FAILURE"
    echo "Expected: v10.15.1"
    echo "But was: $NODE_VERSION"
    exit 1
fi
echo "SUCCESS"
