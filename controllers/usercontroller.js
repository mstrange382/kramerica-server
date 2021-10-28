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

router.post("/login", validateSession, async function (req, res) {
  console.log(process.env.JWT_SECRET);
  User.findOne({
		where: {
			email: req.body.email,
		},
	})
  .then(function loginSuccess(user) {
    if (user) {
      let token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 * 24 }
      );

      res.status(200).json({
        user: user,
        message: "User successfully logged in!",
        sessionToken: token,
      });
    } else {
      res.status(500).json({ error: "user does not exist." });
    }
  })

  .catch(error)
    res.status(500).json({message: error})
  
});

module.exports = router;
