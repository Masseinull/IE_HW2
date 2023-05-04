const DiscriminatorOptions = { discriminatorKey: 'kind' };
module.exports = DiscriminatorOptions;
module.exports = mongoose => {
    const schema = mongoose.Schema(
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
            email: String,
            phone: {
                type: Number,
                integer: true,
                min: 0
            },
            role:{
                type: String,
                required: true,
                enum: ['student', 'teacher', 'educational manager', 'it manager']
            }
        }, DiscriminatorOptions
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const User = mongoose.model("user", schema);
    return User;
};