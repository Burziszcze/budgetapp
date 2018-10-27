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

// @route   GET api/budget/user/:user_id
// @desc    Get budget by user ID
// @access  Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Budget.findOne({
    user: req.params.user_id
  })
    .populate("user", ["name", "avatar"])
    .then(budget => {
      if (!budget) {
        errors.nobudget = "There is no budget for this user";
        res.status(404).json(errors);
      } else {
        res.json(budget);
      }
    })
    .catch(err =>
      res.status(404).json({
        budget: "There is no budget Schema for this user"
      })
    );
});

// @route   POST api/budget
// @desc    Create or Edit user budget
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateBudgetSchema(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    // Get fields
    const budgetFields = {};
    budgetFields.user = req.user.id;
    if (req.body.name) budgetFields.name = req.body.name;
    // if (req.body.total) budgetFields.total = req.body.total;
    // if (req.body.title) budgetFields.title = req.body.title;
    // if (req.body.description) budgetFields.description = req.body.description;
    // if (req.body.price) budgetFields.price = req.body.price;

    Budget.findOne({
      user: req.user.id
    }).then(budget => {
      if (budget) {
        // Update
        Budget.findOneAndUpdate(
          {
            user: req.user.id
          },
          {
            $set: budgetFields
          },
          {
            new: true
          }
        ).then(budget => res.json(budget));
      } else {
        // Create
        // Check if budget exists
        Budget.findOne({
          name: budgetFields.name
        }).then(budget => {
          if (budget) {
            errors.name = "That budget name already exists";
            res.status(400).json(errors);
          }
          // Save Budget
          new Budget(budgetFields).save().then(budget => res.json(budget));
        });
      }
    });
  }
);

// @route   DELETE api/budget
// @desc    Delete budget profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Budget.findOneAndDelete({
      user: req.user.id
    }).then(() =>
      res.json({
        success: true
      })
    );
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
    Budget.findOneAndRemove({
      user: req.user.id
    }).then(() => {
      User.findOneAndRemove({
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
