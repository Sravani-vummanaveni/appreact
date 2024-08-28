import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayStudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/studentdetails`);
      const sortedData = response.data.sort((a, b) => a.rollNo.localeCompare(b.rollNo)); // Sort by roll number
      setStudents(sortedData);
      setFilteredStudents(sortedData);
    } catch (err) {
      console.error('Error fetching student data:', err);
      setError('Failed to fetch student data.');
    }
  };

  const handleBatchArchive = async () => {
    if (!selectedBatch) {
      setError('Please select a batch to archive.');
      return;
    }

    try {
      await axios.patch(`http://localhost:5000/studentdetails/archive-batch`, { batch: selectedBatch });
      setMessage('Batch archived successfully.');
      fetchStudentData(); // Refresh data
    } catch (err) {
      console.error('Error archiving batch:', err);
      setError('Failed to archive batch.');
    }
  };

  useEffect(() => {
    if (selectedBatch && selectedBatch !== 'All') {
      const filtered = students.filter(student => student.batch === selectedBatch);
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);
    }
  }, [selectedBatch, students]);

  useEffect(() => {
    fetchStudentData();
  }, []);

  return (
    <div className="container mt-5">
      <h4 className="mb-4 text-center">Student Details</h4>

      {/* Batch filter dropdown */}
      <div className="mb-4 text-center">
        <label htmlFor="batchFilter">Filter by Batch: </label>
        <select
          id="batchFilter"
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
        >
          <option value="All">All Batches</option>
          {[...new Set(students.map(student => student.batch))].map((batch, index) => (
            <option key={index} value={batch}>{batch}</option>
          ))}
        </select>
      </div>

      <div className="text-center mb-4">
        <button
          onClick={handleBatchArchive}
          className="btn btn-danger"
        >
          Archive Batch
        </button>
      </div>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
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
              <th>Gender</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.fatherName}</td>
                  <td>{student.rollNo}</td>
                  <td>{student.batch}</td>
                  <td>{student.branch}</td>
                  <td>{student.mobileNumber}</td>
                  <td>{student.parentNumber}</td>
                  <td>{student.email}</td>
                  <td>{student.gender}</td>
                  <td>{student.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayStudentList;
