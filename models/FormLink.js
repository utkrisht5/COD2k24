const mongoose = require('mongoose');

const FormLinkSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  formLink: {
    type: String,
    required: true,
  },
});

module.exports = FormLink = mongoose.model('formLink', FormLinkSchema);
