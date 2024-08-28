import React, { useState } from 'react';
import StudentForm from './StudentForm';
import SingleStudentTwo from './SingleStudentTwo';

const StudentData = () => {
  const [newStudent, setNewStudent] = useState(null);
  const [rollNoFilter, setRollNoFilter] = useState('');

  const handleStudentAdded = (student) => {
    setNewStudent(student);
  };

  const handleRollNoChange = (e) => {
    setRollNoFilter(e.target.value);
  };

  return (
    <div>
      {/* <StudentForm onStudentAdded={handleStudentAdded} /> */}
      <div>
        <h5>Filter by Roll No:</h5>
        <input type="text" value={rollNoFilter} onChange={handleRollNoChange} placeholder='Roll No' />
      </div>
      <SingleStudentTwo rollNoFilter={rollNoFilter} />
    </div>
  );
};

export default StudentData;
