const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  from_date: Date,
  to_date: Date,
  from_time: String,
  to_time: String,
  desc: String,
  organized_by: String,
  created_by : {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'created_type'
  },
  created_type: {
    type: String,
    enum: ['Admin' , 'Student' , 'Teacher']
  },
  contacts: [{
    name: String,
    mobile: String,
    email: String,
    desc: String,
  }],
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Upload'
  },
  uploads: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'upload'
  }],
  registered_memebers: [
    {
      student_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
      },
      date_time: Date
    }
  ],
  college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College'
    },
});

module.exports = mongoose.model('Event' , eventSchema);
