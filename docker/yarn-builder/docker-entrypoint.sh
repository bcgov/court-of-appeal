#!/bin/bash
set -e

unset NPM_CONFIG_PREFIX
source /opt/app-root/src/.nvm/nvm.sh

exec "$@"
