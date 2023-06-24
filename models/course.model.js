const mongoose  = require('mongoose');

const Course = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                  return /d{8}$/.test(v);
                },
                message: props => `${props.value} is not a valid ID`
              }
        },
        pre_required:[{
            type: String,
            ref: 'course',
            validate: {
                validator: async function(value) {
                    const course = await mongoose.model('course').findOne({_id: value});
                    return !!course;
                },
                message: `${406} (Invalid course in pre_req)`
            }
        }],
        co_required:[{
            type: String,
            ref: 'course',
            validate: {
                validator: async function(value) {
                    const course = await mongoose.model('course').findOne({_id: value});
                    return !!course;
                },
                message: `${406} (Invalid course in co_req)`,
            }
        }],
        credit:{
            type: Number,
            enum: [0, 1, 2, 3],
            required: true
        },
        field:{
            type: String,
            required: true
        }
    }
);
Course.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
const course = mongoose.model("course", Course);
module.exports = course;