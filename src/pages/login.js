import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: '', pwd: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!input.email) newErrors.email = 'Email is required';
    if (!input.pwd) newErrors.pwd = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      const response = await axios.post('http://localhost:5000/login', input);
      const { token, user } = response.data;
      
      // Store the token and user information
      login(user, token);
  
      // Redirect based on role
      switch (user.role) {
        case 'student':
          navigate('/student');
          break;
        case 'admin':
          navigate('/admin');
          break;
        case 'hod':
          navigate('/hod');
          break;
        case 'parent':
          navigate('/parent');
          break;
        case 'faculty':
          navigate('/faculty');
          break;
        default:
          navigate('/'); // Default redirect if no role matches
          break;

      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert(error.response?.data?.message || 'Wrong email id or password');
    }
  };
  

  return (
    <div className='page-height'>
      <div className='login-bg container-fluid d-flex justify-content-center align-items-center'>
        <div className="card border-0 container shadow-lg width-25">
          <div className="card-body">
            <div className='text-center'>
              <img 
                src="https://images.collegedunia.com/public/college_data/images/logos/16860356593131894094954175992676362983714743865833242n.jpeg?h=71.17&w=71.17&mode=stretch" 
                alt="Logo" 
              />
            </div>
            <div className="pt-4">
              <form className="row g-3" onSubmit={handleLogin}>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  <label htmlFor="validationDefault01" className="form-label"></label>
                  <input
                    name='email'
                    value={input.email}
                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                    type="text"
                    className="form-control rounded-0"
                    id="validationDefault01"
                    placeholder='Email'
                  />
                  {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  <label htmlFor="validationDefault02" className="form-label"></label>
                  <input
                    name='pwd'
                    value={input.pwd}
                    onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                    type="password"
                    className="form-control rounded-0"
                    id="validationDefault02"
                    placeholder='Password'
                  />
                  {errors.pwd && <span style={{ color: 'red' }}>{errors.pwd}</span>}
                </div>
                <div className="col-12 text-center pt-3">
                  <button className="btn btn-primary btn-text rounded-0 w-50" type="submit">Login</button>
                </div>
                <div className='col-12 text-center pt-3'>
                  <h6>Please <Link to="/signup">Signup</Link> if you don't have an Account</h6>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


//  import React, { useState } from 'react';
//  import { Link, useNavigate } from 'react-router-dom';
//  import axios from 'axios';

//  const Login = () => {
//    const navigate = useNavigate();
//    const [input, setInput] = useState({
//      email: "",
//      pwd: ""
//    });
//    const [errors, setErrors] = useState({});

//    const validateForm = () => {
//      const newErrors = {};
//      if (!input.email) newErrors.email = 'Email is required';
//      if (!input.pwd) newErrors.pwd = 'Password is required';

//      setErrors(newErrors);
//      return Object.keys(newErrors).length === 0;
//    };

//    const handleLogin = async (e) => {
//      e.preventDefault();
//      if (!validateForm()) {
//        return;
//      }
  
//      try {
//         Clear any previous session
//         localStorage.removeItem('user');
//         localStorage.removeItem('token');
//         sessionStorage.removeItem('user');
//         sessionStorage.removeItem('token');
      
//        const response = await axios.post('http:localhost:5000/login', input);
//        console.log(response.data);   Add this line to inspect the response
  
//        const { token, user } = response.data;
  
//         Save user data to sessionStorage
//        sessionStorage.setItem('user', JSON.stringify(user)); 
//        sessionStorage.setItem('token', token);
  
//         Navigate to the appropriate route based on role
//        switch (user.role) {
//          case "admin":
//            navigate('/admin');
//            break;
//          case "student":
//            navigate('/student');
//            break;
//          case "faculty":
//            navigate('/faculty');
//            break;
//          case "hod":
//            navigate('/hod');
//            break;
//          case "parent":
//            navigate('/parent');
//            break;
//          default:
//            alert("Unrecognized role");
//        }
//      }
//  catch (error) {
//        console.error('Error logging in:', error);
//        alert(error.response?.data?.message || "Wrong email id or password");
//      }
//    };
  
  
//    return (
//      <div className='page-height'>
//        <div className='login-bg container-fluid d-flex justify-content-center align-items-center'>
//          <div className="card border-0 container shadow-lg width-25">
//            <div className="card-body">
//              <div className='text-center'>
//                <img src="https:images.collegedunia.com/public/college_data/images/logos/16860356593131894094954175992676362983714743865833242n.jpeg?h=71.17&w=71.17&mode=stretch" alt="Logo" />
//              </div>
//              <div className="pt-4">
//                <form className="row g-3" onSubmit={handleLogin}>
//                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
//                    <label htmlFor="validationDefault01" className="form-label"></label>
//                    <input
//                      name='email'
//                      value={input.email}
//                      onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
//                      type="text"
//                      className="form-control rounded-0"
//                      id="validationDefault01"
//                      placeholder='Email'
//                    />
//                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
//                  </div>
//                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
//                    <label htmlFor="validationDefault02" className="form-label"></label>
//                    <input
//                      name='pwd'
//                      value={input.pwd}
//                      onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
//                      type="password"
//                      className="form-control rounded-0"
//                      id="validationDefault02"
//                      placeholder='Password'
//                    />
//                    {errors.pwd && <span style={{ color: 'red' }}>{errors.pwd}</span>}
//                  </div>
//                  <div className="col-12 text-center pt-3">
//                    <button className="btn btn-primary btn-text rounded-0 w-50" type="submit">Login</button>
//                  </div>
//                  <div className='col-12 text-center pt-3'>
//                    <h6>Please <Link to="/signup">Signup</Link> if you don't have an Account</h6>
//                  </div>
//                </form>
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>
//    );
//  }

//  export default Login;
