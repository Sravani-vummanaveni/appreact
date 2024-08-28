import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentForm = ({ onStudentAdded = () => {} }) =>  {
  const [finame, setFirstname] = useState('');
  const [laname, setLastname] = useState('');
  const [faname, setFathername] = useState('');
  const [rno, setRollno] = useState('');
  const [mno, setMobileno] = useState('');
  const [dob, setDateofbirth] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [document, setDocument] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [students, setStudents] = useState([]);

  const validateForm = () => {
    const newErrors = {};
    if (!finame) newErrors.finame = 'First name is required';
    if (!laname) newErrors.laname = 'Last name is required';
    if (!faname) newErrors.faname = 'Father name is required';
    if (!rno) newErrors.rno = 'Roll number is required';
    if (!mno) newErrors.mno = 'Mobile number is required';
    if (!email) newErrors.email = 'Email is required';
    if (!dob) newErrors.dob = 'Date of birth is required';
    if (!address) newErrors.address = 'Address is required';
    if (!document) newErrors.document = 'Document is required';

    if (mno && !/^\d{10}$/.test(mno)) newErrors.mno = 'Mobile number must be 10 digits';
    if (email && !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setSubmitted(false);
      return;
    }

    const newStudent = { finame, laname, faname, rno, mno, email, dob, address, document };

    try {
      const response = await axios.post('http://localhost:3001/student', newStudent);
      onStudentAdded(response.data);
      setFirstname('');
      setLastname('');
      setFathername('');
      setRollno('');
      setMobileno('');
      setDateofbirth('');
      setAddress('');
      setEmail('');
      setDocument('');
      setSubmitted(true);
    } catch (error) {
      console.error('Error adding student:', error);
      setSubmitted(false);
    }
  };

  return (
    <div className='w-50'>
      <h5>Enter Student Details</h5>
      <form className='row' onSubmit={handleSubmit}>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
          <label htmlFor="validationDefault01" className="form-label"></label>
          <input
            type="text"
            className="form-control rounded-0"
            id="validationDefault01"
            placeholder='First Name'
            value={finame}
            onChange={(e) => setFirstname(e.target.value)}
          />
          {errors.finame && <span style={{ color: 'red' }}>{errors.finame}</span>}
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
          <label htmlFor="validationDefault02" className="form-label"></label>
          <input
            type="text"
            className="form-control rounded-0"
            id="validationDefault02"
            placeholder='Last Name'
            value={laname}
            onChange={(e) => setLastname(e.target.value)}
          />
          {errors.laname && <span style={{ color: 'red' }}>{errors.laname}</span>}
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
          <label htmlFor="validationDefault05" className="form-label"></label>
          <input
            type="text"
            className="form-control rounded-0"
            id="validationDefault05"
            placeholder='Father Name'
            value={faname}
            onChange={(e) => setFathername(e.target.value)}
          />
          {errors.faname && <span style={{ color: 'red' }}>{errors.faname}</span>}
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
          <label htmlFor="validationDefault03" className="form-label"></label>
          <input
            type="text"
            className="form-control rounded-0"
            id="validationDefault03"
            placeholder='Roll No'
            value={rno}
            onChange={(e) => setRollno(e.target.value)}
          />
          {errors.rno && <span style={{ color: 'red' }}>{errors.rno}</span>}
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
          <label htmlFor="validationDefault04" className="form-label"></label>
          <input
            type="number"
            className="form-control rounded-0"
            id="validationDefault04"
            placeholder='Mobile Number'
            value={mno}
            onChange={(e) => setMobileno(e.target.value)}
          />
          {errors.mno && <span style={{ color: 'red' }}>{errors.mno}</span>}
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
          <label htmlFor="validationDefault07" className="form-label"></label>
          <input
            type="email"
            className="form-control rounded-0"
            id="validationDefault07"
            placeholder='Email Id'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
          <label htmlFor="validationDefault06" className="form-label"></label>
          <input
            type="date"
            className="form-control rounded-0"
            id="validationDefault06"
            placeholder='Date of Birth'
            value={dob}
            onChange={(e) => setDateofbirth(e.target.value)}
          />
          {errors.dob && <span style={{ color: 'red' }}>{errors.dob}</span>}
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
          <label htmlFor="role" className="form-label"></label>
          <select
            name='role'
            className="form-control rounded-0"
            id="role"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.document && <span style={{ color: 'red' }}>{errors.document}</span>}
        </div>
        <div className="col-12 col-sm-6 col-md-12 col-lg-12">
          <label htmlFor="exampleFormControlTextarea1" className="form-label"></label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="5"
            placeholder='Residential Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
          {errors.address && <span style={{ color: 'red' }}>{errors.address}</span>}
        </div>
        
        <div className="col-12 text-center pt-4">
          <button className="btn btn-primary btn-text rounded-0 width-25" type="submit">Submit</button>
        </div>
        {submitted && (
          <div className="col-12 pt-3">
            <div className="alert alert-success" role="alert">
              Details Submitted successfully!
            </div>
          </div>
        )}
      </form>
      {/* <div className='pt-3'><Link to="/upload-documents">Upload Student Documents</Link></div> */}
      {/* <DocumentUploadForm /> */}
      {/* <DocumentList/> */}
    </div>
  );
}

export default StudentForm;
