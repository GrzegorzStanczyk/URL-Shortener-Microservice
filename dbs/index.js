const MongoClient = require('mongodb').MongoClient;

const PROD_URI = process.env.DB_URI;

const connect = (url) => {
  return MongoClient.connect(url).then(client => client.db());
}

module.exports = async () => {
  let databases = await Promise.all([connect(PROD_URI)]);
  
  return {
    production: databases[0]
  }
}