const mongo = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor({username, email}) {
    this.name = username;
    this.email = email;
  }
  
  save() {
    const db = getDb();
    return db.collection('users').insertOne(this)
      .then(user => user)
      .catch(err => console.log(err));
  }
  
  static findById(userId) {
    const db = getDb();
    return db.collection('users').find({_id: new mongo.ObjectId(userId)}).next()
      .then(user => user)
      .catch(err => console.log(err));
  }
}

module.exports = User;
