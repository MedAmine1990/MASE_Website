#!/bin/sh

cd /usr/src/masemarketplace_app/masemarketplace/

git fetch --all

git reset --hard origin/master

set -e
/usr/src/masemarketplace_app/masemarketplace/manage.py runserver 0.0.0.0:8000

cd /usr/src/masemarketplace_app/masemarketplace/frontend

npm run build
