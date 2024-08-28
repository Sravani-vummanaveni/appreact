import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadMarks = () => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [rollNo, setRollNo] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [studentDetails, setStudentDetails] = useState(null);
    const [message, setMessage] = useState('');
    const [editMode, setEditMode] = useState({}); // New state for edit mode
    const [editData, setEditData] = useState({}); // New state for edit data
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/students`);
                const filteredResponseData = response.data.map(({ _id, __v, ...rest }) => rest); // Exclude _id and __v fields
                setData(filteredResponseData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setMessage('Error fetching data. Please try again.');
            }
        };
        fetchData();
    }, []);

    const handleFilter = (e) => {
        e.preventDefault(); // Prevent the form from submitting

        const filtered = data.filter(student => student.rollNo === rollNo);
        if (filtered.length > 0) {
            const studentSemesters = filtered.reduce((acc, cur) => {
                acc[cur.semester] = cur;
                return acc;
            }, {});
            const { name, rollNo, batch, branch } = filtered[0];
            setStudentDetails({ name, rollNo, batch, branch, semesters: studentSemesters });
            setFilteredData(filtered);
        } else {
            setStudentDetails(null);
            setFilteredData([]);
        }
    };

    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const groupBySemester = (data) => {
        return data.reduce((acc, row) => {
            if (!acc[row.semester]) {
                acc[row.semester] = [];
            }
            acc[row.semester].push(row);
            return acc;
        }, {});
    };

    const groupedData = groupBySemester(filteredData);

    return (
        <div className="container mt-5">
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                    <form className="d-flex gap-2 mb-3" onSubmit={handleFilter}>
                        <input
                            type="text"
                            value={rollNo}
                            onChange={(e) => setRollNo(e.target.value)}
                            placeholder="Enter Roll No"
                            className="form-control mb-2"
                            required
                        />
                        <button className="btn btn-primary" type="submit">Filter</button>
                    </form>
                </div>
                <div className='col-md-3'></div>
            </div>

            {studentDetails && (
                <div>
                    <h2 className="mb-4">Your Progress</h2>
                    <div className="d-flex justify-content-between my-5">
                        <h6>Name: {studentDetails.name}</h6>
                        <h6>Roll No: {studentDetails.rollNo}</h6>
                        <h6>Batch: {studentDetails.batch}</h6>
                        <h6>Branch: {studentDetails.branch}</h6>
                    </div>
                </div>
            )}
            {Object.keys(groupedData).map((semester) => (
                <div key={semester} className="my-5">
                    <h3>{semester}</h3>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Subject Code</th>
                                <th>Subject</th>
                                <th>Credits</th>
                                <th>Internal Marks</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupedData[semester].map((row, index) => (
                                <tr key={index}>
                                    {editMode[semester] === index ? (
                                        <>
                                            <td><input type="text" name="subjectCode" value={editData.subjectCode} onChange={handleChange} /></td>
                                            <td><input type="text" name="subject" value={editData.subject} onChange={handleChange} /></td>
                                            <td><input type="text" name="credits" value={editData.credits} onChange={handleChange} /></td>
                                            <td><input type="text" name="internalMarks" value={editData.internalMarks} onChange={handleChange} /></td>
                                            <td><input type="text" name="grade" value={editData.grade} onChange={handleChange} /></td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{row.subjectCode}</td>
                                            <td>{row.subject}</td>
                                            <td>{row.credits}</td>
                                            <td>{row.internalMarks}</td>
                                            <td>{row.grade}</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {studentDetails && studentDetails.semesters[semester] && (
                        <div className="d-flex gap-5 align-items-center justify-content-end">
                            <h6>SGPA: {studentDetails.semesters[semester].sgpa}</h6>
                            <h6>CGPA: {studentDetails.semesters[semester].cgpa}</h6>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default UploadMarks;
