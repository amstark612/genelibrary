# Run
1. Clone repo & change into directory
2. run `npm install`
3. run `node server/import.js`
4. run `npm run dev` to start both servers
5. Go to http://localhost:5173 (or whatever port your terminal tells you it's running on)

### Initial Setup (for my own reference)

#### Node & Vue CLI
In your terminal:


Check if you already have Vue installed.
```shell
vue --version
```

If you do, and it's not the right version, upgrade using the following command.
```shell
npm update -g @vue/cli
```

If you don't, check what version of Node you have.

From the official documentation:
> Vue CLI 4.x requires Node.js version 8.9 or above (v10+ recommended).

```shell
node -v
```

Once Node is installed, run the following command to install Vue.
```shell
npm install -g @vue/cli
```

#### Vue.js, Tailwind CSS, Vite
```shell
npm init vite gene-library
```
Choose Vue.

```shell
cd gene-library && npm install
```

Install Tailwind and create the configuration file.
```shell
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p
```

Install nodemon for HMR. Install concurrently so we can easily run two Node commands in parallel.
```shell
npm install --save-dev nodemon concurrently
```

Add your main server file to `package.json`, and replace the `dev` command with the following.
```json
   "main": "server/server.js",
   "scripts": {
     "dev:frontend": "vite",
     "dev:backend": "nodemon src/server.js",
     "dev": "concurrently 'npm:dev:frontend' 'npm:dev:backend'",
     "build": "vite build",
     "preview": "vite preview"
   },
```

#### Express & Sqlite3
```shell
npm install express sqlite3
```

Add Express and Node as dependencies:
```shell
npm add express
npm add node
```

#### Import data
```shell
npm install csv-parser fast-csv
node server/import-data.js
```


#### Development

Start the Vue.js development server:
```shell
npm run dev
```
