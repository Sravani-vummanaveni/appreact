import React, { useState, useEffect } from 'react';
import EnterMarksCse from './EnterMarksCse';
import EnterMarksEce from './EnterMarksEce';
import EnterMarksEee from './EnterMarksEee';
import axios from 'axios';
import UploadMarks from './UploadMarks';
import StudentMarks from './StudentMarks';

const EnterMarks = () => {
  const [branch, setBranch] = useState('');
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    rollNo: '',
    batch: '',
    branch: '',
  });
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
    setStudentDetails({ ...studentDetails, branch: e.target.value });
  };

  const handleStudentDetailChange = (e) => {
    setStudentDetails({
      ...studentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleMarksSubmit = async (semester, mark) => {
    try {
      await axios.post(`http://localhost:5000/api/marks`, {
        ...studentDetails,
        semester,
        ...mark,
      });
    } catch (err) {
      console.error('Error submitting marks:', err);
    }
  };

  

  return (
    <div className='container'>
      {/* <UploadMarks/> */}
      <StudentMarks/>
      <form className='row pt-5'>
        <div className="col-md-3 mb-3">
          <input
            type="text"
            className="form-control"
            name="name"
            required
            placeholder='Student Name'
            value={studentDetails.name}
            onChange={handleStudentDetailChange}
          />
        </div>
        <div className="col-md-3 mb-4">
          <input
            type="text"
            className="form-control"
            name="rollNo"
            required
            placeholder='Roll No'
            value={studentDetails.rollNo}
            onChange={handleStudentDetailChange}
          />
        </div>
        <div className="col-md-3 mb-4">
          <select
            className='form-control form-select'
            name="batch"
            value={studentDetails.batch}
            onChange={handleStudentDetailChange}
          >
            <option value="">Select Batch</option>
            <option value="2024-2028">2024-2028</option>
            <option value="2025-2029">2025-2029</option>
            <option value="2026-2030">2026-2030</option>
          </select>
        </div>
        <div className="col-md-3 mb-3">
          <select
            className='form-control form-select'
            value={branch}
            onChange={handleBranchChange}
          >
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="EEE">EEE</option>
            <option value="ECE">ECE</option>
          </select>
        </div>
      </form>
      {branch === 'CSE' && <EnterMarksCse onSubmit={handleMarksSubmit} />}
      {branch === 'EEE' && <EnterMarksEee onSubmit={handleMarksSubmit} />}
      {branch === 'ECE' && <EnterMarksEce onSubmit={handleMarksSubmit} />}
   
    </div>
  );
};

export default EnterMarks;
