# Briefly Planning Poker - USP

This is a fork of https://github.com/AsyncPlanningPoker/BrieflyPlanningPoker.

Online Planning Poker/Scrum Poker tool

## Structure

This is a monorepo. This project is subdivided in a bunch of workspaces, that can be found at the [packages](./packages/) folder.

## 🛠Development

To run all application (front-end, back-end and database): docker-compose up front  
This command will create a new postgreSQL database using .env variables to set up password, username and database name. Also runs all migrations and seeds scripts (./packages/store/db/migrations), and finally starts api and front-end.

To run only back-end: docker-compose up api  
This command will create a new postgreSQL database using .env variables to set up password, username and database name. Also runs all migrations and seeds scripts (./packages/store/db/migrations), and finally starts api.

To run only database: docker-compose up db  
This command will create a new postgreSQL database using .env variables to set up password, username and database name.

## Tech Stack

 - [Vue](https://vuejs.org/)
 - [Sass](https://sass-lang.com/)
 - [Typescript](https://www.typescriptlang.org/)
 - [Express](https://expressjs.com/)
 - [Prisma ORM](https://www.prisma.io/)
 - [Zod](https://zod.dev/)
 - [Zodios](https://www.zodios.org/)
 - [PostgreSQL](https://www.postgresql.org/)


The contribution guide can be accessed [here](https://github.com/AsyncPlanningPoker/BrieflyPlanningPoker/blob/main/CONTRIBUTING.md)
