const Term = require('../models/term.model');
const PreregistrationCourse = require('../models/preRegCourse.model');
// @ts-check

// DELETE /term/:id/preregistration
exports.removeSemesterCourseFromPreregistration = async (req, res) => {
  const termId = req.params.id;


  try {
    const semesterCourseId = req.body.semesterCourseName;
    const term = await Ter.findById(termId);
    if (!term) {
      return res.status(404).json({ error: 'Term not found' });
    }

    let prc = await PreregistrationCourse.findOne({ term_id: termId });
    if (!prc) {
      return res.status(400).json({ error: 'This term has no pre registration courses yet!' });
    }

    if (!prc.semester_courses.map(item => item.course).includes(semesterCourseId)) {
      return res.status(400).json({ error: 'Semester course not found in preregistration courses list' });
    }

    const index = prc.semester_courses.findIndex(
      (item) => item.course._id === semesterCourseId
    );

    if (index !== -1) {
      prc.semester_courses.splice(index, 1);
    }

    await prc.save();

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

    let prc = await PreregistrationCourse.findOne({ term_id: termId });

    if (!prc) {
      prc = new PreregistrationCourse({
        term_id: termId,
        semester_courses: [],
      });
    }

    prc.semester_courses.push({
      course: semesterCourseId,
      requests: 0,
    });
    await prc.save();

    return res.status(200).json({ message: 'Semester course added to preregistration list' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};


// GET /term/:id/preregistration_courses
exports.getPreregistrationCourses = async (req, res) => {
  const termId = Number (req.params.id);
  console.log(typeof termId);
  console.log(termId);
  try {
    const term = await Term.findById(termId);
    if (!term) {
      return res.status(404).json({ error: 'Term not found' });
    }

    const prc = await PreregistrationCourse.findOne({ term_id: termId });

    if (!prc) {
      return res.status(400).json({ error: 'No preregistration course found for the term' });
    }

    const prcs = prc.semester_courses.map(item => item.course);

    return res.status(200).json({ prcs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

