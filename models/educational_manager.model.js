import User from './user.model.js';
import DiscriminatorOptions from './user.model.js';
module.exports = mongoose => {
    const EducationalManager = User(mongoose).discriminator('educational manager',
        new mongoose.Schema({
            faculty: {
                type: String,
                required: true
            }
        }, DiscriminatorOptions(DiscriminatorOptions))
    );
    return EducationalManager;
};