const mongoose = require('mongoose');
const CvSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  templateId: { type: String, required: true },
  fields: { type: Object, default: {} },
});
module.exports = mongoose.model('CV', CvSchema);