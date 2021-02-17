const express = require("express");
const app = express();
const PORT = 8081;
const path = require("path");
const upload = require('./file-upload');
const db = require('../database/index')
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/public")));


// app.post('/upload', upload.array('photos', 3), function(req, res, next) {
//   res.send('Successfully uploaded ' + req.files.length + ' files!')
// })

app.post('/new', upload.array('image', 3), (req, res) => {
  console.log(req.files.location)
  res.send(req.body)
})

app.get("/:username", (req, res) => {
  //retrieve all user collections
  db.getCollections(req.params.username, (collections)=>res.send(collections))
});

app.get("/:username/:collection", (req, res) => {
  //retrieve collection
  db.getCollection(
    req.params.username,
    req.params.collection,
    (collection) => res.send(collection)
  )
})

app.post("/newcollection", (req, res) => {
  //creates a collection
  db.addCollection(req.body)
  res.end()
});

app.put("/:username/:collection", (req, res) => {
  //add item to a collection
});

app.delete("/collection/:id/:itemId", (req, res) => {
  //deletes an item from a collection
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
