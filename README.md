# Briefly Planning Poker
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-11-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Briefly planning poker is an online Planning Poker/Scrum Poker tool that lets you estimate effort, time of development and other characteristics of your agile team tasks.
In it, you can:
 - **Create and manage agile squads**
 - **Create or import tasks, or user stories from other project management tools** *(soon)*
 - **Comment on and estimate different task measures such as story points, likeability, and etc in your product backlog** *(soon)*
 - **Integrate with other platforms to make your sprint planning sessions easier** *(soon)*

## Tech Stack

This project is composed by a front end SPA and a REST API server. The entire stack uses [Typescript](https://www.typescriptlang.org/) as the programming language, in order to provide type-safety, IDE intellisense autocompletion and some other features to promote a better developer experience.  
Furthermore, this is our tech stack:

 - [Vue](https://vuejs.org/)
 - [Sass](https://sass-lang.com/)
 - [Express](https://expressjs.com/)
 - [Prisma ORM](https://www.prisma.io/)
 - [Zod](https://zod.dev/)
 - [Zodios](https://www.zodios.org/)
 - [PostgreSQL](https://www.postgresql.org/)

## Repository structure

The project is organized as a monorepo. It is subdivided in a bunch of different workspaces, that can be found at the [packages](./packages/) folder.

 - [@briefly/prisma](./packages/prisma/)  
The projects data models definitions and data access client. Uses the Prisma ORM to enable having a unique source of truth, as well as a source for run-time validation, using [Zod](https://zod.dev/).

- [@briefly/apidef](./packages/apidef/)  
The projects API definitions. Establishes an interface between the front and back end of the application.  
Uses [Zod](https://zod.dev/) and [Zodios](https://www.zodios.org/).

- [@briefly/api](./packages/api/)  
The projects back end, written using [Express](https://expressjs.com/).  

- [@briefly/front](./packages/front/)  
The projects front-end application, written in [Vue](https://vuejs.org/).

## Dependencies

## Installation and usage

## Getting help

## Contributions

Do you have a suggestion to improve this project somehow? Feel free to open an issue, or submit a PR.  
The contribution guide can be accessed [here](./CONTRIBUTING.md)


### Development

To run the entire application (front-end, back-end and database): `docker compose up front`  
This command will create a new postgreSQL database using .env variables to set up password, username and database name, and then start the REST API and front end servers.

To run only the back end: `docker compose up api`  
This command will create a new postgreSQL database using .env variables to set up password, username and database name. Also runs all migrations and seeds scripts (./packages/store/db/migrations), and finally starts api.

To run only database: `docker compose up db`  
This command will create a new postgreSQL database using .env variables to set up password, username and database name.

### Development workflow


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jplukas"><img src="https://avatars.githubusercontent.com/u/8060581?v=4?s=100" width="100px;" alt="João Pedro Lukasavicus"/><br /><sub><b>João Pedro Lukasavicus</b></sub></a><br /><a href="https://github.com/BrieflyPlanningPokerES23/BrieflyPlanningPoker/commits?author=jplukas" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/lulcca"><img src="https://avatars.githubusercontent.com/u/56274210?v=4?s=100" width="100px;" alt="lucca jacomassi"/><br /><sub><b>lucca jacomassi</b></sub></a><br /><a href="https://github.com/BrieflyPlanningPokerES23/BrieflyPlanningPoker/commits?author=lulcca" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/igor-santos-ufabc/"><img src="https://avatars.githubusercontent.com/u/48994130?v=4?s=100" width="100px;" alt="Igor"/><br /><sub><b>Igor</b></sub></a><br /><a href="https://github.com/BrieflyPlanningPokerES23/BrieflyPlanningPoker/commits?author=igorney" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://linktree.com.br/new/RafaHenrique"><img src="https://avatars.githubusercontent.com/u/55901457?v=4?s=100" width="100px;" alt="Rafael Henrique Siqueira Silva"/><br /><sub><b>Rafael Henrique Siqueira Silva</b></sub></a><br /><a href="https://github.com/BrieflyPlanningPokerES23/BrieflyPlanningPoker/commits?author=rafaelhs-debug" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Ingrid27"><img src="https://avatars.githubusercontent.com/u/38013208?v=4?s=100" width="100px;" alt="Ingrid Pacheco Batista"/><br /><sub><b>Ingrid Pacheco Batista</b></sub></a><br /><a href="https://github.com/BrieflyPlanningPokerES23/BrieflyPlanningPoker/commits?author=Ingrid27" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/bachiari"><img src="https://avatars.githubusercontent.com/u/58713326?v=4?s=100" width="100px;" alt="bachiari"/><br /><sub><b>bachiari</b></sub></a><br /><a href="https://github.com/BrieflyPlanningPokerES23/BrieflyPlanningPoker/commits?author=bachiari" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/lineconquista"><img src="https://avatars.githubusercontent.com/u/71647583?v=4?s=100" width="100px;" alt="Aline Conquista "/><br /><sub><b>Aline Conquista </b></sub></a><br /><a href="https://github.com/BrieflyPlanningPokerES23/BrieflyPlanningPoker/commits?author=lineconquista" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/LeTrovoes"><img src="https://avatars.githubusercontent.com/u/25932176?v=4?s=100" width="100px;" alt="Leandro Trovões"/><br /><sub><b>Leandro Trovões</b></sub></a><br /><a href="https://github.com/BrieflyPlanningPokerES23/BrieflyPlanningPoker/commits?author=LeTrovoes" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/thenriique"><img src="https://avatars.githubusercontent.com/u/58703497?v=4?s=100" width="100px;" alt="Thiago Henrique"/><br /><sub><b>Thiago Henrique</b></sub></a><br /><a href="https://github.com/BrieflyPlanningPokerES23/BrieflyPlanningPoker/commits?author=thenriique" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Will0890"><img src="https://avatars.githubusercontent.com/u/138529252?v=4?s=100" width="100px;" alt="Will0890"/><br /><sub><b>Will0890</b></sub></a><br /><a href="https://github.com/BrieflyPlanningPokerES23/BrieflyPlanningPoker/commits?author=Will0890" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/isamaues"><img src="https://avatars.githubusercontent.com/u/42849591?v=4?s=100" width="100px;" alt="isamaues"/><br /><sub><b>isamaues</b></sub></a><br /><a href="#projectManagement-isamaues" title="Project Management">📆</a> <a href="#ideas-isamaues" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
