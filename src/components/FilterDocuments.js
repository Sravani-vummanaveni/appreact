import React, { useState } from 'react';
import axios from 'axios';

const FilterDocuments = () => {
  const [allFiles, setAllFiles] = useState([]);
  const [filterRollNo, setFilterRollNo] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  // Function to fetch files based on roll number
  const getFiles = async () => {
    if (!filterRollNo) {
      // Do not fetch if filterRollNo is empty
      return;
    }

    try {
      const result = await axios.get(`${apiUrl}/get-files`, {
        params: { rollNo: filterRollNo }
      });
      console.log(result.data.data);
      setAllFiles(result.data.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const showPdf = (pdf) => {
    window.open(`${apiUrl}/files/${pdf}`, '_blank', 'noreferrer');
  };

  return (
    <div className='container'>
      <h2 className='text-center pt-3'>View Document</h2>
      <div className='pt-3'>
        <input
          type='text'
          className='form-control'
          placeholder='Enter Roll Number'
          value={filterRollNo}
          onChange={(e) => setFilterRollNo(e.target.value)}
        />
        <button className='btn btn-primary mt-2' onClick={getFiles}>Filter</button>
      </div>
      <div className='container-fluid pt-5'>
        <div className='d-flex gap-3 align-items-center justify-content-center pt-5'>
          {allFiles.length > 0 ? (
            allFiles.map((data) => (
              <div key={data._id}>
                <button className='btn btn-secondary' onClick={() => showPdf(data.pdf)}>
                  {data.title} - {data.rollNo}
                </button>
              </div>
            ))
          ) : (
            filterRollNo && <p>No files uploaded for this roll number</p> // Show message only if a roll number is entered
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterDocuments;
