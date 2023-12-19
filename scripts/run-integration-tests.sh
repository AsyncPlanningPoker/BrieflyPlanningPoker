#! /bin/bash
docker compose -f docker-compose.test.yml up api --detach &&
yarn wait-on -t 10s http://localhost:8000/api/health && yarn dotenv -e .env.test -- vitest -c ./vitest.config.integration.ts --run
docker compose -f docker-compose.test.yml down