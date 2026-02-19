const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  subject_id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
  },
  student_id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
  day_by_day : [{
    date: Date,
    status: {
      type: String,
      enum: ['present' , 'absent'],
    },
  }],
  timestamps: true
});

module.exports = mongoose.model('Attendance' , attendanceSchema);