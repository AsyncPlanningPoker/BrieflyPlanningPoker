api-startup:
	yarn set version 3.6.3
	yarn install
	yarn db:up
	cd packages/api && yarn start

front-startup:
	cd packages/front && yarn install && yarn start
	
