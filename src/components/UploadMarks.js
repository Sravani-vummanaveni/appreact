import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadMarks = () => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);
    const [rollNo, setRollNo] = useState('');
    const [semester, setSemester] = useState(''); // Add state for selected semester
    const [filteredData, setFilteredData] = useState([]);
    const [studentDetails, setStudentDetails] = useState(null);
    const [message, setMessage] = useState('');
    const [editingMark, setEditingMark] = useState(null);
    const [formValues, setFormValues] = useState({
        subjectCode: '',
        subject: '',
        credits: '',
        internalMarks: '',
        grade: '',
        sgpa: '',
        cgpa: '',
        semester: ''
    });
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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post(`http://localhost:5000/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage('File uploaded and data saved to database successfully.');
            const response = await axios.get(`${apiUrl}/students`);
            const filteredResponseData = response.data.map(({ _id, __v, ...rest }) => rest); // Exclude _id and __v fields
            setData(filteredResponseData);
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('Error uploading file. Please try again.');
        }
    };

    const handleFilter = (e) => {
        e.preventDefault(); // Prevent the form from submitting

        const filtered = data.filter(student => 
            student.rollNo === rollNo && student.semester === semester
        );
        
        if (filtered.length > 0) {
            const studentSemesters = filtered.reduce((acc, cur) => {
                acc[cur.semester] = cur;
                return acc;
            }, {});
            setStudentDetails({
                name: filtered[0].name,
                rollNo: filtered[0].rollNo,
                batch: filtered[0].batch,
                branch: filtered[0].branch,
                semesters: studentSemesters
            });
            setFilteredData(filtered);
        } else {
            setStudentDetails(null);
            setFilteredData([]);
        }
    };

    const handleEdit = (mark) => {
        setEditingMark(mark);
        setFormValues({
            subjectCode: mark.subjectCode,
            subject: mark.subject,
            credits: mark.credits,
            internalMarks: mark.internalMarks,
            grade: mark.grade,
            sgpa: studentDetails.semesters[mark.semester].sgpa, // Set from student details for the specific semester
            cgpa: studentDetails.semesters[mark.semester].cgpa, // Set from student details for the specific semester
            semester: mark.semester
        });
    };

    const handleSave = async () => {
        try {
            const updatedMark = { ...editingMark, ...formValues };
            const response = await axios.put(`http://localhost:5000/students/${studentDetails.rollNo}`, updatedMark);
            const updatedMarks = filteredData.map(mark => mark.subjectCode === editingMark.subjectCode ? updatedMark : mark);
            setFilteredData(updatedMarks);
            setStudentDetails(prevDetails => ({
                ...prevDetails,
                semesters: {
                    ...prevDetails.semesters,
                    [formValues.semester]: {
                        ...prevDetails.semesters[formValues.semester],
                        sgpa: formValues.sgpa,
                        cgpa: formValues.cgpa
                    }
                }
            }));
            setEditingMark(null);
        } catch (error) {
            console.error('Error updating mark:', error);
        }
    };

    const handleDelete = async (subjectCode) => {
        try {
            await axios.delete(`http://localhost:5000/students/${studentDetails.rollNo}/${subjectCode}`);
            const updatedData = filteredData.filter(student => student.subjectCode !== subjectCode);
            setFilteredData(updatedData);
            setMessage('Data deleted successfully.');
        } catch (error) {
            console.error('Error deleting data:', error);
            setMessage(`Error deleting data: ${error.response ? error.response.data : error.message}`);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
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

    // Get unique semesters for dropdown
    const uniqueSemesters = [...new Set(data.map(item => item.semester))];

    return (
        <div className="mt-5">
            <h4 className="mb-4 text-center">Upload Marks</h4>
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                    <div className="d-flex gap-2 mb-3">
                        <input
                            type="file"
                            className="form-control"
                            onChange={handleFileChange}
                        />
                        <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
                    </div>
                    {message && <p className="p-3 mb-2 bg-success text-white">{message}</p>}
                    <form className="d-flex gap-2 mb-3" onSubmit={handleFilter}>
                        <input
                            type="text"
                            value={rollNo}
                            onChange={(e) => setRollNo(e.target.value)}
                            placeholder="Enter Roll No"
                            className="form-control mb-2"
                            required
                        />
                        <select
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                            className="form-control mb-2"
                            required
                        >
                            <option value="">Select Semester</option>
                            {uniqueSemesters.map((sem, index) => (
                                <option key={index} value={sem}>{sem}</option>
                            ))}
                        </select>
                        <button className="btn btn-primary" type="submit">Filter</button>
                    </form>
                </div>
                <div className='col-md-3'></div>
            </div>
            {studentDetails && (
                <div>
                    <h4 className='mb-5'>Student Progress</h4>
                    <div className='d-flex align-items-center justify-content-between'>
                        <h6><strong>Name:</strong> {studentDetails.name}</h6>
                        <h6><strong>Roll No:</strong> {studentDetails.rollNo}</h6>
                        <h6><strong>Batch:</strong> {studentDetails.batch}</h6>
                        <h6><strong>Branch:</strong> {studentDetails.branch}</h6>
                    </div>
                </div>
            )}
            <div>
                {Object.keys(groupedData).map(semester => (
                    <div className='py-5' key={semester}>
                        <h3 className='mb-5'>{semester}</h3>
                        <div className='table-responsive'>
                            <table className="table table-striped w-100">
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
                                    {groupedData[semester].map((mark, index) => (
                                        <tr key={index}>
                                            <td>{editingMark && editingMark.subjectCode === mark.subjectCode
                                                ? <input
                                                    type="text"
                                                    name="subjectCode"
                                                    value={formValues.subjectCode}
                                                    onChange={handleInputChange}
                                                />
                                                : mark.subjectCode}
                                            </td>
                                            <td>{editingMark && editingMark.subjectCode === mark.subjectCode
                                                ? <input
                                                    type="text"
                                                    name="subject"
                                                    value={formValues.subject}
                                                    onChange={handleInputChange}
                                                />
                                                : mark.subject}
                                            </td>
                                            <td>{editingMark && editingMark.subjectCode === mark.subjectCode
                                                ? <input
                                                    type="number"
                                                    name="credits"
                                                    value={formValues.credits}
                                                    onChange={handleInputChange}
                                                />
                                                : mark.credits}
                                            </td>
                                            <td>{editingMark && editingMark.subjectCode === mark.subjectCode
                                                ? <input
                                                    type="number"
                                                    name="internalMarks"
                                                    value={formValues.internalMarks}
                                                    onChange={handleInputChange}
                                                />
                                                : mark.internalMarks}
                                            </td>
                                            <td>{editingMark && editingMark.subjectCode === mark.subjectCode
                                                ? <input
                                                    type="text"
                                                    name="grade"
                                                    value={formValues.grade}
                                                    onChange={handleInputChange}
                                                />
                                                : mark.grade}
                                            </td>
                                            <td>
                                                {editingMark && editingMark.subjectCode === mark.subjectCode ? (
                                                    <button className="btn btn-primary" onClick={handleSave}>Save</button>
                                                ) : (
                                                    <>
                                                        <button className="btn btn-warning me-2" onClick={() => handleEdit(mark)}>Edit</button>
                                                        <button className="btn btn-danger" onClick={() => handleDelete(mark.subjectCode)}>Delete</button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                            <div className='d-flex justify-content-end gap-5 mt-3'>
                                <h6><strong>SGPA:</strong> {editingMark && editingMark.semester === semester ? 
                                    <input
                                        type="number"
                                        name="sgpa"
                                        value={formValues.sgpa}
                                        onChange={handleInputChange}
                                    />
                                    : studentDetails.semesters[semester]?.sgpa || 'N/A'}
                                </h6>
                                <h6><strong>CGPA:</strong> {editingMark && editingMark.semester === semester ? 
                                    <input
                                        type="number"
                                        name="cgpa"
                                        value={formValues.cgpa}
                                        onChange={handleInputChange}
                                    />
                                    : studentDetails.semesters[semester]?.cgpa || 'N/A'}
                                    </h6>
                                {editingMark && editingMark.semester === semester && (
                                    <button className="btn btn-primary mt-2" onClick={handleSave}>Save</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UploadMarks;
