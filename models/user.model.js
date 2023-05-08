const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        _id: {
            type: Number,
            integer: true,
            min: 0,
            required: true
        },
        password: String,
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: function (value) {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
                },
                message: props => `${props.value} is not a valid email address.`
            }
        },
        phone: {
            type: Number,
            integer: true,
            min: 0
        }
        // role:{
        //     type: String,
        //     required: true,
        //     enum: ['student', 'teacher', 'educational manager', 'admin']
        // }
    }, { discriminatorKey: 'type' }
);

User.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
const user = mongoose.model("user", User);
module.exports = user;