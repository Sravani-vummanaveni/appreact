import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SingleStudent = ({ rollNoFilter }) => {
    const [students, setStudents] = useState([]);
    const [editStudentId, setEditStudentId] = useState(null);
    const [formValues, setFormValues] = useState({});

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:3001/student');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    const handleEdit = (student) => {
        setEditStudentId(student.id);
        setFormValues(student);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/student/${id}`);
            setStudents(students.filter(student => student.id !== id));
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:3001/student/${editStudentId}`, formValues);
            setStudents(students.map(student => student.id === editStudentId ? formValues : student));
            setEditStudentId(null);
            setFormValues({});
        } catch (error) {
            console.error('Error saving student:', error);
        }
    };

    const handleCancel = () => {
        setEditStudentId(null);
        setFormValues({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const filteredStudents = students.filter(student => student.rno === rollNoFilter);

    return (
        <div>
            {filteredStudents.length > 0 ? (
                <div className='table-responsive container-fluid w-100 py-5'>
                    <h2 className='py-3'>Student List</h2>
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
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student) => (
                                <tr key={student.id}>
                                 
                                        <>
                                            <td>{student.finame}</td>
                                            <td>{student.laname}</td>
                                            <td>{student.faname}</td>
                                            <td>{student.rno}</td>
                                            <td>{student.mno}</td>
                                            <td>{student.email}</td>
                                            <td>{student.dob}</td>
                                            <td>{student.address}</td>
                                          
                                        </>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No students found for Roll No: {rollNoFilter}</p>
            )}
        </div>
    );
};

export default SingleStudent;
