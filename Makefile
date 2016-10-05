.PHONY: build

install:
	npm install

build:
	./node_modules/.bin/webpack  --progress --colors

run:
	@echo "http://localhost:10000/webpack-dev-server/"
	./node_modules/.bin/webpack-dev-server --progress --colors --devtool cheap-module-inline-source-map --hot --inline --host 0.0.0.0 --port 10000
