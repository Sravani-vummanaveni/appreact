import React, { useState } from 'react';
import axios from 'axios';
import DisplayMarksTwo from './DisplayMarksTwo';

const FilterStudentMarksTwo = () => {
    const [searchRollNo, setSearchRollNo] = useState('');
    const [searchedStudent, setSearchedStudent] = useState(null);
    const [error, setError] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent the form from submitting and refreshing the page

        if (!searchRollNo.trim()) {
            setError('Roll number is required.');
            return;
        }

        try {
            const { data } = await axios.get(`http://localhost:5000/marks/${searchRollNo}`);
            if (data.length > 0) {
                const details = {
                    ...data[0],
                    marks: data,
                };
                setSearchedStudent(details);
                setError('');
            } else {
                setSearchedStudent(null);
                setError('No data found for the given roll number.');
            }
        } catch (err) {
            console.error('Error searching marks:', err);
            setError('An error occurred while fetching data.');
        }
    };

    return (
        <div className='container'>
            <div className='row pt-5'>
                <h2 className="mb-4">View Your Marks</h2>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                    <form className="d-flex gap-2 mb-3" onSubmit={handleSearch}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Search by Roll No'
                            value={searchRollNo}
                            onChange={(e) => setSearchRollNo(e.target.value)}
                            required
                        />
                        <button className='btn btn-primary' type="submit">Search</button>
                    </form>
                    {error && <p className="p-3 mb-2 bg-danger text-white">{error}</p>}
                </div>
                <div className='col-md-3'></div>
            </div>
            {searchedStudent && <DisplayMarksTwo studentDetails={searchedStudent} />}
        </div>
    );
};

export default FilterStudentMarksTwo;
