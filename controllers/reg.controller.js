const Reg = require('../models/reg.model');
const Term = require('../models/term.model');
const regCourse = require("../models/regCourse.model");
const Student = require("../models/student.model");
const RegReq = require("../models/registerationReq.model");

// PUT /registration/:id
exports.updateRegistrationStatus = async (req, res) => {
  const studentId = req.params.id;
  const { status } = req.body;

  try {
    const registration = await Reg.findOneAndUpdate(
      {
        student_id: studentId,
        term_id: { $in: Term.find({ current_term: true }, '_id') },
      },
      { status },
      { new: true }
    )
      .populate('term_id')
      .exec();

    if (!registration) {
      return res.status(404).json({ error: `Registration for student with id ${studentId} not found` });
    }

    return res.status(200).json({ registration });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.registerCourse = async (req, res) => {
  const courseId = req.params.id;

  try {
    const currentTerm = await Term.findOne({ current_term: true });

    if (!currentTerm) {
      return res.status(404).json({ error: 'Current term not found' });
    }
    const course = await regCourse.findOne({
      term_id: currentTerm._id,
      'semester_courses.course': courseId
    });
    const student = await Student.findById(req.id);

    if (!course) {
      return res.status(404).json({ error: 'Course not found in registration courses' });
    }


    let registrationRequest = await RegReq.findOne({
      term_id: currentTerm._id,
      requesterId: student._id
    })
    if (!registrationRequest) {
      registrationRequest = new RegReq({
        term_id: currentTerm._id,
        requesterId: student._id,
        semester_courses: [],
        credits: 0
      });

      await registrationRequest.save();
    }
    const courseExists = registrationRequest.semester_courses.some(courseObj => courseObj.course_name === courseId);
    if (courseExists){
      return res.status(404).json({ error: `Course already found in registration of student ${student._id}` });
    }
    registrationRequest.semester_courses.push(courseId);
    await registrationRequest.save({ runValidators: true });


    const c = course.semester_courses.find(course => course.course_name === courseId);
    c.registered += course.general_course.credit;

    await c.save();

    return res.status(200).json({ message: 'Course added to student\'s registration list' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}

exports.cancelRegisterCourse = async (req, res) => {
  const courseId = req.params.id;

  try {
      const currentTerm = await Term.findOne({ current_term: true });

      if (!currentTerm) {
          return res.status(404).json({ error: 'Current term not found' });
      }
      const course = await regCourse.findOne({
          term_id: currentTerm._id,
          'semester_courses.course': courseId
      });
      const student = await Student.findById(req.id);

      if (!course) {
          return res.status(404).json({ error: 'Course not found in registeration courses' });
      }

      const registrationRequest = await RegReq.findOne({
          term_id: currentTerm._id,
          requesterId: student._id
      });
      if (!registrationRequest) {
          return res.status(404).json({ error: 'this student has no registeration request' });
      }
      const courseIndex = registrationRequest.semester_courses.findIndex(course => course.course_name.equals(courseId));

      if (courseIndex !== -1) {
          registrationRequest.semester_courses.splice(courseIndex, 1);
          await registrationRequest.save();
      }
      else{
          return res.status(404).json({ error: 'course not found in student registeration courses' });
      }

      const c = course.semester_courses.find(course => course.course_name === courseId);
      c.registered -= 1;

      await c.save();

      return res.status(200).json({ message: 'Course deleted from student\'s preregistration list' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
  }
};