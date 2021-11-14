const User = require("./user");
const Idea = require('./idea');
const Comment = require('./comment')
// create individual files for your models and import them here

// Setup Associations
User.hasMany(Comment);
User.hasMany(Idea);

Idea.hasMany(Comment);
Idea.belongsTo(User);

Comment.belongsTo(Idea);
Comment.belongsTo(User);

module.exports = {
  User,
  Idea,
  Comment,  
};
