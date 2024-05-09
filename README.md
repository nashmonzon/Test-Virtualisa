# Virtualisa Cars

The "Virtualisa Car" web application is developed in [Node.js (v20)](https://www.npmjs.com/package/node/v/20.13.0)  using the Express framework for the backend and the [Prisma ORM](https://www.prisma.io/docs/getting-started) for [PostgreSQL](https://www.postgresql.org/) database manipulation. [Typescript](https://www.typescriptlang.org/) is employed in both the backend and frontend to enhance code security and maintainability.

In the frontend, [NextJS (14)](https://nextjs.org/) is used in conjunction with [React (18)](https://es.react.dev/blog/2022/03/29/react-v18) for building the user interface. Next.js App Router handles application routing, while [Tailwind CSS](https://tailwindcss.com/docs/installation) and [shadcn/ui](https://ui.shadcn.com/) is utilized for interface design.

The application conducts tests on its functions, both in the frontend and backend, using [Jest](https://jestjs.io/), ensuring a high level of quality and performance in all operations.

Welcome to Virtualisa Car, where fleet management is made simple and efficient!

## Links:

- **Github:** [https://github.com/smatio/webapp](https://github.com/smatio/webapp)
- **Portainer:** [http://app.smat.io:9000](http://app.smat.io:9000)

##### Development (local instance)

- **Local APP:** [http://localhost:3000](http://localhost:3000)

**To run the app locally it is necesary to have:**

Create an `.env.local` file in the root of the project and add the following variables:

```bash
# ENV LOCAL
# NEXT
NEXT_PUBLIC_ADOBE_TOKEN=<NEXT_PUBLIC_ADOBE_TOKEN>
NEXTAUTH_SECRET=<NEXTAUTH_SECRET>
NEXT_PUBLIC_CAPTCHA_CLIENT_PK=<NEXT_PUBLIC_CAPTCHA_CLIENT_PK>

# MINIO
MINIO_ACCESS_KEY=<MINIO_ACCESS_KEY>
MINIO_SECRET_KEY=<MINIO_SECRET_KEY>

# ANALYTICS
ANALYTICS_IAM_CREDENTIALS_type=<ANALYTICS_IAM_CREDENTIALS_type>
ANALYTICS_IAM_CREDENTIALS_project_id=<ANALYTICS_IAM_CREDENTIALS_project_id>
ANALYTICS_IAM_CREDENTIALS_private_key_id=<ANALYTICS_IAM_CREDENTIALS_private_key_id>
ANALYTICS_IAM_CREDENTIALS_private_key=<ANALYTICS_IAM_CREDENTIALS_private_key>
ANALYTICS_IAM_CREDENTIALS_client_email=<ANALYTICS_IAM_CREDENTIALS_client_email>
ANALYTICS_IAM_CREDENTIALS_client_id=<ANALYTICS_IAM_CREDENTIALS_client_id>
ANALYTICS_IAM_CREDENTIALS_auth_uri=<ANALYTICS_IAM_CREDENTIALS_auth_uri>
ANALYTICS_IAM_CREDENTIALS_token_uri=<ANALYTICS_IAM_CREDENTIALS_token_uri>
ANALYTICS_IAM_CREDENTIALS_auth_provider_x509_cert_url=<ANALYTICS_IAM_CREDENTIALS_auth_provider_x509_cert_url>
ANALYTICS_IAM_CREDENTIALS_client_x509_cert_url=<ANALYTICS_IAM_CREDENTIALS_client_x509_cert_url>

CAPTCHA_SERVER_PK=<CAPTCHA_SERVER_PK>

# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings
DATABASE_URL=<DATABASE_URL>
```

Create a `.env.test` file in the root of the project and add the following variables:

```bash
## DEFAULTS & SECRETS FOR TEST
NODE_ENV=test

# NEXT
NEXT_PUBLIC_BASE_API_URL=https://api.stage.smat.io/api
NEXT_PUBLIC_MINIO_ACCESS_KEY=<NEXT_PUBLIC_MINIO_ACCESS_KEY>
NEXT_PUBLIC_MINIO_SECRET_KEY=<NEXT_PUBLIC_MINIO_SECRET_KEY>
NEXT_PUBLIC_TEST_USER=devs+test@smat.io
NEXT_PUBLIC_TEST_DIST=devs+dist@smat.io
NEXT_PUBLIC_TEST_ADMIN=devs+admin@smat.io
NEXT_PUBLIC_TEST_INCOMPLETE_USER=devs+incomplete@smat.io
NEXT_PUBLIC_TEST_PWD=<NEXT_PUBLIC_TEST_PWD>
NEXT_PUBLIC_GA_DEBUG=true
NEXT_PUBLIC_FLAG_FORCE_CLEAN=true
NEXT_PUBLIC_FLAG_PRESALES=true
NEXT_PUBLIC_FLAG_PROJECT_STATS=true
NEXT_PUBLIC_FLAG_PROJECT_QUESTIONS=true
NEXT_PUBLIC_AUTOLOGOUT_OFF=true
NEXT_PUBLIC_ADOBE_BASE_URL=https://api.na3.adobesign.com/api/rest/v6/
NEXT_PUBLIC_ADOBE_USERNAME=devs+stage@smat.io
NEXT_PUBLIC_ADOBE_TOKEN=<NEXT_PUBLIC_ADOBE_TOKEN>
NEXT_PUBLIC_CI=true
NEXT_PUBLIC_MINIO_BUCKET=smat-stage
NEXT_PUBLIC_MINIO_URL=minio.stage.smat.io
NEXT_PUBLIC_CAPTCHA_CLIENT_PK=<NEXT_PUBLIC_CAPTCHA_CLIENT_PK>
NEXTAUTH_SECRET=<NEXTAUTH_SECRET>
NEXT_PUBLIC_DOMAIN=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000

# MINIO
MINIO_ACCESS_KEY=<MINIO_ACCESS_KEY>
MINIO_SECRET_KEY=<MINIO_SECRET_KEY>

# PLAYWRIGHT
PLAYWRIGHT_TEST_BASE_URL=http://localhost:3000

# ZITADEL
ZITADEL_PROJECT_ID=<ZITADEL_PROJECT_ID>
ZITADEL_ISSUER=https://smat-stage-bcxzyr.zitadel.cloud
ZITADEL_CLIENT_ID=<ZITADEL_CLIENT_ID>
```

##### Staging

- **Stage APP**: [https://stage.smat.io](https://stage.smat.io)

##### Production

- **Production APP:** [https://app.smat.io/](https://app.smat.io)
- **Docker hub:** [Docker hub](https://hub.docker.com/repository/docker/smatio/webappfrontend)

</br>

---

</br>

## Environment Variables

Defaults can be found in the `.env*` files of the repository. Secrets & keys are stored in the [development](https://console.cloud.google.com/security/secret-manager?project=webapp-development-387120) & [production](https://console.cloud.google.com/security/secret-manager?project=composed-yen-283209) project's GCP Secret Manager service. Shoul be requested to team lead / devs.

## Available Scripts

In the project directory, you can run:

- `npm run dev`

Runs the app in the `development` mode. This will automatically load `.env`, `.env.development` and `.env.local` files respectively, overwritign the duppes to set the corrects envs. App will run in `http://localhost:3000` and API call are done to the `stage API`, so an internet connection is needed.

Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

- `npm run dev:test`

Runs the app in `test` mode. This will automatically load `.env.test` env file only.
This command shoul only be used to run the app for using it with `Playwright` e2e tests.

Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

- `npm run e2e` `e2e:ui` `e2e:ci` `e2e:renew` `e2e:debug`

Scripts for running `Playwright` e2e tests in different modes. If running for the first time, the `e2e:renew` should be invoked to update user credentials, then other scripts can me runned. These requires the app te be run with `npm run dev:test` previously.

- `npm run build`

This generates the `.next` build to be deployed. Ideally this command should only be runned locally to check if there are build errors.
Deployments are done in [standalone](https://nextjs.org/docs/pages/api-reference/next-config-js/output#automatically-copying-traced-files) for optimizations for depooyments with docker containers. Different dockerfiles exists per env `Dockerfile.stage` & `Dockerfile.prod` should be used accordingly, but they required the secrets to be passed as docker secret arg `--secret id=env,src={path-to-file}`

- `npm run start`

Run the application builded files in [http://localhost:3000](http://localhost:3000) so you can verify that builded app works as expected.
