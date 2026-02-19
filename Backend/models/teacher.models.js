const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  date_of_birth: Date,
  roll_no: String,
  password: String,
  gender: {
    type: String,
    enum: ['male' , 'female' , 'others']
  },
  dept: String,
  college_email: String,
  personal_email: String,
  phone_number: String,
  position: {
    type: String,
    enum: ['professor' , 'associate professor' , 'assitant professor' , 'principle' , 'vice principle' , 'lab incharge'],
  },
  room_no: String,
  block: String,
  subjects_handle: [
    {
      branch: String,
      section: Number,
      year: Number,
      subject: {
        subject_id : {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Subject',
        },
        dates: [Date],
      },
    },
  ],
  uploads : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Upload',
  },
  attendance: [
    {
      date: Date,
      status: {
        type: String,
        enum: ['present' , 'absent']
      },
    },
  ],
  mentor_to : [
    {
      branch: String,
      section: String,
      year: Number,
      students: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Student'
        },
      ],
    },
  ],
  joining: Date,
  status: {
    type: String,
    enum: ['active' , 'not active'],
  },
  salary: String,
  paying: [
    {
      year: String,
      month: String,
      status: {
        type: String,
        enum: ['paid' , 'not paid' , 'deined'],
      },
    },
  ],
  address_line_1 : String,
  address_line_2 : String,
  timestamps: true
});