import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SingleStudentActivity = ({ rollNoFilter }) => {
    const [activity, setActivity] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [editedActivity, setEditedActivity] = useState({});

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
    }, []);

    const filteredActivity = activity.filter(actyivity => actyivity.rno === rollNoFilter);

    const handleEdit = (row) => {
        setEditingRow(row.id);
        setEditedActivity({ ...row });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedActivity(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async (id) => {
        try {
            await axios.put(`http://localhost:3001/activity/${id}`, editedActivity);
            setActivity(prev => prev.map(actyivity => (actyivity.id === id ? editedActivity : actyivity)));
            setEditingRow(null);
        } catch (error) {
            console.error('Error saving Activity:', error);
        }
    };

    const handleCancel = () => {
        setEditingRow(null);
        setEditedActivity({});
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/activity/${id}`);
            setActivity(prev => prev.filter(actyivity => actyivity.id !== id));
        } catch (error) {
            console.error('Error deleting Activity:', error);
        }
    };

    return (
        <div className=''>
            {filteredActivity.length > 0 ? (
                <div className='table-responsive py-5'>
                    <h2 className='py-3'>Student Activity</h2>
                    <table className="table table-striped w-100">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Roll No</th>
                                <th>Branch</th>
                                <th>Activity Name</th>
                                <th>Date of Activity</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredActivity.map((activity) => (
                                <tr key={activity.id}>
                                    {editingRow === activity.id ? (
                                        <>
                                            <td><input type="text" name="sname" value={editedActivity.sname} onChange={handleChange} /></td>
                                            <td>{activity.rno}</td>
                                            <td><input type="text" name="branch" value={editedActivity.branch} onChange={handleChange} /></td>
                                            <td><input type="text" name="aname" value={editedActivity.aname} onChange={handleChange} /></td>
                                            <td><input type="date" name="date" value={editedActivity.date} onChange={handleChange} /></td>
                                            <td><input type="text" name="description" value={editedActivity.description} onChange={handleChange} /></td>
                                            <td>
                                                <button onClick={() => handleSave(activity.id)}>Save</button>
                                                <button onClick={handleCancel}>Cancel</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{activity.sname}</td>
                                            <td>{activity.rno}</td>
                                            <td>{activity.branch}</td>
                                            <td>{activity.aname}</td>
                                            <td>{activity.date}</td>
                                            <td>{activity.description}</td>
                                            <td>
                                                <button onClick={() => handleEdit(activity)}>Edit</button>
                                                <button onClick={() => handleDelete(activity.id)}>Delete</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No students found for Roll No: {rollNoFilter}</p>
            )}
        </div>
    );
};

export default SingleStudentActivity;
