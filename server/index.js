const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

app.listen(port, () => {
  console.log(`The app server is running on port: ${port}`);
});
app.use(express.json());
app.use(express.static(__dirname + '/../build'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})