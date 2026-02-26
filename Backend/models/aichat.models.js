const mongoose = require('mongoose');

const aiChatSchema = new mongoose.Schema({
  name: String,
  user_type: {
    type: String,
    enum: ['Admin' , 'Student' , 'Teacher']
  },
  user_id : {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'user_type'
  },
  college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College'
    },
  chat: [{
    user_question: String,
    ai_response: String,
    ai_response_json_data: String,
    ai_response_query: String,
    date_time: Date,
    extra_message: String,
  }],
});

module.exports = mongoose.model('aichat' , aiChatSchema);