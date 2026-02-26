const mongoose = require('mongoose');


const erpAdminSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  personal_email: String,
  links: [String],
},{timestamps: true})