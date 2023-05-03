import User from './user.model.js';
import DiscriminatorOptions from './user.model.js';
module.exports = mongoose => {
    const Student = User(mongoose).discriminator('student',
        new mongoose.Schema({
            study_level: {
                type: String,
                enum: ['BS', 'MS', 'PhD'],
                required: true
            },
            entry_year: {
                type: Number,
                required: true,
                min: 0
            },
            entry_semester: {
                type: String,
                enum: ['August', 'January'],
                required: true
            },
            GPA: {
              type: Number,
              min: 0,
              max: 20,
              required: true
            },
            faculty: {
                type: String,
                required: true
            },
            field:{
                type: String,
                required: true
            }

        }, DiscriminatorOptions(DiscriminatorOptions))
    );
    return Student;
};