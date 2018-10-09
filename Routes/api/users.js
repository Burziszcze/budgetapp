const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const router = express.Router();

// Load User model
const User = require("../../Models/User");

// @route   GET api/users/test
// @desc    Tests usters route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    msg: "users route works!"
  })
);

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: "Email already exist!"
      });
    } else {
      // const avatar = gravatar.url(req.body.email, {
      //   s: "200", // size
      //   r: "pg", // rating
      //   d: "retro" // default
      // });
      // const newUser = new User({
      //   name: req.body.name,
      //   email: req.body.email,
      //   avatar,
      //   password: req.body.password
      // });
      // salting password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
