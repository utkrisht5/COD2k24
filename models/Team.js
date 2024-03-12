const mongoose = require('mongoose');
// const User = mongoose.model('User', UserSchema);
// import {User} from './Users'

const TeamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  password: { type: String, required: true },
  name1: {
    type: String,
    required: true,
    trim: true,
  },
  regNo1: {
    type: String,
    required: true,
    trim: true,
  },
  year1: {
    type: String,
    required: true,
    trim: true,
  },
  branch1: {
    type: String,
    required: true,
    trim: true,
  },
  name2: {
    type: String,
    required: true,
    trim: true,
  },
  regNo2: {
    type: String,
    required: true,
    trim: true,
  },
  year2: {
    type: String,
    required: true,
    trim: true,
  },
  branch2: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = Team = mongoose.model('team', TeamSchema);
