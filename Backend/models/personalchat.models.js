const mongoose = require('mongoose');

const personalChatSchema = new mongoose.Schema({
  user_type: {
    type: String,
    enum: ['Admin' , 'Student' , 'Teacher']
  },
  user_id : {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'user_type'
  },
  chat_history: [{
    my_chat: {
      date: Date,
      text: String,
      uploads: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Upload'
      },
    },
    other_chat: {
      date: Date,
      text: String,
      uploads: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Upload'
      },
    },
  }],
  college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College'
    },
});

module.exports = mongoose.model('personalchat' , personalChatSchema);
