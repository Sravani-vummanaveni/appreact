import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PasTab from './ParentAndStudentsTabs';

const Student = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <div className="col-12">
        <div className="alert alert-success text-center" role="alert">
          <div className='d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center justify-content-between'>
              <img src='https://cdn-icons-png.flaticon.com/512/6830/6830335.png' alt='Student' className='img-width' />
            </div>
            <h5>Welcome {user?.fname} {user?.lname}!</h5>
            <button className='btn btn-success' type='button' onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
      <PasTab role={user?.role}/>
    </div>
  );
};

export default Student;
