const express = require('express');
const app = express();
const PORT = 8080;
const path = require('path');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../client/public')));

// app.get('/', (req, res) => {
// })

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})