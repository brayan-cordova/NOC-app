# NOC-app

Network Operation Center - NodeJS version 18.18.2

1. Dev dependencies to install

```
npm i -D typescript @types/node ts-node-dev rimraf
```

2. Initialize typescript configuration file

```
npx tsc --init --outDir dist/ --rootDir src
```

3. Scripts to run

```
"dev": "tsnd --respawn src/index.ts",
"build": "rimraf ./dist && tsc",
"start": "npm run build && node dist/index.js"
```
