api-startup:
	yarn install
	yarn db:up
	cd packages/api && yarn start

front-startup:
	cd packages/front && yarn install && yarn start
	
