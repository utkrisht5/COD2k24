const mongoose = require('mongoose');

const TotalPointsSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  points: {
    type: String,
    required: true,
  },
});

module.exports = TotalPoints = mongoose.model('totalPoints', TotalPointsSchema);
