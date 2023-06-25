const Term = require('../models/term.model');
const registerationCourse = require('../models/regCourse.model');

// DELETE /term/:id/registration
exports.removeSemesterCourseFromRegistration = async (req, res) => {
    const termId = req.params.id;
    const semesterCourseId = req.body.semesterCourseId;
  
    try {
      const term = await Term.findById(termId);
      if (!term) {
        return res.status(404).json({ error: 'Term not found' });
      }
  
      let rc = await registerationCourse.findOne({ term_id: termId });
      if (!rc) {
        return res.status(400).json({ error: 'This term has no registration courses yet!' });
      }
  
      if (!rc.semester_courses.includes(semesterCourseId)) {
        return res.status(400).json({ error: 'Semester course not found in registration courses list' });
      }
  
      rc.semester_courses = rc.semester_courses.filter(
        _id => _id.toString() !== semesterCourseId
      );
  
      await rc.save();
  
      return res.status(200).json({ message: 'Semester course removed from registration courses list' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  
};

// POST /term/:id/registration
exports.addSemesterCourseToRegistration = async (req, res) => {
  const termId = req.params.id;
  const { semesterCourseId } = req.body;

  try {
    const term = await Term.findById(termId);
    if (!term) {
      return res.status(404).json({ error: 'Term not found' });
    }

    if (!term.semester_courses.includes(semesterCourseId)) {
      return res.status(400).json({ error: 'Semester course not found in term' });
    }

    let rc = await registerationCourse.findOne({ term_id: termId });

    if (!rc) {
      rc = new registerationCourse({
        term_id: termId,
        semester_courses: [],
      });
    }

    rc.semester_courses.push(semesterCourseId);

    await rc.save();

    return res.status(200).json({ message: 'Semester course added to registration list' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};


// GET /term/:id/registration_courses
exports.getReregistrationCourses = async (req, res) => {
    const termId = req.params.id;

    try {
      const term = await Term.findById(termId);
      if (!term) {
        return res.status(404).json({ error: 'Term not found' });
      }
  
      const rc = await registerationCourse.findOne({ term_id: termId });
  
      if (!rc) {
        return res.status(400).json({ error: 'No registration course found for the term' });
      }
  
      const rcs = rc.semester_courses;
  
      return res.status(200).json({ rcs });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
};

