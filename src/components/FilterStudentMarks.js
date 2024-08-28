import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

function FilterStudentMarks() {
    const [file, setFile] = useState(null);
    const [rollNo, setRollNo] = useState('');
    const [data, setData] = useState(null);

    // Handle file change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };



    // Handle search to fetch student details and grades
    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/grades`, {
                params: { rollNo }
            });
            setData(response.data);  // Assuming response data contains student details and subjects
        } catch (error) {
            console.error('Error fetching data');
        }
    };

    return (
        <div className="row">
            <div className='col-md-3'></div>
            <div className='col-md-6'>
                <h5 className='text-center'>Search student marks by rollno</h5>
                <div className='d-flex gap-2 mt-4'>
                    <input
                        type="text"
                        value={rollNo}
                        onChange={(e) => setRollNo(e.target.value)}
                        className='form-control'
                        placeholder="Enter Roll No"
                    />
                    <button onClick={handleSearch} className='btn btn-primary'>Search</button>
                </div>
            </div>
            <div className='col-md-3'></div>
            {data && data.length > 0 && (
                <div>
                    <div className='table-responsive pt-5'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Roll No</th>
                                    {/* <th>Name</th> */}
                                    <th>Branch</th>
                                    <th>Batch</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{data[0].rollNo}</td>
                                    {/* <td>{data[0].sname}</td> */}
                                    <td>{data[0].branch}</td>
                                    <td>{data[0].batch}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="table-grid pt-5">
                            {data.map((semesterData, index) => (
                                <div key={index} className='table-container'>
                                    <h4 className='text-center pt-4'>Semester: {semesterData.semester}</h4>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>Subject Code</th>
                                                <th>Grade</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(semesterData.subjects).map((subjectCode) => (
                                                <tr key={`${semesterData.rollNo}-${subjectCode}`}>
                                                    <td>{subjectCode}</td>
                                                    <td>{semesterData.subjects[subjectCode]}</td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td><strong>SGPA</strong></td>
                                                <td>{semesterData.sgpa}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FilterStudentMarks;
