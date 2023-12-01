const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";

const db_name = "pet_store";

const connectToClient = () => {
  const client = new MongoClient(uri);
  return client;
};

const getDB = (client) => {
  return client.db(db_name);
};

const closeClient = (client) => {
  client.close();
};

module.exports = {
  connectToClient,
  closeClient,
  getDB,
};