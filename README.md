# NOC-app

Network Operation Center

1. Dependencies to install

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
