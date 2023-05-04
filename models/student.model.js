const User = require('./user.model.js');
const DiscriminatorOptions = require('./user.model.js');
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
                type: Number, // 4 digit number, XXX1 (August) , XXX2 (January), XXX3 (Summer)
                required: true,
                validate: {
                    validator: function(value) {
                        // Check if value is a 4-digit number
                        if (value < 1000 || value > 9999) {
                            return false;
                        }
                        // Check if last digit is 1, 2, or 3
                        const lastDigit = value % 10;
                        if (lastDigit !== 1 && lastDigit !== 2 && lastDigit !== 3) {
                            return false;
                        }
                        return true;
                    },
                    message: 'Error: 406 (Invalid semester)',
                }
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