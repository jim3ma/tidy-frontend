#!/bin/bash

TIDY_URL=${TIDY_URL:-tidy.com}
TIDY_URL=${TIDY_URL//./\\.}
HTTP=${HTTP:-http}
sed -i "s/ENV TIDY_URL.*/ENV TIDY_URL ${TIDY_URL}/" Dockerfile
sed -i "s/ENV HTTP.*/ENV HTTP ${HTTP}/" Dockerfile

echo -e "\e[32mDockerfile content:"
echo -e "\e[0m"
cat Dockerfile
echo

TARGET=tidy-frontend:`date +'%Y-%m-%d'`

echo -e "\e[32mStart build docker image: ${TARGET}"
echo -e "\e[0m"

docker build -t ${TARGET} .

echo
echo -e "\e[32mSuccessfully built docker image ${TARGET}"
echo -e "\e[0m"

git checkout -- Dockerfile
