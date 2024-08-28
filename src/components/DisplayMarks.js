import React, { useState } from 'react';
import axios from 'axios';

const DisplayMarks = ({ studentDetails }) => {
  const [marks, setMarks] = useState(studentDetails.marks || []);
  const [editingMark, setEditingMark] = useState(null);
  const [formValues, setFormValues] = useState({
    code: '',
    subject: '',
    externalMarks: '',
    internalMarks: '',
    grade: ''
  });
  const apiUrl = process.env.REACT_APP_API_URL;

  const groupMarksBySemester = (marks) => {
    return marks.reduce((acc, mark) => {
      if (!acc[mark.semester]) {
        acc[mark.semester] = [];
      }
      acc[mark.semester].push(mark);
      return acc;
    }, {});
  };

  const handleEdit = (mark) => {
    setEditingMark(mark);
    setFormValues({
      code: mark.code,
      subject: mark.subject,
      externalMarks: mark.externalMarks,
      internalMarks: mark.internalMarks,
      grade: mark.grade
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSave = async () => {
    try {
      const updatedMark = { ...editingMark, ...formValues };
      const response = await axios.put(`http://localhost:5000/api/marks/${editingMark._id}`, updatedMark);
      const updatedMarks = marks.map(mark => mark._id === editingMark._id ? updatedMark : mark);
      setMarks(updatedMarks);
      setEditingMark(null);
    } catch (error) {
      console.error('Error updating mark:', error);
    }
  };

  const handleDelete = async (markId) => {
    try {
      await axios.delete(`http://localhost:5000/api/marks/${markId}`);
      setMarks(marks.filter(mark => mark._id !== markId));
    } catch (error) {
      console.error('Error deleting mark:', error);
    }
  };

  const renderMarksTable = (semester, marks) => {
    return (
      <div key={semester} className='mb-4'>
        <h4>{semester}</h4>
        <div className='table-responsive'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Subject Code</th>
                <th>Subject</th>
                <th>Credits</th>
                <th>Internal Marks</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((mark, index) => (
                <tr key={index}>
                  {editingMark && editingMark._id === mark._id ? (
                    <>
                      <td><input name="code" value={formValues.code} onChange={handleInputChange} /></td>
                      <td><input name="subject" value={formValues.subject} onChange={handleInputChange} /></td>
                      <td><input name="externalMarks" value={formValues.externalMarks} onChange={handleInputChange} /></td>
                      <td><input name="internalMarks" value={formValues.internalMarks} onChange={handleInputChange} /></td>
                      <td><input name="grade" value={formValues.grade} onChange={handleInputChange} /></td>
                      <td>
                        <button onClick={handleSave} className='me-2'>Save</button>
                        <button onClick={() => setEditingMark(null)}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{mark.code}</td>
                      <td>{mark.subject}</td>
                      <td>{mark.externalMarks}</td>
                      <td>{mark.internalMarks}</td>
                      <td>{mark.grade}</td>
                      <td>
                        <button onClick={() => handleEdit(mark)} className='me-2'>Edit</button>
                        <button onClick={() => handleDelete(mark._id)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const groupedMarks = groupMarksBySemester(marks);
  const columns = Object.keys(groupedMarks);

  return (
    <div className='container py-5'>
      <h3>Student Marks</h3>
      <div className='d-flex gap-5 align-items-center justify-content-between border-bottom pt-5'>
        <h6>Name: {studentDetails.name}</h6>
        <h6>Roll No: {studentDetails.rollNo}</h6>
        <h6>Batch: {studentDetails.batch}</h6>
        <h6>Branch: {studentDetails.branch}</h6>
      </div>
      <div className='row py-5'>
        {columns.map((semester, index) => (
          <div key={index} className='col-md-12'>
            {renderMarksTable(semester, groupedMarks[semester])}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayMarks;
