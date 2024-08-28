import React, { useState } from 'react';
import axios from 'axios';

const ActivityFilter = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchRollNo, setSearchRollNo] = useState('');

  const fetchActivities = async (rollNo) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/activity/rollNo?rollNo=${rollNo}`);
      setActivities(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching activities');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchRollNo) {
      fetchActivities(searchRollNo);
      setError(null); // Clear previous errors
    } else {
      setError('Please enter a roll number');
      setActivities([]); // Clear previous data if any
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
      {!loading && activities.length === 0 && searchRollNo && <p>No activities found for this roll number.</p>}

      {!loading && activities.length > 0 && (
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
            {activities.map((activity, index) => (
              <tr key={index}>
                <td>{activity.rollNo}</td>
                <td>{activity.sname}</td>
                <td>{activity.batches}</td>
                <td>{activity.aname}</td>
                <td>{activity.agroup}</td>
                <td>{new Date(activity.fdate).toLocaleDateString()}</td>
                <td>{new Date(activity.tdate).toLocaleDateString()}</td>
                <td>{activity.competitionLevel}</td>
                <td>{activity.host}</td>
                <td>{activity.prizes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ActivityFilter;
