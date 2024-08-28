import React from 'react';
import { useNavigate } from 'react-router-dom';
import AllTabs from './AllTabs'
const Faculty = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("loggedin");
        navigate("/")
    }
    const userRole = 'faculty'; // or 'admin' based on the logged-in user
    const user = JSON.parse(localStorage.getItem("user")) || {};
    console.log('User Data:', user); // Debugging statement

  const userName = user.fname && user.lname ? `${user.fname} ${user.lname}` : 'User';
    return (
        <div>
             <div className="alert alert-success text-center" role="alert">
                    <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center justify-content-between'>
                    <img src='https://cdn-icons-png.flaticon.com/512/6830/6830335.png' alt='admin' className='img-width'/>
                    {/* <h5>{userName}</h5> */}
                    </div>
                    <h5>Welcome Faculty!</h5>
                    <button className='btn btn-success' type='button' onClick={handleLogout}>Logout</button>
                    </div>
                   
                </div>
                <AllTabs />
        </div>
    );
}

export default Faculty;