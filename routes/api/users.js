const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const User = require('../../models/User');
const Team = require('../../models/Team');
const config = require('config');
const auth = require('../../middleware/auth');
// signup page... backend.
router.post(
  '/',
  [
    check('teamName', 'TeamName is required').not().isEmpty(),
    check(
      'password',
      'Please enter a password with 6 characters or more'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log('are you coming here');
    const errors = validationResult(req);
    console.log(errors.isEmpty());
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const {
      teamName,
      password,
      name1,
      name2,
      regNo1,
      regNo2,
      year1,
      year2,
      branch1,
      branch2,
    } = req.body;
    console.log(teamName);
    try {
      let team = await Team.findOne({ teamName: teamName, regNo1: regNo1, regNo2: regNo2 });
      if (team) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Team Name already exists' }] });
      }
      team = new Team({
        teamName: teamName,
        password: password,
        name1: name1,
        regNo1: regNo1,
        year1: year1,
        branch1: branch1,
        name2: name2,
        regNo2: regNo2,
        year2: year2,
        branch2: branch2,
      });
      const salt = await bcrypt.genSalt(10);
      team.password = await bcrypt.hash(password, salt);
      await team.save();
      console.log('Users Created');
      const payload = {
        team: {
          id: team.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtsecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log('Here is the error');
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// router.get('/:email', auth, async (req, res) => {
//   try {
//     const data = await User.findOne({ email: req.params.email });
//     res.json(data);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send('Server error');
//   }
// });

// router.get('/id/:id', auth, async (req, res) => {
//   try {
//     const data = await User.findOne({ _id: req.params.id });
//     res.json(data);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send('Server error');
//   }
// });

module.exports = router;
