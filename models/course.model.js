const mongoose  = require('mongoose');

const Course = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        pre_required:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'course',
            validate: {
                validator: async function(value) {
                    const course = await Course.findOne({_id: value});
                    return !!course;
                },
                message: 'Error: 406 (Invalid course)',
            }
        }],
        co_required:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'course',
            validate: {
                validator: async function(value) {
                    const course = await Course.findOne({_id: value});
                    return !!course;
                },
                message: 'Error: 406 (Invalid course)',
            }
        }],
        credit:{
            type: Number,
            enum: [0, 1, 2, 3],
            required: true
        }
    }, { discriminatorKey: 'type' }
);
const course = mongoose.model("course", Course);
module.exports = course;