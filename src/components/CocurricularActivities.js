// import React, { useState } from 'react';
// import axios from 'axios';
// import CocurricularTabs from './CocurricularTabs';

// const CocurricularActivities = ({ onActivityAdded = () => {} }) => {
//   const [sname, setStudentname] = useState('');
//   const [rno, setRollno] = useState('');
//   const [branch, setBranch] = useState('');
//   const [aname, setActivities] = useState('');
//   const [date, setDate] = useState('');
//   const [year, setYear] = useState('');
//   const [description, setDescription] = useState('');
//   const [host, setHost] = useState('');
//   const [submitted, setSubmitted] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [studentActivities, setStudentActivities] = useState([]);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!sname) newErrors.sname = 'Student name is required';
//     if (!rno) newErrors.rno = 'Roll number is required';
//     if (!branch) newErrors.branch = 'Branch is required';
//     if (!aname) newErrors.aname = 'Activity name is required';
//     if (!date) newErrors.date = 'Date is required';
//     if (!year) newErrors.year = 'Academic Year is required';
//     if (!description) newErrors.description = 'Description is required';
//     if (!host) newErrors.host = 'Host Name is required';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
//   const apiUrl = process.env.REACT_APP_API_URL;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitted(false);

//     if (!validateForm()) {
//       return;
//     }

//     const myActivity = { sname, rno, branch, aname, date, year, description, host };

//     try {
//       const response = await axios.post(`http://localhost:5000/activity`, myActivity, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       onActivityAdded(response.data);
//       setSubmitted(true);
//       // Clear form fields
//       setStudentname('');
//       setRollno('');
//       setBranch('');
//       setActivities('');
//       setDate('');
//       setYear('');
//       setDescription('');
//       setHost('');
//     } catch (error) {
//       console.error('Error adding activity:', error.message);
//       setSubmitted(false);
//     }
//   };

//   const fetchStudentActivities = async (rollNo) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/activity?rollNo=${rollNo}`);
//       setStudentActivities(response.data);
//     } catch (error) {
//       console.error('Error fetching student activities:', error.message);
//     }
//   };

//   return (
//     <div>
//       <div className='container width-35'>
//         <h5>Enter Activities</h5>
//         <form className='row' onSubmit={handleSubmit}>
//           <div className="col-12 col-sm-6 col-md-6 col-lg-6">
//             <label className="form-label"></label>
//             <input
//               type="text"
//               className="form-control rounded-0"
//               placeholder='Student Name'
//               value={sname}
//               onChange={(e) => setStudentname(e.target.value)}
//             />
//             {errors.sname && <span style={{ color: 'red' }}>{errors.sname}</span>}
//           </div>
//           <div className="col-12 col-sm-6 col-md-6 col-lg-6">
//             <label className="form-label"></label>
//             <input
//               type="text"
//               className="form-control rounded-0"
//               placeholder='Roll No'
//               value={rno}
//               onChange={(e) => setRollno(e.target.value)}
//             />
//             {errors.rno && <span style={{ color: 'red' }}>{errors.rno}</span>}
//           </div>
//           <div className="col-12 col-sm-6 col-md-6 col-lg-6">
//             <label className="form-label"></label>
//             <input
//               type="text"
//               className="form-control rounded-0"
//               placeholder='Branch'
//               value={branch}
//               onChange={(e) => setBranch(e.target.value)}
//             />
//             {errors.branch && <span style={{ color: 'red' }}>{errors.branch}</span>}
//           </div>
//           <div className="col-12 col-sm-6 col-md-6 col-lg-6">
//             <label className="form-label"></label>
//             <select className="form-control mb-3 form-select" value={aname}
//               onChange={(e) => setActivities(e.target.value)}>
//               <option value="">Activity Name</option>
//               <option value="Technical Workshops and Seminars">Technical Workshops and Seminars</option>
//               <option value="Hackathons and Coding Competitions">Hackathons and Coding Competitions</option>
//               <option value="Robotics Club">Robotics Club</option>
//               <option value="Engineering Design Competitions">Engineering Design Competitions</option>
//               <option value="Technical Paper Presentations">Technical Paper Presentations</option>
//               <option value="Project Exhibitions">Project Exhibitions</option>
//               <option value="None">None</option>
//             </select>
//             {errors.aname && <span style={{ color: 'red' }}>{errors.aname}</span>}
//           </div>
//           <div className="col-12 col-sm-6 col-md-6 col-lg-6">
//             <label className="form-label"></label>
//             <input
//               type="date"
//               className="form-control rounded-0"
//               placeholder='Date of event'
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />
//             {errors.date && <span style={{ color: 'red' }}>{errors.date}</span>}
//           </div>
//           <div className="col-12 col-sm-6 col-md-6 col-lg-6">
//             <label className="form-label"></label>
//             <select className="form-control mb-3 form-select" value={year}
//               onChange={(e) => setYear(e.target.value)}>
//               <option value="">Academic Year</option>
//               <option value="2024 July-2025 June">2024 July-2025 June</option>
//               <option value="2025 July-2026 June">2025 July-2026 June</option>
//               <option value="2026 July-2027 June">2026 July-2027 June</option>
//               <option value="2027 July-2028 June">2027 July-2028 June</option>
//               <option value="2028 July-2029 June">2028 July-2029 June</option>
//               <option value="2029 July-2030 June">2029 July-2030 June</option>
//               <option value="2030 July-2031 June">2030 July-2031 June</option>
//             </select>
//             {errors.year && <span style={{ color: 'red' }}>{errors.year}</span>}
//           </div>
//           <div className="col-12 col-sm-6 col-md-6 col-lg-6">
//             <label className="form-label"></label>
//             <input
//               type="text"
//               className="form-control rounded-0"
//               placeholder='Description'
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//             {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
//           </div>
//           <div className="col-12 col-sm-6 col-md-6 col-lg-6">
//             <label className="form-label"></label>
//             <input
//               type="text"
//               className="form-control rounded-0"
//               placeholder='Hosted By'
//               value={host}
//               onChange={(e) => setHost(e.target.value)}
//             />
//             {errors.host && <span style={{ color: 'red' }}>{errors.host}</span>}
//           </div>
//           <div className="col-12 text-center pt-4">
//             <button className="btn btn-primary btn-text rounded-0 width-25" type="submit">
//               Submit
//             </button>
//           </div>
//         </form>
//         {submitted && (
//           <div className="col-12 pt-3">
//             <div className="alert alert-success" role="alert">
//               Details Submitted successfully!
//             </div>
//           </div>
//         )}
//       </div>
//       <CocurricularTabs />
//     </div>
//   );
// };

// export default CocurricularActivities;



import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { useDropzone } from 'react-dropzone';
import CocurricularTabs from './CocurricularTabs';

const CocurricularActivities = ({ onActivityAdded = () => {} }) => {
  const [excelData, setExcelData] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [studentActivities, setStudentActivities] = useState([]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.xlsx, .xls',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);

    if (!excelData) {
      setErrors({ excel: 'Please upload an Excel file' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/upload-activity', { activityData: excelData }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      onActivityAdded(response.data);
      setSubmitted(true);
      setExcelData(null);
    } catch (error) {
      console.error('Error uploading activity data:', error.message);
      setSubmitted(false);
    }
  };

  const fetchStudentActivities = async (rollNo) => {
    try {
      const response = await axios.get(`http://localhost:5000/activity?rollNo=${rollNo}`);
      setStudentActivities(response.data);
    } catch (error) {
      console.error('Error fetching student activities:', error.message);
    }
  };

  return (
    <div>
      <div className='container width-35'>
        <h5>Upload Activities Excel</h5>
        <form className='row' onSubmit={handleSubmit}>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop an Excel file here, or click to select one</p>
          </div>
          {errors.excel && <span style={{ color: 'red' }}>{errors.excel}</span>}
          
          <div className="col-12 text-center pt-4">
            <button className="btn btn-primary btn-text rounded-0 width-25" type="submit">
              Submit
            </button>
          </div>
        </form>
        {submitted && (
          <div className="col-12 pt-3">
            <div className="alert alert-success" role="alert">
              Data Uploaded successfully!
            </div>
          </div>
        )}
      </div>
      <CocurricularTabs/>
    </div>
  );
};

export default CocurricularActivities;
