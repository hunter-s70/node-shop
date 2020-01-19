const MongoClient = require('mongodb').MongoClient;

// Connection URL no pass
const url = 'mongodb://localhost:27017';

const mongoConnect = callback => {
  MongoClient.connect(url).then(client => {
    console.log('Connected!');
    callback(client);
  }).catch(err => {
    console.log(err);
  });
};

module.exports = mongoConnect;