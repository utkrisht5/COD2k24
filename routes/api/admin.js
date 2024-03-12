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
    console.log("hsadfasdfsd");
    let team = await Team.findOne({ teamName });
    if (!team) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Team' }] });
    }
    let re = await Eval.findOne({ teamName: teamName, day: day });
    if (re) {
      let p = re.points;
      p = parseInt(p);
      const ev = new Eval({ teamName: teamName, day: day, points: points });
      await ev.save();
      let point = await TotalPoints.findOne({ teamName });
      point = parseInt(point);
      point -= p;
      points = parseInt(points);
      point += points;
      point = toString(point);
      const r = new TotalPoints({teamName: teamName, points: point});
      await r.save();
    }else{
        const ev = new Eval({teamName: teamName, day: day, points: points});
        await ev.save();
        let r = await TotalPoints.findOne({teamName: teamName});
        if(r){
            let point = parseInt(r.points);
            points = parseInt(points);
            point += points;
            const re = new TotalPoints({teamName: teamName, points: point});
            await re.save();
        }else{
            const re = new TotalPoints({teamName: teamName, points: points});
            await re.save();
        }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.post('/form', auth, async (req, res) => {
    const {day, formLink} = req.body;
    try {
        let result = await FormLink.findOne({day});
        if(result){
            await FormLink.updateOne({formLink: formLink});
        }else{
            const re = new FormLink({day: day, formLink: formLink});
            await re.save();
        }
    } catch (error) {
        console.log(error.msg);
    }
})

router.get('/form', auth, async (req, res) => {
    try{
        let result = await FormLink.find();
        res.json(result);
    } catch(err){
        console.log(err.msg);
    }
})

module.exports = router;
