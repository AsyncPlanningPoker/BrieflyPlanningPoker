api-startup:
	yarn install
	yarn migration:up
	yarn seed:up
	cd packages/api && yarn start