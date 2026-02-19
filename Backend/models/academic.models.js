const mongoose = require('mongoose');

const academicSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },
  branch: String,
  aca_type: {
    type: String,
    enum: ['major', 'minor'],
  },
  section: Number,
  years: [
    {
      from: String,
      to: String,
      semesters: {
        sem_number: Number,
        sem_month_from: String,
        sem_month_to: String,
        sem_date_from: String,
        sem_date_to: String,
        registerd_subjects: [
          {
           subject_id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Subject'
            },
            attendance: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Attendance'
            },
            teacher: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Teacher'
            }
          }
        ],
      },
      mentor : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
      },
    }
  ],

  timestamps: true
});


module.exports = mongoose.model('academic' , academicSchema);