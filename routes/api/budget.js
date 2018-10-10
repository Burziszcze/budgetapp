const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();

// Load Validation
const validateBudgetSchema = require('../../validation/budget');

// Load Profile Model
const Budget = require('../../models/Budget');
// Load User Model
const User = require('../../models/User');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({
    msg: 'profile route works!'
}));

// @route   GET api/profile
// @desc    Get current users Profile
// @access  Private
router.get('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

  // errors
  const errors = {};
  Profile.findOne({
      user: req.user.id
  })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
          if (!profile) {
              errors.noprofile = 'There is no profile for this user';
              return res.status(404).json(errors);
          } else {
              res.json(profile);
          }
      })
      .catch(err => res.status(404).json(err));
});

module.exports = router;