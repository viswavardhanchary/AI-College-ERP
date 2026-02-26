const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true 
  },
  
  category: {
    type: String,
    enum: ['Central University', 'State University', 'Deemed University', 'Private University', 'Autonomous College', 'Affiliated College', 'Institute']
  },

  address: [{
    line: String,
    city: String,
    state: String,
    pin_code: String,
    isMainCampus: { type: Boolean, default: true } 
  }],

  college_code: {
    type: String,
    enum: ['aishe', 'udise', 'aicte', 'ugc'] 
  },
  code: String,

  affiliatedTo: {
    type: String, 
    default: 'Independent' 
  },


  accreditation: {
    naac_grade: { 
      type: String, 
      enum: ['A++', 'A+', 'A', 'B++', 'B+', 'B', 'C', 'D', 'Not Accredited'],
      default: 'Not Accredited'
    },
    nirf_ranking: { 
      type: Number 
    }
  },

  college_domain: String,
  established_year: {
    type: Number
  },

  phone_1: String,
  phone_2: String,
  landline_1: String,
  landline_2: String,
  
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], 
      index: '2dsphere' 
    }
  },

  contact_persons: [{
    prefix: {
      type: String,
      enum: ['mr' , 'mrs' , 'ms' , 'dr' , 'prof' , 'others']
    },
    first_name: String,
    last_name: String,
    email: String,
    phone_1: String,
    phone_2: String,
    landline_1: String,
    landline_2: String,
    gender: {
      type: String,
      enum:['male' , 'female' , 'others']
    },

    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Upload'
    }
  }],
  status: {
    type: String,
    enum: ['pending' , 'approved' , 'not approved' , 'active']
  },

}, { 
  timestamps: true 
});

module.exports = mongoose.model('College', collegeSchema);