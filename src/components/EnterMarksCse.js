import React, { useState } from 'react';

const EnterMarksCse = ({ onSubmit }) => {
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [code, setCode] = useState('');
  const [externalMarks, setExternalMarks] = useState('');
  const [internalMarks, setInternalMarks] = useState('');
  const [grade, setGrade] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const semesterData = {
    '1st Year Sem-1': {
      codes: ['18CS1101', '18EN1101', '18MA1101', '18ME1102', '18PH1102', '18CS11L1', '18EN11L1', '18ME11L1'],
      subjects: ['Programming for Problem Solving', 'English', 'Mathematics - I', 'Engineering Graphics', 'Applied Physics', 'Programming for Problem Solving Lab', 'English Language Communication Skills Lab', 'Engineering Workshop']
    },
    '1st Year Sem-2': {
      codes: ['18CH1201', '18CS1201', '18EE1201', '18MA1201', '18PH1201', '18CH12L1', '18CS12L1', '18EE12L1', '18PH12L1'],
      subjects: ['Engineering Chemistry', 'Data Structures', 'Basic Electrical Engineering', 'Mathematics - II', 'Semiconductor Devices', 'Engineering Chemistry Lab', 'Data Structures Lab', 'Basic Electrical Engineering Lab', 'Semiconductor Devices Lab']
    },
    '2nd Year Sem-1': {
      codes: ['18CS2101', '18CS2102', '18CS2103', '18EC2102', '18MA2102', '18CS21L1', '18CS21L2', '18CS21L3'],
      subjects: ['Advanced Data Structures', 'Object Oriented Programming Through Java', 'Discrete Mathematics', 'Digital Design', 'Probability and Statistics', 'Advanced Data Structures Lab', 'IT Workshop (including Science Lab)', 'Object Oriented Programming Through Java Lab']
    },
    '2nd Year Sem-2': {
      codes: ['18CS2201', '18CS2202', '18CS2203', '18CS2204', '18MB2202', '18CS22L1', '18CS22L2', '18CS22L3'],
      subjects: ['Design and Analysis of Algorithms', 'Computer Organization and Assembly Language Programming', 'Database Management Systems', 'Theory of Computation', 'Engineering Economics and Accounting', 'Design and Analysis of Algorithms Lab', 'Computer Organization and Assembly Language Programming Lab', 'Database Management Systems Lab']
    },
    '3rd Year Sem-1': {
      codes: ['18CE3121', '18CS3101', '18CS3102', '18CS3103', '18CS3107', '18CS31L1', '18CS31L2', '18CS31L3','18CS3108'],
      subjects: ['Global Warming and Climate Change', 'Operating Systems', 'Computer Networks', 'Artificial Intelligence', 'Scripting Languages', 'Operating Systems Lab', 'Computer Networks Lab', 'Artificial Intelligence Lab','Internship']
    },
    '3rd Year Sem-2': {
      codes: ['18CS3201', '18CS3202', '18CS3203', '18CS3209', '18CS3209', '18CS32L1', '18CS32L2', '18EN32L1'],
      subjects: ['Web Technologies', 'Software Engineering', 'Information Security', 'Cloud Computing', 'Energy Conservation and Management', 'Web Technologies Lab', 'Software Engineering Lab','Advanced English Communication Skills Lab']
    },
    '4th Year Sem-1': {
      codes: ['18CS4101', '18CS4102', '18CS4102', '18CS4103', '18CS4105', '18CS4108', '18CS41L1', '18CS41L2','18CS41L3','18CS4112'],
      subjects: ['Data Analytics', 'Machine Learning', 'Internet of Things', 'Human Computer Interaction', 'Simulation  and Modeling', 'Data AnalyticsLab', 'Machine Learning Lab', 'Internet of Things Lab','MiniProject']
    },
    '4th Year Sem-2': {
      codes: ['18CE4241', '18CS4201', '18MB4204', '18CS4206', '18CS4205'],
      subjects: ['Disaster Management', 'Software Practice and Testing', 'Project Management and Finance', 'Technical Seminar', 'Project']
    }
    // Add other semesters similarly
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
    setCode('');
    setSubject('');
  };

  const handleCodeChange = (e) => setCode(e.target.value);
  const handleSubjectChange = (e) => setSubject(e.target.value);
  const handleExternalMarksChange = (e) => setExternalMarks(e.target.value);
  const handleInternalMarksChange = (e) => setInternalMarks(e.target.value);
  const handleGrade = (e) => setGrade(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(semester, { subject, code, externalMarks, internalMarks, grade });
    setSuccessMessage('Marks successfully submitted!');

    // Clear the form fields
    setSemester('');
    setCode('');
    setSubject('');
    setExternalMarks('');
    setInternalMarks('');
    setGrade('');

    // Optionally, hide the message after some time
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div>
      <h3>Computer Science and Engineering</h3>
      <form onSubmit={handleSubmit}>
        <div className='py-5'>
          <h4>Enter Marks</h4>
          <div className='d-flex gap-5 align-items-center justify-content-between'>
            <select
              className='form-control form-select mb-3'
              value={semester}
              onChange={handleSemesterChange}
            >
              <option value="">Select Semester</option>
              {Object.keys(semesterData).map((sem) => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
            <select
              className='form-control form-select mb-3'
              value={code}
              onChange={handleCodeChange}
              disabled={!semester}
            >
              <option value="">Select Subject Code</option>
              {semester && semesterData[semester].codes.map((code, index) => (
                <option key={index} value={code}>{code}</option>
              ))}
            </select>
            <select
              className='form-control form-select mb-3'
              value={subject}
              onChange={handleSubjectChange}
              disabled={!semester}
            >
              <option value="">Select Subjects</option>
              {semester && semesterData[semester].subjects.map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
              ))}
            </select>
            <input
              type="number"
              className="form-control mb-3"
              required
              placeholder='Credits'
              value={externalMarks}
              onChange={handleExternalMarksChange}
            />
            <input
              type="number"
              className="form-control mb-3"
              required
              placeholder='Internal Marks'
              value={internalMarks}
              onChange={handleInternalMarksChange}
            />
            <select className="form-control mb-3 form-select" value={grade}
              onChange={handleGrade}
              required>
              <option value="">Select Grade</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="F">F</option>
              <option value="O">O</option>
            </select>
          </div>
          <div className='pt-3'>
            <button className='btn btn-success' type='submit'>Submit</button>
          </div>
        </div>
      </form>
      {successMessage && (
        <div className='alert alert-success mt-3' role='alert'>
          {successMessage}
        </div>
      )}
    </div>
  );
}

export default EnterMarksCse;
