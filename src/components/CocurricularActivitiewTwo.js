import React, { useState } from 'react';
import axios from 'axios';
import CocurricularTabsTwo from './CocurricularTabsTwo';

const CocurricularActivitiewTwo = ({ onActivityAdded }) => {
  const [sname, setStudentname] = useState('');
  const [rno, setRollno] = useState('');
  const [branch, setBranch] = useState('');
  const [aname, setActivities] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!sname) newErrors.sname = 'Student name is required';
    if (!rno) newErrors.rno = 'Roll number is required';
    if (!branch) newErrors.branch = 'Branch is required';
    if (!aname) newErrors.aname = 'Activity name is required';
    if (!date) newErrors.date = 'Date is required';
    if (!description) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setSubmitted(false);
      return;
    }

    const myActivity = { sname, rno, branch, aname, date, description };

    try {
      const response = await axios.post('http://localhost:3001/activity', myActivity, {
        headers: {
          'Content-Type': 'multipart/newStudent'
        }
      });
      onActivityAdded(response.data);
      setStudentname('');
      setRollno('');
      setBranch('');
      setActivities('');
      setDate('');
      setDescription('');
      setSubmitted(true);
    } catch (error) {
      console.error('Error adding activity:', error);
      setSubmitted(false);
    }
  };

  return (
    <div>
    <div className='container width-35'>
      <h5>Enter Activities</h5>
      <form className='row' onSubmit={handleSubmit}>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
          <label htmlFor="validationDefault01" className="form-label"></label>
          <input
            type="text"
            className="form-control rounded-0"
            id="validationDefault01"
            placeholder='Student Name'
            value={sname}
            onChange={(e) => setStudentname(e.target.value)}
          />
          {errors.sname && <span style={{ color: 'red' }}>{errors.sname}</span>}
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
            type="text"
            className="form-control rounded-0"
            id="validationDefault04"
            placeholder='Branch'
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          />
          {errors.branch && <span style={{ color: 'red' }}>{errors.branch}</span>}
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
          <label htmlFor="validationDefault07" className="form-label"></label>
          <input
            type="text"
            className="form-control rounded-0"
            id="validationDefault07"
            placeholder='Activity Name'
            value={aname}
            onChange={(e) => setActivities(e.target.value)}
          />
          {errors.aname && <span style={{ color: 'red' }}>{errors.aname}</span>}
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
          <label htmlFor="validationDefault06" className="form-label"></label>
          <input
            type="date"
            className="form-control rounded-0"
            id="validationDefault06"
            placeholder='Date of event'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {errors.date && <span style={{ color: 'red' }}>{errors.date}</span>}
        </div>
        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
          <label htmlFor="validationDefault05" className="form-label"></label>
          <input
            type="text"
            className="form-control rounded-0"
            id="validationDefault05"
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
        </div>

        {submitted && (
          <div className="col-12">
            <div className="alert alert-success" role="alert">
              Details Submitted successfully!
            </div>
          </div>
        )}
        <div className="col-12 text-center pt-4">
          <button className="btn btn-primary btn-text rounded-0 width-25" type="submit">
            Submit
          </button>
        </div>
      </form>
      <div>
      </div>
    </div>
      <CocurricularTabsTwo />
      </div>
  );
}

export default CocurricularActivitiewTwo;
