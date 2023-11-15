# Briefly Planning Poker - USP
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jplukas"><img src="https://avatars.githubusercontent.com/u/8060581?v=4?s=100" width="100px;" alt="João Pedro Lukasavicus"/><br /><sub><b>João Pedro Lukasavicus</b></sub></a><br /><a href="https://github.com/BrieflyPlanningPokerES23/BrieflyPlanningPoker/commits?author=jplukas" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!