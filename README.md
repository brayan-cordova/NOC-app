# NOC-App

Network Operation Center - NodeJS version 18.18.2 and Typescript

1. Dependencies to install

```
npm i cron dotenv env-var
```

2. Dev dependencies to install

```
npm i -D typescript @types/node ts-node-dev rimraf
```

# Dev, this is for you!!

# Configure environment variables

3. Create a .env file with the following configuration:

```
PORT = 3000
MAILER_EMAIL =
MAILER_SECRET_KEY =
PROD= false
```

or just copy the structure that appears in .env.template

4. Initialize typescript configuration file

```
npx tsc --init --outDir dist/ --rootDir src
```

5. Scripts to run

```
"dev": "tsnd --respawn src/index.ts",
"build": "rimraf ./dist && tsc",
"start": "npm run build && node dist/index.js"
```

or run:

```
npm run dev
```
