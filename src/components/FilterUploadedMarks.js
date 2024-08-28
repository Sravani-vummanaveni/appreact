import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilterUploadedMarks = () => {
  const [data, setData] = useState([]);
  const [rollNo, setRollNo] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/students`);
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data. Please try again.');
      }
    };
    fetchData();
  }, []);

  const handleFilter = () => {
    const filtered = data.filter(student => student.rollNo === rollNo);
    setFilteredData(filtered);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          placeholder="Enter Roll No"
        />
        <button onClick={handleFilter}>Filter</button>
      </div>
      {filteredData.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(filteredData[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((val, idx) => (
                  <td key={idx}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FilterUploadedMarks;
