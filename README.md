<h1 align="center"> 
    Briefly Planning Poker 
</h1>
<p>
    description about briefly planning poker web site.. demo..
</p>
k

<h2>
    Badge
</h2>
<p>
    coverage, tests, ci/cd, prs, issues, license
</p>


<h2> 
    Documentation
</h2>
<p>
    documentation link, getting started link etc
</p>

<h2>
    Roadmap
</h2>
<p>
    checklist: features.. new features
</p>

<h2> 
     :gear:Requirements
</h2>
<ul>
    <li>
        <a href="https://nodejs.org/en/download/">Node.js</a>*
    </li>
    <li>
        <a href="https://classic.yarnpkg.com/en/docs/getting-started">Yarn</a>
    </li>
    <li>
        <a href="https://www.docker.com/get-started/">Docker</a>
    </li>
    <li>
        <a href="https://docs.docker.com/compose/install/">Docker Compose</a>
    </li>
    <li>
        <a href="https://www.pgadmin.org/download/">PgAdmin</a>**
    </li>
</ul>

<i>* Check current Node version at package.json</i>

<i>** The project uses PostgreSQL, PgAdmin is a usefull recommended tool to check database structure, status and tables.</i>


<h2>
     🛠Development
</h2>

<ul>
    <li>
        <div>
            <p>To run <strong>all</strong> application (front-end, back-end and database): <code>docker-compose up front</code></p>
            <p>This command will create a new postgreSQL database using .env variables to set up password, username and database name. Also runs all migrations and seeds scripts (./packages/store/db/migrations), and finally starts api and front-end.</p>
        </div>
    </li>
    <li>
        <div>
            <p>To run only <strong>back-end</strong>: <code>docker-compose up api</code></p>
            <p>This command will create a new postgreSQL database using .env variables to set up password, username and database name. Also runs all migrations and seeds scripts (./packages/store/db/migrations), and finally starts api.</p>
        </div>
    </li>
    <li>
        <div>
            <p>To run only <strong>database</strong>: <code>docker-compose up db</code></p>
            <p>This command will create a new postgreSQL database using .env variables to set up password, username and database name.</p>
        </div>
    </li>
</ul>
<br/>
<p>
    <i>* Make sure all requeriments are installed</i>
</p>
<p>
    <i>* All environment variables must be filled in .env at root folder</i>
</p>

<h2>
  :computer:Tech Stack
</h2>
<ul>
    <li>
        <a href="https://vuejs.org/">Vue.js</a>
    </li>
    <li>
        <a href="https://sass-lang.com/">Sass</a>
    </li>
    <li>
        <a href="https://www.typescriptlang.org/">Typescript</a>
    </li>
    <li>
        <a href="https://expressjs.com/">Express.js</a>
    </li>
    <li>
        <a href="https://knexjs.org/">Knex</a>
    </li>
    <li>
        <a href="https://www.postgresql.org/">PostgreSQL</a>
    </li>
    <li>
        <a href="https://jestjs.io/pt-BR/">Jest</a>
    </li>
</ul>    

<h2>
   :handshake:Contribute
</h2>
<p>
Contribution guide can be access <a href="https://github.com/AsyncPlanningPoker/BrieflyPlanningPoker/blob/main/CONTRIBUTING.md">here</a>!
</p>
<h3>
 Contributors
</h3>
<table>
    <tr>
        <td align="center">
            <a href="https://github.com/lineconquista">
                <img src="https://i.scdn.co/image/ab6775700000ee85a4ad05825d41edb46b18e956" width="100px;" alt="line"><br />
            </a>
            <sub>Aline Conquista</sub>
            <br />
        </td>
        <td align="center">
            <a href="https://github.com/lulcca">
                <img src="https://i.scdn.co/image/ab6775700000ee852c661ab795fa5551824e699b" width="100px;" alt="lulcca"><br />
            </a>
            <sub>Lucca Jacomassi</sub>
            <br />
        </td>
    </tr>
</table>
