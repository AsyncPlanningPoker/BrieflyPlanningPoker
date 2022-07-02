api-startup:
	yarn install
	yarn migration:latest
	yarn seed:up
	cd packages/api && yarn start

front-startup:
	cd packages/front && yarn install && yarn start
	
