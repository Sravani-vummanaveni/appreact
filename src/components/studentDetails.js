import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentDetails = ({ role, studentExtra }) => {
  const [gitLink, setGitLink] = useState('');
  const [image, setImage] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [rollNo, setRollNo] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleGitLinkChange = (e) => setGitLink(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handleCertificateChange = (e) => setCertificate(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('githubLink', gitLink);
    formData.append('profilePicture', image);
    formData.append('certificate', certificate);

    try {
      const response = await axios.put(`http://localhost:5000/student-extra/${rollNo}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Details successfully submitted!');
      console.log('Student extra details saved successfully:', response.data);
    } catch (error) {
      console.error('Failed to update student extra details:', error.message);
      setSuccessMessage('Failed to submit details. Please try again.');
    }
  };

  return (
    <div>
      {role === 'student' && (
        <form onSubmit={handleSubmit}>
          <div className="row text-center">
            <div className="form-group col-md-3">
              <input
                type="text"
                className="form-control"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="Enter Roll Number"
                required
              />
              <label>Roll Number</label>
            </div>

            <div className="form-group col-md-3">
              <input
                type="url"
                className="form-control"
                value={gitLink}
                onChange={handleGitLinkChange}
                placeholder="Provide your GitHub link"
              />
              <label>GitHub Link</label>
            </div>

            <div className="form-group col-md-3">
              <input
                type="file"
                className="form-control"
                onChange={handleImageChange}
              />
              <label>Upload Image</label>
            </div>

            <div className="form-group col-md-3">
              <input
                type="file"
                className="form-control"
                onChange={handleCertificateChange}
              />
              <label>Upload Certificate</label>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-4 pt-3">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            <div className="col-md-4"></div>

          </div>
        </form>
      )}

      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      {(role === 'admin' || role === 'student') && (
        <div className="pt-5">
          {studentExtra?.githubLink && (
            <p>
              <strong>GitHub Link:</strong> <a href={studentExtra.githubLink} target="_blank" rel="noopener noreferrer">{studentExtra.githubLink}</a>
            </p>
          )}
          {studentExtra?.profilePicture && (
            <div>
              <strong>Image:</strong>
              <img
                src={`http://localhost:5000/${studentExtra.profilePicture.replace(/\\/g, '/')}`}
                alt="Profile"
               className='circle-img'
              />
            </div>
          )}
          {studentExtra?.certificate && (
            <div>
              <strong>Certificate:</strong> 
              <a
                href={`http://localhost:5000/${studentExtra.certificate.replace(/\\/g, '/')}`}
                download
                className="d-flex align-items-center"
              >
                <i className="fas fa-download fa-2x me-2"></i>
                Download Certificate
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
