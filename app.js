var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/node-demo");
var User = require('./models/user');

app.get("/", (req, res) => {
  res.send("Hello world again");
});

app.post("/addname", (req, res) => {
  var user = new User(req.body);
  user.save()
    .then(item => {
      res.send(item.name);
    })
    .catch(err => {
      res.status(400).send("Error saving name");
    });
});

app.get("/names", (req, res) => {
  User.find()
    .then((data, err) =>{
      res.json(data);
    })
    .catch(err => {
      res.status(400).send("Error getting names");
    });
})

app.listen(process.env.PORT || 8080);

module.exports = app;
