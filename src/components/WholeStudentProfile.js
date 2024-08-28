import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WholeStudentProfile = () => {
  const [rollNo, setRollNo] = useState('');
  const [studentExtra, setStudentExtra] = useState({});
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Retrieve the role from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/student/${rollNo}`);
      const { studentDetails, studentMarks, activities, eactivities, studentExtra } = response.data;

      setStudentData({ studentDetails, studentMarks, activities, eactivities });
      setStudentExtra(studentExtra || {}); // Set the studentExtra state with the fetched data, or an empty object if undefined
      setError(null);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching student data:', error.message);
      setError('No data found for this roll number');
      setLoading(false);
    }
  };

  const groupBySemester = (marks) => {
    return marks.reduce((acc, mark) => {
      const { semester } = mark;
      if (!acc[semester]) {
        acc[semester] = {
          marks: [],
          sgpa: mark.sgpa,
          cgpa: mark.cgpa,
        };
      }
      acc[semester].marks.push(mark);
      return acc;
    }, {});
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Roll Number"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
      />
      <button onClick={fetchStudentData} className='btn btn-success ms-3'>Fetch Data</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {studentData && (
        <div className='py-3'>
          <h4 className='pt-3'>Student Profile</h4>

          {/* Render Student Details Table */}
          <div className='table-responsive pt-2'>
            <table className='table text-center'>
              <thead>
                <tr>
                  <th>Profile Picture</th>
                  <th>Name</th>
                  <th>Father's Name</th>
                  <th>Roll No</th>
                  <th>Batch</th>
                  <th>Branch</th>
                  <th>Gender</th>
                  <th>Mobile No</th>
                  <th>Parent Mobile No</th>
                  <th>Github</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {studentExtra.profilePicture ? (
                      <img src={`http://localhost:5000/${studentExtra.profilePicture}`} alt="Profile" className='circle-img img-fluid' style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                    ) : (
                      <p>No Profile Picture</p>
                    )}
                  </td>
                  <td>{studentData.studentDetails.name}</td>
                  <td>{studentData.studentDetails.fatherName}</td>
                  <td>{studentData.studentDetails.rollNo}</td>
                  <td>{studentData.studentDetails.batch}</td>
                  <td>{studentData.studentDetails.branch}</td>
                  <td>{studentData.studentDetails.gender}</td>
                  <td>{studentData.studentDetails.mobileNumber}</td>
                  <td>{studentData.studentDetails.parentNumber}</td>
                  <td> 
                    {studentExtra.githubLink ? (
                      <a href={studentExtra.githubLink} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github fa-2x"></i>
                      </a>
                    ) : (
                      <p>No GitHub link provided</p>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Render Student Marks */}
          <div className="table-grid pt-5">
            {Object.entries(groupBySemester(studentData.studentMarks)).map(([semester, { marks, sgpa }]) => (
              <div key={semester} className='table-container'>
                <h4 className='text-center'>{semester}</h4>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Subject Code</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marks.map((mark, index) => (
                      Object.entries(mark.subjects).map(([subjectCode, grade]) => (
                        <tr key={subjectCode}>
                          <td>{subjectCode}</td>
                          <td>{grade}</td>
                        </tr>
                      ))
                    ))}
                  </tbody>
                </table>
                <div className='d-flex justify-content-end gap-5 pt-1'>
                  <h6>SGPA: {sgpa}</h6>
                </div>
              </div>
            ))}
          </div>

          {/* Render Co-curricular Activities */}
          <h3 className='py-4'>Co-curricular Activities</h3>
          <div className='table-responsive'>
            <table className='table text-center'>
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Group Activity</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Competition Level</th>
                  <th>Hosted By</th>
                  <th>Prizes</th>
                  <th>Certificate</th> {/* Added Certificate column */}
                </tr>
              </thead>
              <tbody>
                {studentData.activities.length > 0 ? (
                  studentData.activities.map((activity, index) => (
                    <tr key={index}>
                      <td>{activity.aname}</td>
                      <td>{activity.agroup}</td>
                      <td>{new Date(activity.fdate).toLocaleDateString()}</td>
                      <td>{new Date(activity.tdate).toLocaleDateString()}</td>
                      <td>{activity.competitionLevel}</td>
                      <td>{activity.host}</td>
                      <td>{activity.prizes}</td>
                      <td>
                        {studentExtra.certificate ? (
                          <a target="_blank" href={`http://localhost:5000/${studentExtra.certificate}`} download>
                            <i className="fas fa-download fa-2x"></i>
                          </a>
                        ) : (
                          'No certificate'
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No activities found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Render Extra-curricular Activities */}
          <h3 className='py-4'>Extra-curricular Activities</h3>
          <div className='table-responsive'>
            <table className='table text-center'>
              <thead>
                <tr>
                <th>Event Name</th>
                  <th>Group Activity</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Competition Level</th>
                  <th>Hosted By</th>
                  <th>Prizes</th>
                  <th>Certificate</th> {/* Added Certificate column */}
                </tr>
              </thead>
              <tbody>
                {studentData.eactivities.length > 0 ? (
                  studentData.eactivities.map((eactivity, index) => (
                    <tr key={index}>
                      <td>{eactivity.aname}</td>
                      <td>{eactivity.agroup}</td>
                      <td>{new Date(eactivity.fdate).toLocaleDateString()}</td>
                      <td>{new Date(eactivity.tdate).toLocaleDateString()}</td>
                      <td>{eactivity.competitionLevel}</td>
                      <td>{eactivity.host}</td>
                      <td>{eactivity.prizes}</td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No activities found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default WholeStudentProfile;
