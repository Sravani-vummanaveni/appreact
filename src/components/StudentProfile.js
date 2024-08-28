import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentProfile = ({ newStudent }) => {
    const [students, setStudents] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);
    const [editFormData, setEditFormData] = useState({
        finame: '',
        laname: '',
        faname: '',
        rno: '',
        mno: '',
        email: '',
        dob: '',
        address: '',
        document: '', // Added document to editFormData
    });
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/student`);
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, [newStudent]


);

    const handleEditClick = (student) => {
        setEditingStudent(student.id);
        setEditFormData({
            finame: student.finame,
            laname: student.laname,
            faname: student.faname,
            rno: student.rno,
            mno: student.mno,
            email: student.email,
            dob: student.dob,
            address: student.address,
            document: student.document, // Include document in editFormData
        });
    };

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleEditFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/students/${editingStudent}`, editFormData);
            setStudents(students.map(student => (student.id === editingStudent ? response.data : student)));
            setEditingStudent(null);
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    return (
        <div className='container-fluid'>
             {/* <div className='float-end pt-3'>
                <Link className='btn btn-success' type='button' to="/admin">Go Back</Link>
            </div> */}
            <h3 className='text-center py-3'>Student Profile</h3>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Father's Name</th>
                            <th>Roll No</th>
                            <th>Mobile No</th>
                            <th>Email Id</th>
                            <th>DOB</th>
                            <th>Address</th>
                            {/* <th>Document</th> Added Document column */}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                {editingStudent === student.id ? (
                                    <>
                                        <td>
                                            <input
                                                type="text"
                                                name="finame"
                                                value={editFormData.finame}
                                                onChange={handleEditFormChange}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="laname"
                                                value={editFormData.laname}
                                                onChange={handleEditFormChange}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="faname"
                                                value={editFormData.faname}
                                                onChange={handleEditFormChange}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="rno"
                                                value={editFormData.rno}
                                                onChange={handleEditFormChange}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="mno"
                                                value={editFormData.mno}
                                                onChange={handleEditFormChange}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="email"
                                                value={editFormData.email}
                                                onChange={handleEditFormChange}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                name="dob"
                                                value={editFormData.dob}
                                                onChange={handleEditFormChange}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="address"
                                                value={editFormData.address}
                                                onChange={handleEditFormChange}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="document"
                                                value={editFormData.document}
                                                onChange={handleEditFormChange}
                                                readOnly
                                            />
                                        </td>
                                        <td>
                                            <button onClick={handleEditFormSubmit}>Save</button>
                                            <button onClick={() => setEditingStudent(null)}>Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{student.finame}</td>
                                        <td>{student.laname}</td>
                                        <td>{student.faname}</td>
                                        <td>{student.rno}</td>
                                        <td>{student.mno}</td>
                                        <td>{student.email}</td>
                                        <td>{student.dob}</td>
                                        <td>{student.address}</td>
                                        {/* <td>
                                           
                                                <Link to="/view-documents" target="_blank" rel="noopener noreferrer">
                                                    View Document
                                                </Link>
                                          
                                        </td> */}
                                        <td>
                                            <button onClick={() => handleEditClick(student)}>Edit</button>
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
}

export default StudentProfile;
