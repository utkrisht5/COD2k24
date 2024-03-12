// const { Double } = require('mongodb');
// const { Int32 } = require('mongodb');
// const { Int32 } = require('bson');
const mongoose = require('mongoose');

const EvalSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  points: {
    type: String,
    required: true,
  },
});

module.exports = Eval = mongoose.model('eval', EvalSchema);
