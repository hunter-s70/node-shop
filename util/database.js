const MongoClient = require('mongodb').MongoClient;

// Connection URL no pass
const url = 'mongodb://localhost:27017';

let _db;

const mongoConnect = callback => {
  MongoClient.connect(url).then(client => {
    console.log('Connected!');
    _db = client.db('mongo_shop');
    callback();
  }).catch(err => {
    console.log(err);
  });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;