import User from './user.model.js';
import DiscriminatorOptions from './user.model.js';
module.exports = mongoose => {
    const Teacher = User(mongoose).discriminator('teacher',
        new mongoose.Schema({
            faculty: {
                type: String,
                required: true
            },
            field:{
                type: String,
                required: true
            },
            level:{
                type: String,
                required: true,
                enum: ['Lecturer', 'Associate Professor', 'Assistant Professor', 'Professor']
            }

        }, DiscriminatorOptions(DiscriminatorOptions))
    );
    return Teacher;
};