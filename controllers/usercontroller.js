const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { User } = require("../models");
const validateSession = require("../middleware/validate-session");
const e = require("express");

const router = Router();




router.post("/register", validateSession, async function (req, res) {
  User.register({
    firstName:req.body.user.firstName,
    lastName:req.body.user.lastName,
    email:req.body.user.email,
    password:bcrypt.hashSync(req.body.user.password, 13),
    
  })
    .then(function createSuccess(user){
      let token = jwt.sign(
        {id: user.id, email: user.email},
        process.env.JWT_SECRET,
        {
          expiresIn: 60*60*24,
        }
      );
      res.json({
        user: user,
				message: "User succesfully created!",
				sessionToken: token,
      })
    })
    
  .catch(e)
    res.status(500).json({message: e.message})
  
});

router.post("/login", async function (req, res) {
  console.log(process.env.JWT_SECRET);
  User.findOne({
		where: {
			email: req.body.user.email,
		},
	})
  .then(function loginSuccess(user) {
    if (user) {
      let token = jwt.sign(
        { id: user.id, email: user.email },
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

  .catch(e)
    res.status(500).json({message: e.message})
  
});

module.exports = router;
