import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

function StudentMarks() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSuccessMessage(''); // Clear success message when selecting a new file
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file!');
      return;
    }

    setLoading(true); // Show loading message

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

      const rollNoIndex = 0;
      const nameIndex = 1;
      const batchIndex = 2;
      const branchIndex = 3;
      const sgpaIndex = worksheet[0].length - 2;
      const semIndex = worksheet[0].length - 1;

      const subjectCodes = worksheet[0].slice(4, sgpaIndex);

      const rows = worksheet.slice(1);

      const gradesData = rows.map((row) => {
        const rollNo = row[rollNoIndex];
        const sname = row[nameIndex];
        const batch = row[batchIndex];
        const branch = row[branchIndex];
        const sgpa = row[sgpaIndex];
        const semester = row[semIndex];
        const subjects = {};

        subjectCodes.forEach((subject, index) => {
          subjects[subject] = row[index + 4];
        });

        return { rollNo, sname, batch, branch, subjects, sgpa, semester };
      });

      // Send data to backend
      axios.post('http://localhost:5000/upload-grades', { gradesData })
        .then(response => {
          console.log('Grades uploaded:', response.data);
          setSuccessMessage('File successfully uploaded!');
        })
        .catch(error => {
          console.error('Error uploading grades:', error);
          alert('Failed to upload file. Please try again.');
        })
        .finally(() => {
          setLoading(false); // Hide loading message after upload process is complete
        });
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="row">
      <div className='col-md-3'></div>
      <div className='col-md-6'>
        <h4 className='text-center'>Upload File</h4>
        <div className='d-flex gap-2'>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className='form-control' />
          <button onClick={handleUpload} className='btn btn-primary' disabled={loading}>
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        {successMessage && <p className="text-success mt-2">{successMessage}</p>}
      </div>
      <div className='col-md-3'></div>
    </div>
  );
}

export default StudentMarks;
