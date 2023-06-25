const Reg = require('../models/reg.model');
const Term = require('../models/term.model');

// PUT /registration/:id
exports.updateRegistrationStatus = async (req, res) => {
  const studentId = req.params.id;
  const { status } = req.body;

  try {
    const registration = await Reg.findOneAndUpdate(
      {
        student_id: studentId,
        term_id: { $in: Term.find({ current_term: true }, 'term_id') },
      },
      { status },
      { new: true }
    )
      .populate('term_id')
      .exec();

    if (!registration) {
      return res.status(404).json({ error: `Registration for studnt with id ${studentId} not found` });
    }

    return res.status(200).json({ registration });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};
