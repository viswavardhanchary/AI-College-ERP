const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  roll_no: String,
  password: String,
  phone_number: String,
  date_of_birth: Date,
  college_mail: String,
  person_mail: String,
  image: String,
  city: String,
  gender: {
    type: String,
    enum: ['male' , 'female' , 'others']
  },
  pin_code: String,
  admission_type: {
    type: String,
    enum: ['regular' , 'management' , 'lateral'],
    default: 'management'
  },
  state: String,
  status: {
    type: String,
    enum: ['active' , 'not active'],
    default: 'active'
  },
  country: {
    type: String,
    default: 'india'
  },
  academic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Academic'
  },
  results: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Result'
  },
  uploads : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Upload',
  },
  address_line_1 : String,
  address_line_2 : String,
  timestamps: true
})


module.exports = mongoose.model('student' , studentSchema);