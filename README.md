# Briefly Planning Poker - USP

This is a fork of https://github.com/AsyncPlanningPoker/BrieflyPlanningPoker.

Online Planning Poker/Scrum Poker tool

## Tech Stack

 - [Vue](https://vuejs.org/)
 - [Sass](https://sass-lang.com/)
 - [Typescript](https://www.typescriptlang.org/)
 - [Express](https://expressjs.com/)
 - [Prisma ORM](https://www.prisma.io/)
 - [Zod](https://zod.dev/)
 - [Zodios](https://www.zodios.org/)
 - [PostgreSQL](https://www.postgresql.org/)

## Structure

This is a monorepo. This project is subdivided in a bunch of different workspaces, that can be found at the [packages](./packages/) folder.

 - [@briefly/prisma](./packages/prisma/)  
The projects data models definitions and data access client. Uses the Prisma ORM to enable having a unique source of truth.

- [@briefly/apidef](./packages/apidef/)  
The projects API definitions. Establishes an interface between the front and back end of the application.  
Uses Zod and Zodios.

- [@briefly/api](./packages/api/)  
The projects back end, written using Express.  

- [@briefly/front](./packages/front/)  
The projects front-end application, written in Vue.


## 🛠Development

To run the entire application (front-end, back-end and database): `docker compose up front`  
This command will create a new postgreSQL database using .env variables to set up password, username and database name, and then start the REST API and front end servers.

To run only the back end: `docker compose up api`  
This command will create a new postgreSQL database using .env variables to set up password, username and database name. Also runs all migrations and seeds scripts (./packages/store/db/migrations), and finally starts api.

To run only database: `docker compose up db`  
This command will create a new postgreSQL database using .env variables to set up password, username and database name.

## Contributions

Do you have a suggestion to improve this project somehow? Feel free to open an issue, or submit a PR.  
The contribution guide can be accessed [here](./CONTRIBUTING.md)
