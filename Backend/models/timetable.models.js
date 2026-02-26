const mongoose = require('mongoose');

const timetableSchema =new mongoose.Schema({
    from: String,
    to: String,
    dept: String,
    section: String,
    batch: Number,
    sem_number: Number,
    start_from: {
        date: Date,
        month: String,
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College'
      },
    day_by_day: [{
        instructions: String, 
        day: {
            type: String,
            enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
        },
        times: [{
            from_time: String,
            to_time: String,
            class_type: {
                type: String,
                enum: ['theory' , 'lab' , 'lunch' , 'break' , 'sports' , 'mentor' , 'placements' , 'others', 'online' , 'professional elective' , 'optional elective', 'minor theory' , 'minor lab']
            },
            description: String,
            room_no: Number,
            block: String,
        }]
    }],
},{timestamps: true});

module.exports = mongoose.model('Timetable' , timetableSchema);

