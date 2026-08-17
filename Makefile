.PHONY: help install dev build preview generate lint format clean

help:
	@echo "Available targets:"
	@echo "  install   Install dependencies"
	@echo "  dev       Run the dev server"
	@echo "  build     Type-check and build for production"
	@echo "  preview   Preview the production build locally"
	@echo "  generate  Regenerate GraphQL types from the schema"
	@echo "  lint      Run eslint"
	@echo "  format    Run prettier"
	@echo "  clean     Remove node_modules and build output"

install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

generate:
	npm run generate

lint:
	npm run lint

format:
	npm run format

clean:
	rm -rf node_modules dist
