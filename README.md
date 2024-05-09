# Virtualisa Cars

The "Virtualisa Car" web application is developed in [Node.js (v20)](https://www.npmjs.com/package/node/v/20.13.0)  using the Express framework for the backend and the [Prisma ORM](https://www.prisma.io/docs/getting-started) for [PostgreSQL](https://www.postgresql.org/) database manipulation. [Typescript](https://www.typescriptlang.org/) is employed in both the backend and frontend to enhance code security and maintainability.

In the frontend, [NextJS (14)](https://nextjs.org/) is used in conjunction with [React (18)](https://es.react.dev/blog/2022/03/29/react-v18) for building the user interface. Next.js App Router handles application routing, while [Tailwind CSS](https://tailwindcss.com/docs/installation) and [shadcn/ui](https://ui.shadcn.com/) is utilized for interface design.

The application conducts tests on its functions, both in the frontend and backend, using [Jest](https://jestjs.io/), ensuring a high level of quality and performance in all operations.

Welcome to Virtualisa Car, where fleet management is made simple and efficient!

## Links:

- **Github:** [https://github.com/nashmonzon/Test-Virtualisa](https://github.com/nashmonzon/Test-Virtualisa)

##### Development (local instance)

- **Local APP:** [http://localhost:3000](http://localhost:3000)

**To run the app locally it is necesary to have:**

**System Requirements:**
Docker installed on your system.
Node.js installed on your system.

**Steps to Clone the Repository:**
Open your terminal and navigate to the folder where you want to clone the repository.
Run the following command:
```bash
git clone git@github.com:nashmonzon/Test-Virtualisa.git
```

**Frontend Setup:**
Navigate to the client folder inside the cloned repository.
Open a new terminal in this location.
Run the following command to install the frontend dependencies:
```bash
npm install
```

**Start Docker Container for Database and Backend:**
Make sure Docker is running.
In the root of the cloned repository, open a new terminal.
Run the following command to start the Docker containers:
```bash
docker-compose up -d
```

Create a `.env` file in the root of the project and add the following variables:
```bash
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
```

**Run the Application:**
Open a new terminal in the root of the cloned repository.
Run the following command to start the frontend and backend:
```bash
npm run dev
```
Open your web browser and visit http://localhost:3000 to see the application in action.

