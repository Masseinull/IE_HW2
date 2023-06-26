function checkForClassTimingConflicts(course, registeredCourses) {
    const courseClassTimings = course.class_time;

    for (const registeredCourse of registeredCourses) {
        const registeredClassTimings = registeredCourse.class_time;

        if (doTimingsOverlap(courseClassTimings, registeredClassTimings)) {
            return false; 
        }
    }

    return true; 
}

function checkForExamTimingConflicts(course, registeredCourses) {
    const courseExamTiming = course.exam_time;

    for (const registeredCourse of registeredCourses) {
        const registeredExamTiming = registeredCourse.exam_time;

        if (doTimingsOverlap(courseExamTiming, registeredExamTiming)) {
            return false; 
        }
    }

    return true;
}

function doTimingsOverlap(timing1, timing2) {

    let day11, day12, day21, day22, start1, start2, end1, end2;
    if (timing1.length === 3 && timing2.length === 3) {
        [day11, start1, end1] = timing1;
        [day21, start2, end2] = timing2;
    }
    else if (timing1.length === 3 && timing2.length === 4) {
        [day11, start1, end1] = timing1;
        [day21, day22, start2, end2] = timing2;
    }
    else if (timing1.length === 4 && timing2.length === 3) {
        [day11, day12, start1, end1] = timing1;
        [day21, start2, end2] = timing2;
    }
    else if (timing1.length === 4 && timing2.length === 4) {
        [day11, day12, start1, end1] = timing1;
        [day21, day22, start2, end2] = timing2;
    }

    if (day11 === day12 || day11=== day22 || day12===day21 || day12===day22) {
        if (start1 <= end2 && start2 <= end1) {
            return true; 
        }
    }

    return false; 
}
module.exports = {
    checkForClassTimingConflicts,
    checkForExamTimingConflicts,
    doTimingsOverlap,
  };
