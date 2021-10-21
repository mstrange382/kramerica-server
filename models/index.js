const User = require("./user");
const Idea = require('./idea');
const Comment = require('./comment')
// create individual files for your models and import them here

// Setup Associations

module.exports = {
  User,
  Idea,
  Comment,  
};
