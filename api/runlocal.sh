#!/bin/bash
echo "___Local Api run___"

source .env
echo "Reading DB on Host: $DB_SERVICE_HOST:$DB_SERVICE_PORT"

python3 manage.py runserver 0.0.0.0:8081