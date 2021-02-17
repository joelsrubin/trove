const { MongoClient } = require('mongodb');

var url = 'mongodb://localhost:27017';

const addCollection = function (metaData) {
  const { user, name } = metaData;
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    var database = db.db('trove');
    database.collection(`${user}_${name}`).insert({metaData: metaData, items:[]})
      .then(() => {
        console.log('added collection');
        addCollectionToUser(user, name)
        db.close();
      })
  })
}


const addCollectionToUser = function (user, name) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    var database = db.db('trove');
    database.collection('Users').updateOne({username: user}, {$push: {collections: name}})
      .then(() => {
        console.log('added collection to user');
        db.close();
      })
  })
}

const getCollections = function (username,cb) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    var database = db.db('trove');
    database.collection('Users').find({ username: username }).toArray((err, result) => {
      if (err) throw err;
      cb(result[0].collections)
      db.close();
    })
  })
}

const getCollection = function (username, collection, cb) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    var database = db.db('trove');
    database.collection(`${username}_${collection}`).find().toArray((err, result) => {
      if (err) throw err;
      cb(result[0].items)
      db.close();
    })
  })
}


module.exports = {addCollection:addCollection, getCollections:getCollections, getCollection:getCollection}