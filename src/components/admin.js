import React from 'react';
import { useAuth } from '../context/AuthContext';
import AllTabs from './AllTabs';
import StudentDetails from './studentDetails'

const Admin = () => {
  const { logout } = useAuth();
  const userRole = 'admin'; // or 'admin' based on the logged-in user

  return (
    <div>
      <div className="col-12">
        <div className="alert alert-success text-center" role="alert">
          <div className='d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center justify-content-between'>
              <img src='https://cdn-icons-png.flaticon.com/512/6830/6830335.png' alt='admin' className='img-width' />
            </div>
            <h5>Welcome Admin!</h5>
            <button className='btn btn-success' type='button' onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
      {/* <StudentDetails role={userRole} /> */}

    <AllTabs role={userRole}/>

    </div>
  );
};

export default Admin;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import CocurricularActivities from './CocurricularActivities';

// import AllTabs from './AllTabs';
// const Admin = () => {
//     const navigate = useNavigate();
//     const handleLogout = () => {
//         localStorage.removeItem('user');
//         localStorage.removeItem('token');
//         navigate('/'); // Redirect to login or homepage after logout
//       };
//     const userRole = 'admin'; // or 'admin' based on the logged-in user
//     const user = JSON.parse(localStorage.getItem("user")) || {};
//     console.log('User Data:', user); // Debugging statement

//   const userName = user.fname && user.lname ? `${user.fname} ${user.lname}` : 'User';

//     return (
//         <div>
//             <div className="col-12">
//                 <div className="alert alert-success text-center" role="alert">
//                 <div className='d-flex align-items-center justify-content-between'>
//                    <div className='d-flex align-items-center justify-content-between'>
//                     <img src='https://cdn-icons-png.flaticon.com/512/6830/6830335.png' alt='admin' className='img-width'/>
//                     {/* <h5>{userName}</h5> */}
//                     </div>
//                     <h5>Welcome Admin!</h5>
//                     <button className='btn btn-success' type='button' onClick={handleLogout}>Logout</button>

//                     </div>
//                 </div>
//                 <AllTabs role={userRole}/>
                
//             </div> 
//         </div>
//     );
// }

// export default Admin;