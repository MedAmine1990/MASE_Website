#!/bin/sh

cd /usr/src/masemarketplace_app/masemarketplace/

git add --all

git commit -m "$1"

git push origin mas-branch

