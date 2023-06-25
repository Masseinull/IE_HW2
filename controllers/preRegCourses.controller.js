const Term = require('../models/term');
const PreregistrationCourse = require('../models/preRegCourse');

// DELETE /term/:id/preregistration
exports.removeSemesterCourseFromPreregistration = async (req, res) => {
    const termId = req.params.id;
    const semesterCourseId = req.body.semesterCourseId;
  
    try {
      const term = await Term.findById(termId);
      if (!term) {
        return res.status(404).json({ error: 'Term not found' });
      }
  
      let preregistrationCourse = await PreregistrationCourse.findOne({ term: termId });
      if (!preregistrationCourse) {
        return res.status(400).json({ error: 'This term has no pre registeration courses yet!' });
      }
  
      if (!preregistrationCourse.semester_courses.includes(semesterCourseId)) {
        return res.status(400).json({ error: 'Semester course not found in preregistration courses list' });
      }
  
      preregistrationCourse.semesterCourses = preregistrationCourse.semesterCourses.filter(
        _id => _id.toString() !== semesterCourseId
      );
  
      await preregistrationCourse.save();
  
      return res.status(200).json({ message: 'Semester course removed from preregistration courses list' });
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

    if (!term.semester_courses.includes(semesterCourseId)) {
      return res.status(400).json({ error: 'Semester course not found in term' });
    }

    let preregistrationCourse = await PreregistrationCourse.findOne({ term_id: termId });

    if (!preregistrationCourse) {
      preregistrationCourse = new PreregistrationCourse({
        term_id: termId,
        semester_courses: [],
      });
    }

    preregistrationCourse.semester_courses.push(semesterCourseId);

    await preregistrationCourse.save();

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
  
      const preregistrationCourse = await PreregistrationCourse.findOne({ term_id: termId });
  
      if (!preregistrationCourse) {
        return res.status(400).json({ error: 'No preregistration course found for the term' });
      }
  
      const preregistrationCourses = preregistrationCourse.semester_courses;
  
      return res.status(200).json({ preregistrationCourses });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
};

