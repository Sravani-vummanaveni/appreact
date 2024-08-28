import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ActivityFilter from './ActivityFilter';

const CocurricularActivitiewThree = ({ rollNoFilter }) => {
    const [activity, setActivity] = useState([]);
    const [showForm1, setShowForm1] = useState(false);
    const [showForm2, setShowForm2] = useState(false);
    const [activeButton, setActiveButton] = useState(null);
    const [newActivity, setNewActivity] = useState(null);
    const [rollNo, setRollNo] = useState(rollNoFilter || '');

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await axios.get('http://localhost:3001/activity');
                setActivity(response.data);
            } catch (error) {
                console.error('Error fetching Activity:', error);
            }
        };

        fetchActivity();
    }, [newActivity]);

    const filteredActivity = activity.filter(act => act.rno === rollNo);

    const toggleForm = (formNumber) => {
        if (formNumber === 1) {
            setShowForm1(true);
            setShowForm2(false);
            setActiveButton(1);
        } else if (formNumber === 2) {
            setShowForm1(false);
            setShowForm2(true);
            setActiveButton(2);
        }
    };

    const handleActivityAdded = (activity) => {
        setNewActivity(activity);
    };

    const handleRollNoChange = (e) => {
        setRollNo(e.target.value);
    };

    return (
        <div>
        

            <div className='container-fluid w-100'>
                <h5>Filter by Roll No:</h5>
                <input type="text" value={rollNo} onChange={handleRollNoChange} placeholder='Roll No' />
            </div>

            {filteredActivity.length > 0 ? (
                <div className='table-responsive py-5'>
                    <h2 className='py-3'>Student Activities</h2>
                    <table className="table table-striped w-100">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Roll No</th>
                                <th>Branch</th>
                                <th>Activity Name</th>
                                <th>Date of Activity</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredActivity.map((activity) => (
                                <tr key={activity.id}>
                                    <td>{activity.sname}</td>
                                    <td>{activity.rno}</td>
                                    <td>{activity.branch}</td>
                                    <td>{activity.aname}</td>
                                    <td>{activity.date}</td>
                                    <td>{activity.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No students found for Roll No: {rollNo}</p>
            )}
        </div>
    );
}

export default CocurricularActivitiewThree;
