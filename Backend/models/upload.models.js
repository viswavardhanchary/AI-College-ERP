const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    file_name: String,
    file_url: String,
    file_size: String,
    original_name: String,
    format: {
        type: String,
        enum: ['.jpg','.jpeg','.png','.gif','.webp','.xls','.xlsx','.pdf','.doc','.docx']
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College'
      },
    user_type: {
        type: String,
        enum: ['Admin' , 'Student' , 'Teacher']
    },
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'user_type'
    },
    
},{timestamps: true})

module.exports = mongoose.model('upload' , uploadSchema);