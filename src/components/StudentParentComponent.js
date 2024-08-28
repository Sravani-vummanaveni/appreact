import React, { useState } from 'react';
import StudentForm from './StudentForm';

const StudentParentComponent = () => {
  const [students, setStudents] = useState([]);

  const handleStudentAdded = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  return (
    <div>
      <StudentForm onStudentAdded={handleStudentAdded} />
      {/* Other components or code */}
    </div>
  );
};

export default StudentParentComponent;
