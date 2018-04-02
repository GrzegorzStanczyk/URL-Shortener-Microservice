const express = require('express');
const app = express();

const initializeDatabases = require('./dbs');
const routes = require('./routes');

initializeDatabases().then(dbs => {
  routes(app, dbs).listen(process.env.PORT, () => console.log('Listening on port 3000'))
  }).catch(err => {
    console.error('Failed to make all database connections!')
    console.error(err)
    process.exit(1)
  });
