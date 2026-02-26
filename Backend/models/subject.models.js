const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  code: String,
  name: String,
  dept: String,
  credits: Number,
  sub_type: {
    type: String,
    enum: ['lab' , 'theory' , 'others'],
    default: 'theory',
  },
  college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College'
    },
},{timestamps: true})

module.exports = mongoose.model('subject' , subjectSchema);
