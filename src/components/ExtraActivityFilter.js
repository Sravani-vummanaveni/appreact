import React, { useState } from 'react';
import axios from 'axios';

const ExtraActivityFilter = () => {
  const [eactivities, setEactivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchRollNo, setSearchRollNo] = useState('');

  const fetchEactivities = async (rollNo) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/eactivity/rollNo?rollNo=${rollNo}`);
      setEactivities(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching activities');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchRollNo) {
      fetchEactivities(searchRollNo);
      setError(null); // Clear previous errors
    } else {
      setError('Please enter a roll number');
      setEactivities([]); // Clear previous data if any
    }
  };

  return (
    <div className="container mt-5">
      <h4 className='text-center'>Student Activities Data</h4>
      
      <form onSubmit={handleSearch} className="mb-4">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Enter Roll Number"
          value={searchRollNo}
          onChange={(e) => setSearchRollNo(e.target.value)}
        />
        <button type="submit" className="btn btn-primary mt-2">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && eactivities.length === 0 && searchRollNo && <p>No activities found for this roll number.</p>}

      {!loading && eactivities.length > 0 && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Batch</th>
              <th>Activity Name</th>
              <th>Activity Group</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Competition Level</th>
              <th>Host</th>
              <th>Prizes</th>
            </tr>
          </thead>
          <tbody>
            {eactivities.map((eactivity, index) => (
              <tr key={index}>
                <td>{eactivity.rollNo}</td>
                <td>{eactivity.sname}</td>
                <td>{eactivity.batches}</td>
                <td>{eactivity.aname}</td>
                <td>{eactivity.agroup}</td>
                <td>{new Date(eactivity.fdate).toLocaleDateString()}</td>
                <td>{new Date(eactivity.tdate).toLocaleDateString()}</td>
                <td>{eactivity.competitionLevel}</td>
                <td>{eactivity.host}</td>
                <td>{eactivity.prizes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExtraActivityFilter;
