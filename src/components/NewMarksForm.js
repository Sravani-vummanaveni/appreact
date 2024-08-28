import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewMarksForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollno: '',
    batch: '',
    branch: '',
    semester: '',
    subjects: []
  });

  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [rollNoFilter, setRollNoFilter] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);

  useEffect(() => {
    // Fetch semesters and subjects based on branch selection
    if (formData.branch) {
      // Simulating an API call to get semesters and subjects for the selected branch
      setSemesters(['Semester 1', 'Semester 2', 'Semester 3']);
      setSubjects([
        { subjectCode: 'CS101', subject: 'Math', credit: 3 },
        { subjectCode: 'CS102', subject: 'Physics', credit: 4 }
      ]);
    }
  }, [formData.branch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubjectChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSubjects = formData.subjects.map((subject, i) =>
      i === index ? { ...subject, [name]: value } : subject
    );
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  const handleAddSubject = () => {
    setFormData({ ...formData, subjects: [...formData.subjects, { subjectCode: '', subject: '', credit: '', internalMarks: '', grade: '' }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/add-student', formData);
      alert('Student data submitted');
    } catch (error) {
      console.error('Error submitting student data:', error);
    }
  };

  const handleFilter = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/students/${rollNoFilter}`);
      setFilteredStudents(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setCurrentEditIndex(index);
  };

  const handleSave = async (index) => {
    const updatedStudent = filteredStudents[index];
    try {
      await axios.put(`http://localhost:5000/update-student/${updatedStudent._id}`, updatedStudent);
      setIsEditing(false);
      setCurrentEditIndex(null);
      handleFilter(); // Refresh the filtered data
    } catch (error) {
      console.error('Error updating student data:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentEditIndex(null);
    handleFilter(); // Refresh the filtered data
  };

  const handleFilteredStudentChange = (e, studentIndex, subjectIndex) => {
    const { name, value } = e.target;
    const updatedStudents = filteredStudents.map((student, i) => {
      if (i === studentIndex) {
        const updatedSubjects = student.subjects.map((subject, j) => {
          if (j === subjectIndex) {
            return { ...subject, [name]: value };
          }
          return subject;
        });
        return { ...student, subjects: updatedSubjects };
      }
      return student;
    });
    setFilteredStudents(updatedStudents);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Enter Student Marks</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Roll No</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" name="rollno" value={formData.rollno} onChange={handleChange} />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Batch</label>
          <div className="col-sm-10">
            <select className="form-select" name="batch" value={formData.batch} onChange={handleChange}>
              <option value="">Select Batch</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Branch</label>
          <div className="col-sm-10">
            <select className="form-select" name="branch" value={formData.branch} onChange={handleChange}>
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
            </select>
          </div>
        </div>
        {formData.branch && (
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Semester</label>
            <div className="col-sm-10">
              <select className="form-select" name="semester" value={formData.semester} onChange={handleChange}>
                <option value="">Select Semester</option>
                {semesters.map((semester, index) => (
                  <option key={index} value={semester}>{semester}</option>
                ))}
              </select>
            </div>
          </div>
        )}
        {formData.semester && (
          <div>
            <h3 className="mt-4">Subjects</h3>
            {formData.subjects.map((subject, index) => (
              <div key={index} className="mb-3">
                <div className="row">
                  <div className="col-sm-2">
                    <label className="col-form-label">Subject Code</label>
                    <select className="form-select" name="subjectCode" value={subject.subjectCode} onChange={(e) => handleSubjectChange(e, index)}>
                      <option value="">Select Subject Code</option>
                      {subjects.map((subj, idx) => (
                        <option key={idx} value={subj.subjectCode}>{subj.subjectCode}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-sm-2">
                    <label className="col-form-label">Subject</label>
                    <input type="text" className="form-control" name="subject" value={subject.subject} onChange={(e) => handleSubjectChange(e, index)} />
                  </div>
                  <div className="col-sm-2">
                    <label className="col-form-label">Credit</label>
                    <input type="number" className="form-control" name="credit" value={subject.credit} onChange={(e) => handleSubjectChange(e, index)} />
                  </div>
                  <div className="col-sm-3">
                    <label className="col-form-label">Internal Marks</label>
                    <input type="number" className="form-control" name="internalMarks" value={subject.internalMarks} onChange={(e) => handleSubjectChange(e, index)} />
                  </div>
                  <div className="col-sm-3">
                    <label className="col-form-label">Grade</label>
                    <input type="text" className="form-control" name="grade" value={subject.grade} onChange={(e) => handleSubjectChange(e, index)} />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-primary" onClick={handleAddSubject}>Add Subject</button>
          </div>
        )}
        <button type="submit" className="btn btn-success mt-4">Submit</button>
      </form>

      <h2 className="mt-5">Filter by Roll No</h2>
      <div className="input-group mb-3">
        <input type="text" className="form-control" value={rollNoFilter} onChange={(e) => setRollNoFilter(e.target.value)} placeholder="Enter Roll No" />
        <button className="btn btn-outline-secondary" onClick={handleFilter}>Filter</button>
      </div>
      {filteredStudents.length > 0 && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>Batch</th>
              <th>Branch</th>
              <th>Semester</th>
              <th>Subjects</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, studentIndex) => (
              <tr key={studentIndex}>
                <td>{student.name}</td>
                <td>{student.rollno}</td>
                <td>{student.batch}</td>
                <td>{student.branch}</td>
                <td>{student.semester}</td>
                <td>
                  {student.subjects.map((subject, subjectIndex) => (
                    <div key={subjectIndex} className="mb-3">
                      <div className="row">
                        <div className="col-sm-2">
                          <label className="col-form-label">Subject Code</label>
                          <input
                            type="text"
                            className="form-control"
                            name="subjectCode"
                            value={subject.subjectCode}
                            onChange={(e) => handleFilteredStudentChange(e, studentIndex, subjectIndex)}
                            disabled={!isEditing || currentEditIndex !== studentIndex}
                          />
                        </div>
                        <div className="col-sm-2">
                          <label className="col-form-label">Subject</label>
                          <input
                            type="text"
                            className="form-control"
                            name="subject"
                            value={subject.subject}
                            onChange={(e) => handleFilteredStudentChange(e, studentIndex, subjectIndex)}
                            disabled={!isEditing || currentEditIndex !== studentIndex}
                          />
                        </div>
                        <div className="col-sm-2">
                          <label className="col-form-label">Credit</label>
                          <input
                            type="number"
                            className="form-control"
                            name="credit"
                            value={subject.credit}
                            onChange={(e) => handleFilteredStudentChange(e, studentIndex, subjectIndex)}
                            disabled={!isEditing || currentEditIndex !== studentIndex}
                          />
                        </div>
                        <div className="col-sm-3">
                          <label className="col-form-label">Internal Marks</label>
                          <input
                            type="number"
                            className="form-control"
                            name="internalMarks"
                            value={subject.internalMarks}
                            onChange={(e) => handleFilteredStudentChange(e, studentIndex, subjectIndex)}
                            disabled={!isEditing || currentEditIndex !== studentIndex}
                          />
                        </div>
                        <div className="col-sm-3">
                          <label className="col-form-label">Grade</label>
                          <input
                            type="text"
                            className="form-control"
                            name="grade"
                            value={subject.grade}
                            onChange={(e) => handleFilteredStudentChange(e, studentIndex, subjectIndex)}
                            disabled={!isEditing || currentEditIndex !== studentIndex}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </td>
                <td>
                  {isEditing && currentEditIndex === studentIndex ? (
                    <>
                      <button className="btn btn-success" onClick={() => handleSave(studentIndex)}>Save</button>
                      <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                    </>
                  ) : (
                    <button className="btn btn-primary" onClick={() => handleEdit(studentIndex)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NewMarksForm;
