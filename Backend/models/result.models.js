const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Result'
    },
    subject_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },

    years: [{
        from: String,
        to: String,
        semesters: {
            exam_number: Number,
            exam_type: {
                type: String,
                enum: ['internal', 'external', 'lab internal', 'lab external' , 'others'],
            },
            exam_method: {
                type: String,
                enum: ['regualr' , 'supplymentary'],
            },
            sem_number: Number,
            exam_month: String,
            exam_year: String,
            status_view: {
                type: String,
                enum: ['active' , 'not active']
            },
            registerd_subjects: [
                {
                    subject_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Subject'
                    },
                    grade: Number,
                    marks: Number,
                    status: {
                        type: String,
                        enum: ['present' , 'absent']
                    }
                }
            ],
        }
    }],
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College'
      },
    
},{timestamps: true});

module.exports = mongoose.model('result', ResultSchema);