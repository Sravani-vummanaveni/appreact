import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadStudentDetails = () => {
  const [file, setFile] = useState(null);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [searchRollNo, setSearchRollNo] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload-student-details', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(response.data.message);
      fetchStudentData(); // Fetch student data after successful upload
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Failed to upload file.');
    }
  };

  const fetchStudentData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/studentdetails');
      setStudents(response.data);
    } catch (err) {
      console.error('Error fetching student data:', err);
      setError('Failed to fetch student data.');
    }
  };

  const handleSearch = (e) => {
    setSearchRollNo(e.target.value);
    if (e.target.value === '') {
      setFilteredStudents([]);
    } else {
      const filtered = students.filter(student =>
        student.rollNo?.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  };
  

  useEffect(() => {
    fetchStudentData();
  }, []);

  return (
    <div className="mt-5">
      <h4 className="mb-4">Upload Student Details</h4>
      <div className="d-flex gap-2 mb-3 ">
        <input type="file" className="form-control" onChange={handleFileChange} />
        <button className="btn btn-primary" onClick={handleFileUpload}>Upload</button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Roll No"
          value={searchRollNo}
          onChange={handleSearch}
        />
      </div>
      {message && <p className="p-3 mb-2 bg-success text-white text-center">{message}</p>}
      {error && <p className="p-3 mb-2 bg-danger text-white text-center">{error}</p>}
      
      {/* <div className="table-responsive">
      {filteredStudents.map((student, index) => (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Father Name</th>
              <th>Roll No</th>
              <th>Batch</th>
              <th>Branch</th>
              <th>Mobile Number</th>
              <th>Parent Number</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.fatherName}</td>
                <td>{student.rollNo}</td>
                <td>{student.batch}</td>
                <td>{student.branch}</td>
                <td>{student.mobileNumber}</td>
                <td>{student.parentNumber}</td>
                <td>{student.email}</td>
                <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                <td>{student.address}</td>
                <td>{student.gender}</td>
              </tr>
          
          </tbody>
        </table>
          ))}
      </div> */}
<div className="table-responsive">
  {filteredStudents.length > 0 ? (
    <table className="table table-striped">
      <thead>
        <tr>
        <th>Name</th>
              <th>Father Name</th>
              <th>Roll No</th>
              <th>Batch</th>
              <th>Branch</th>
              <th>Mobile Number</th>
              <th>Parent Number</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        {filteredStudents.map((student, index) => (
          <tr key={index}>
             <td>{student.name}</td>
                <td>{student.fatherName}</td>
                <td>{student.rollNo}</td>
                <td>{student.batch}</td>
                <td>{student.branch}</td>
                <td>{student.mobileNumber}</td>
                <td>{student.parentNumber}</td>
                <td>{student.email}</td>
                <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                <td>{student.address}</td>
                <td>{student.gender}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>No results found</p>
  )}
</div>


    </div>
  );
};

export default UploadStudentDetails;
