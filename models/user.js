const mongoose = require('mongoose');

var nameSchema = new mongoose.Schema({
  name: String,
});
var User = mongoose.model("User", nameSchema);

module.exports = User;
