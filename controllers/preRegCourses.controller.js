const Term = require('../models/term.model');

// DELETE /term/:id/preregistration
exports.removeSemesterCourseFromPreregistration = async (req, res) => {
  const termId = req.params.id;
  const semesterCourseId = req.body.semesterCourseId;

  try {
    const term = await Term.findById(termId);
    if (!term) {
      return res.status(404).json({ error: 'Term not found' });
    }

    const index = term.semester_courses.indexOf(semesterCourseId);
    if (index === -1) {
      return res.status(400).json({ error: 'Invalid semester course ID' });
    }

    term.semester_courses.splice(index, 1);
    await term.save();

    return res.status(200).json({ message: 'Semester course removed from preregistration list' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// POST /term/:id/preregistration
exports.addSemesterCourseToPreregistration = async (req, res) => {
  const termId = req.params.id;
  const { semesterCourseId } = req.body;

  try {
    const term = await Term.findById(termId);
    if (!term) {
      return res.status(404).json({ error: 'Term not found' });
    }

    if (term.semester_courses.includes(semesterCourseId)) {
      return res.status(400).json({ error: 'Semester course already in preregistration list' });
    }

    term.semester_courses.push(semesterCourseId);
    await term.save();

    return res.status(200).json({ message: 'Semester course added to preregistration list' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// GET /term/:id/preregistration_courses
exports.getPreregistrationCourses = async (req, res) => {
  const termId = req.params.id;

  try {
    const term = await Term.findById(termId);
    if (!term) {
      return res.status(404).json({ error: 'Term not found' });
    }

    const preregistrationCourses = term.semester_courses;

    return res.status(200).json({ preregistrationCourses });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

