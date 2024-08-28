import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CocurricularList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchBatches, setSearchBatches] = useState('');

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async (batches = '') => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/activity/batch?batches=${batches}`);
      setActivities(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching activities');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchActivities(searchBatches);
  };

  return (
    <div className="container mt-5">
      <h4 className='text-center'>Student Activities Data</h4>
      
      <form onSubmit={handleSearch} className="mb-4">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Search by Batch"
          value={searchBatches}
          onChange={(e) => setSearchBatches(e.target.value)}
        />
        <button type="submit" className="btn btn-primary mt-2">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && activities.length === 0 && <p>No activities found.</p>}

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

export default CocurricularList;
