const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();

// Load Validation
const validateBudgetSchema = require("../../validation/budget");

// Load B Mudgetodel
const Budget = require("../../models/Budget");
// Load User Model
const User = require("../../models/User");

// @route   GET api/budget/test
// @desc    Tests budget route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    msg: "budget route works!"
  })
);

// @route   GET api/budget
// @desc    Get current user budget
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    // errors
    const errors = {};
    Budget.findOne({
      user: req.user.id
    })
      .populate("user", ["name", "avatar"])
      .then(budget => {
        if (!budget) {
          errors.nobudget = "There is no budget for this user";
          return res.status(404).json(errors);
        } else {
          res.json(budget);
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/budget
// @desc    Delete user and budget
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Budget.findByIdAndDelete({
      user: req.user.id
    }).then(() => {
      User.findByIdAndDelete({
        _id: req.user.id
      }).then(() =>
        res.json({
          success: true
        })
      );
    });
  }
);
module.exports = router;
