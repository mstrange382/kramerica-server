const User = require("./user");
const Idea = require('./idea');
const Comment = require('./comment')
// create individual files for your models and import them here

// Setup Associations
User.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(Idea);
Idea.belongsTo(User);

Idea.hasMany(Comment);
Comment.belongsTo(Idea);

module.exports = {
  User,
  Idea,
  Comment,  
};
