const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();

// Load Validation
const validateBudgetSchema = require("../../validation/budget");
const validateDataInput = require("../../validation/validateData");
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

// @route   POST api/budget/data
// @desc    Add data to budget
// @access  Private
router.post(
  "/data",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateDataInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Budget.findOne({
      user: req.user.id
    }).then(budget => {
      const newData = {
        // total: req.body.total,
        user: req.user.id,
        description: req.body.description,
        value: req.body.value
      };
      // Add to newData array
      budget.data.unshift(newData);
      budget.save().then(budget => res.json(budget));
    });
  }
);

// @route   GET api/budget/data/total
// @desc    Get count value from budget
// @access  Private
router.get(
  "/data/total",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const user_id = req.user.id;
    const ObjectId = id => mongoose.Types.ObjectId(id);

    Budget.aggregate([
      {
        $match: {
          user: ObjectId(user_id)
        }
      },
      {
        $project: {
          _id: "$_id",
          // user: "$user",
          // items: "$data.value",
          value: { $sum: "$data.value" }
        }
      }
    ])
      .then(total => res.json(total[0].value))
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/budget/data/:data_id
// @desc    Delete data from budget
// @access  Private
router.delete(
  "/data/:data_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Budget.findOne({
      user: req.user.id
    })
      .then(budget => {
        // Get remove index
        const removeIndex = budget.data
          .map(item => item.id)
          .indexOf(req.params.data_id);

        // Splice out of array
        budget.data.splice(removeIndex, 1);

        // Save
        budget.save().then(budget => res.json(budget));
      })
      .catch(err => res.status(404).json(err));
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
// @desc    Delete user and budget profile
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
