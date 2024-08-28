// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ParentActivityTab from './ParentActivityTab';

// const Parent = () => {
//     const navigate = useNavigate();
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const userData = JSON.parse(localStorage.getItem("user"));
//         if (!userData || userData.role !== 'parent') {
//             navigate('/login'); // Redirect to login if no user data or wrong role
//         } else {
//             setUser(userData);
//         }
//     }, [navigate]);

//     const handleLogout = () => {
//         localStorage.removeItem("user"); // Clear user data on logout
//         navigate("/");
//     }

//     return (
//         <div>
//             {user && (
//                 <div className="alert alert-success text-center" role="alert">
//                     <div className='d-flex align-items-center justify-content-between'>
//                         <img src='https://cdn-icons-png.flaticon.com/512/6830/6830335.png' alt='parent' className='img-width'/>
//                         <h5>Welcome Parent</h5>
//                         <button className='btn btn-success' type='button' onClick={handleLogout}>Logout</button>
//                     </div>
//                 </div>
//             )}
//                         <ParentActivityTab/>

//         </div>
//     );
// }

// export default Parent;
