import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PDFDocument, rgb } from 'pdf-lib';

const DocumentUploadForm = () => {
  const [title, setTitle] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [file, setFile] = useState(null);
  const [allFiles, setAllFiles] = useState([]);
  const [filterRollNo, setFilterRollNo] = useState('');

  useEffect(() => {
    getPdf();
  }, []);

  const showPdf = (pdf) => {
    window.open(`http://localhost:5000/files/${pdf}`, '_blank', 'noreferrer');
  };

  const getPdf = async () => {
    try {
      const result = await axios.get("http://localhost:5000/get-files", {
        params: { rollNo: filterRollNo }
      });
      console.log(result.data.data);
      setAllFiles(result.data.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const editPdf = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    firstPage.drawText('Edited using pdf-lib!', {
      x: 50,
      y: height - 50,
      size: 30,
      color: rgb(0.95, 0.1, 0.1),
    });

    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
  };

  const submitFile = async (e) => {
    e.preventDefault();
    const editedFile = await editPdf(file);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('rollNo', rollNo);
    formData.append('file', editedFile);

    try {
      const result = await axios.post('http://localhost:5000/upload-files', formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log(result.data);
      setTitle('');
      setRollNo('');
      setFile(null);
      getPdf();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className='container'>
      <h2 className='text-center pt-3'>Upload Document</h2>
      <form onSubmit={submitFile} className='row pt-3'>
        <div className='col-md-4'>
          <input
            type='text'
            className='form-control'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className='col-md-4'>
          <input
            type='text'
            className='form-control'
            placeholder='Roll Number'
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            required
          />
        </div>
        <div className='col-md-4'>
          <input
            type='file'
            className='form-control'
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <div className='pt-5 text-center'>
          <button className='btn btn-primary rounded-0 width-25'>Submit</button>
        </div>
      </form>
      <div className='container-fluid pt-5'>
        <h3 className='text-center'>Uploaded Pdf Files</h3>
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
            <p>No files uploaded yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadForm;
