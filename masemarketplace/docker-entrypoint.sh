#!/bin/sh
set -e
/usr/src/masemarketplace_app/masemarketplace/manage.py runserver 0.0.0.0:8000

cd /usr/src/masemarketplace_app/masemarketplace/frontend

npm run build