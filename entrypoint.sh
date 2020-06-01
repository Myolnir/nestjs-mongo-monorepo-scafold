#!/bin/bash
set -e

echo "$2"

case "$1" in
    develop)
        echo "Running Development Server"
        cat apps/$2/.env >> dist/apps/$2/.env
        exec npm run start:dev $2
        ;;
    production)
        echo "Running Start"
        exec node -r dotenv/config dist/apps/$2/src/main.js "dotenv_config_path=dist/apps/$2/.env"        ;;
    *)
        exec "$@"
esac
