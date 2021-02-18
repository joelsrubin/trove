const { MongoClient } = require('mongodb');

var url = 'mongodb://localhost:27017';

const addCollection = function (metaData, cb) {
  const { user, name } = metaData;
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    var database = db.db('trove');
    database.collection(`${user}_${name}`).insert({metaData: metaData, items:[]})
      .then(() => {
        console.log('added collection');
        addCollectionToUser(user, name, cb)
        db.close();
      })
  })
}

const addCollectionToUser = function (user, name, cb) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    var database = db.db('trove');
    database.collection('Users').findOneAndUpdate({username: user}, {$push: {collections: name}},  { returnOriginal: false })
      .then((results) => {
        cb(results.value.collections)
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
      console.log(result)
      cb(result[0].items)
      db.close();
    })
  })
}

const addItem = function (username, collection, item) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    var database = db.db('trove');
    database.collection(`${username}_${collection}`).updateOne({}, { $push: { items: item } }).then(
      console.log('item added')
    )
  })
}


const deleteCollection = function (username, collection, cb) {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    var database = db.db('trove');
    database.collection(`${username}_${collection}`).drop()
      .then(() => {
      removeCollectionFromUser(username, collection, cb)
      db.close();
    })
  })
}

  const removeCollectionFromUser = function (user, name, cb) {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
      if (err) throw err;
      var database = db.db('trove');
      database.collection('Users').findOneAndUpdate({username: user}, {$pull: {collections: name}},  { returnOriginal: false })
        .then((results) => {
          cb(results.value.collections)
        })
    })
  }

module.exports = {addCollection:addCollection, getCollections:getCollections, getCollection:getCollection, addItem:addItem, deleteCollection:deleteCollection}