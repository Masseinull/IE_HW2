import DiscriminatorOptions from './user.model.js';
module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            _id: {
                type: String,
                required: true
            },
            pre_required:[{
                    type: mongoose.type.objectId,
                    ref: 'course'
                }],
            co_required:[{
                type: mongoose.type.objectId,
                ref: 'course'
            }],
            credit:{
                type: Number,
                enum: [0, 1, 2, 3],
                required: true
            },
            field: {
                type: String,
                required: true
            }
        }, DiscriminatorOptions
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Course = mongoose.model("course", schema);
    return Course;
};