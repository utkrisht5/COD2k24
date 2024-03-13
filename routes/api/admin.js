const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
// const User = require('../../models/User');
const Team = require('../../models/Team');
const Eval = require('../../models/Eval');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const config = require('config');
const TotalPoints = require('../../models/TotalPoints');
const FormLink = require('../../models/FormLink');

router.post('/', auth, async (req, res) => {
  console.log('dfasdfs');
  const { teamName, day, points } = req.body;
  try {
    console.log('hsadfasdfsd');
    let team = await Team.findOne({ teamName });
    if (!team) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Team' }] });
    }
    let re = await Eval.findOne({ teamName: teamName, day: day });
    if (re) {
      let p = re.points;
      p = parseInt(p);
      await re.updateOne({ points: points });
      let pi = await TotalPoints.findOne({ teamName });
      let point = pi.points;
      point = parseInt(point);
      point -= p;
      let pointsInt = parseInt(points);
      point += pointsInt;
      let pointStr = point.toString();
      await pi.updateOne({ points: pointStr });
    } else {
      const ev = new Eval({ teamName: teamName, day: day, points: points });
      await ev.save();
      let r = await TotalPoints.findOne({ teamName: teamName });
      if (r) {
        let point = parseInt(r.points);
        let pointsInt = parseInt(points);
        point += pointsInt;
        let pointStr = point.toString();
        await r.updateOne({ points: pointStr });
      } else {
        const re = new TotalPoints({ teamName: teamName, points: points });
        await re.save();
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/form', auth, async (req, res) => {
  const { day, formLink } = req.body;
  try {
    let result = await FormLink.findOne({ day });
    if (result) {
      await FormLink.updateOne({ formLink: formLink });
    } else {
      const re = new FormLink({ day: day, formLink: formLink });
      await re.save();
    }
  } catch (error) {
    console.log(error.msg);
  }
});

router.get('/form', auth, async (req, res) => {
  try {
    let result = await FormLink.find();
    res.json(result);
  } catch (err) {
    console.log(err.msg);
  }
});

module.exports = router;
