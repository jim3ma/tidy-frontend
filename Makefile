PROJECT = "Tidy"
PATH := $(PATH)
SHELL := /bin/bash

all: build

build: env ;@echo "Build ${PROJECT}"; \
	TARGET=tidy-frontend:`date +'%Y-%m-%d'`; \
	echo -e "\e[32mStart build docker image: $${TARGET}\e[0m"; \
	docker build -t $${TARGET} . ; \
	echo -e "\e[32mSuccessfully built docker image $${TARGET}\e[0m"; \
        echo

env: ;@echo "Change ${PROJECT} default environment"; \
	TIDY_URL=$${TIDY_URL:-ctidy.com:8089}; \
	export HTTP=$${HTTP:-http}; \
	echo $${HTTP}://$${TIDY_URL}; \
	export TIDY_URL=$${TIDY_URL//./\\.}; \
	sed -i "s/ENV TIDY_URL.*/ENV TIDY_URL $${TIDY_URL}/" Dockerfile; \
	sed -i "s/ENV HTTP.*/ENV HTTP $${HTTP}/" Dockerfile; \
	echo -e "\e[32mDockerfile content:"; \
	echo -e "\e[0m"; \
	cat Dockerfile; \
        echo;

update:
	git pull

clean:
	#rm -rf build
	git checkout -- Dockerfile

.PHONY: build clean
