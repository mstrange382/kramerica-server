const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { User } = require("../models");
const validateSession = require("../middleware/validate-session");
const e = require("express");

const router = Router();

router.post("/register", async function (req, res) {
  User.create({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    passwordhash:bcrypt.hashSync(req.body.passwordhash, 13),
    admin : req.body.admin,   
  })
    .then(function createSuccess(user){
      let token = jwt.sign(
        {id: user.id},
        process.env.JWT_SECRET,
        {
          expiresIn: 60*60*24,
        }
      );
      res.send({
        user: user,
				message: "User succesfully created!",
				sessionToken: token,
      })
    })
    
    .catch((err) => res.status(500).json({error: err}))
  
});

router.post("/login", function (req, res) {
  console.log(process.env.JWT_SECRET);
  User.findOne({
    where: {
      firstName:req.body.firstName 
    },
  })
    .then(function loginSuccess(user) {
      if (user) {
        bcrypt.compare(req.body.passwordhash, user.passwordhash, (err, match) => {
          if (match) {
            let token = jwt.sign(
              { id: user.id, email: user.email },
              process.env.JWT_SECRET,
              { expiresIn: 60 * 60 * 270 }
            );
            res.status(200).json({
              user: user,
              message: "User successfully logged in!",
              sessionToken: token,
            });
          } else {
            res.status(403).json({ error: "Password is incorrect" });
          }
        });
      } else {
        res.status(500).json({ error: "User does not exist." });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});


module.exports = router;

