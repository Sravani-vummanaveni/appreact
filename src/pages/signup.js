import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = ({ onSignup = () => {} }) => {
    const [input, setInput] = useState({
        fname: "",
        lname: "",
        email: "",
        rollno: "",
        pwd: "",
        role: "student", // Default role
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
  

    const validateForm = () => {
        const newErrors = {};
        if (!input.fname) newErrors.fname = 'First Name is required';
        if (!input.lname) newErrors.lname = 'Last Name is required';
        if (!input.email) newErrors.email = 'Email is required';
        if (!input.rollno) newErrors.rollno = 'Roll Number/ID is required';
        if (!input.pwd) {
            newErrors.pwd = 'Password is required';
        } else {
            if (input.pwd.length < 8) newErrors.pwd = 'Password must be at least 8 characters';
            if (!/[A-Z]/.test(input.pwd)) newErrors.pwd = 'Password must contain at least one uppercase letter';
            if (!/[a-z]/.test(input.pwd)) newErrors.pwd = 'Password must contain at least one lowercase letter';
            if (!/[0-9]/.test(input.pwd)) newErrors.pwd = 'Password must contain at least one number';
            if (!/[!@#$%^&*]/.test(input.pwd)) newErrors.pwd = 'Password must contain at least one special character';
        }
        if (input.role === 'catagory') newErrors.role = 'Role is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        axios.post('http://localhost:5000/signup', input)
            .then(response => {
                console.log(response.data);
                setSubmitted(true);
                onSignup(response.data);
                setSubmitted(true);
                setInput('');
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <div className='page-height'>
            <div className='login-bg container-fluid d-flex justify-content-center align-items-center'>
                <div className="card border-0 container shadow-lg width-35">
                    <div className="card-body">
                        <div className='text-center'>
                            <img className="pt-3" src="https://images.collegedunia.com/public/college_data/images/logos/16860356593131894094954175992676362983714743865833242n.jpeg?h=71.17&w=71.17&mode=stretch" alt="Logo"/>
                        </div>
                        <form className="row g-3 py-5" onSubmit={handleSubmit}>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                <label htmlFor="validationDefault01" className="form-label"></label>
                                <input 
                                    name='fname' 
                                    value={input.fname} 
                                    onChange={(e) => setInput({...input, [e.target.name]: e.target.value})} 
                                    type="text" 
                                    className="form-control rounded-0" 
                                    id="validationDefault01" 
                                    placeholder='First Name' 
                                />
                                {errors.fname && <span style={{ color: 'red' }}>{errors.fname}</span>}
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                <label htmlFor="validationDefault02" className="form-label"></label>
                                <input 
                                    name='lname' 
                                    value={input.lname} 
                                    onChange={(e) => setInput({...input, [e.target.name]: e.target.value})} 
                                    type="text" 
                                    className="form-control rounded-0" 
                                    id="validationDefault02" 
                                    placeholder='Last Name'
                                />
                                {errors.lname && <span style={{ color: 'red' }}>{errors.lname}</span>}
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                <label htmlFor="validationDefault03" className="form-label"></label>
                                <input 
                                    name='email' 
                                    value={input.email} 
                                    onChange={(e) => setInput({...input, [e.target.name]: e.target.value})} 
                                    type="email" 
                                    className="form-control rounded-0" 
                                    id="validationDefault03" 
                                    placeholder='Email'
                                />
                                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                <label htmlFor="validationDefault04" className="form-label"></label>
                                <input 
                                    name='rollno' 
                                    value={input.rollno} 
                                    onChange={(e) => setInput({...input, [e.target.name]: e.target.value})} 
                                    type="text" 
                                    className="form-control rounded-0" 
                                    id="validationDefault04" 
                                    placeholder='Roll Number/ID'
                                />
                                {errors.rollno && <span style={{ color: 'red' }}>{errors.rollno}</span>}
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                <label htmlFor="validationDefault05" className="form-label"></label>
                                <input 
                                    name='pwd' 
                                    value={input.pwd} 
                                    onChange={(e) => setInput({...input, [e.target.name]: e.target.value})} 
                                    type="password" 
                                    className="form-control rounded-0" 
                                    id="validationDefault05" 
                                    placeholder='Password'
                                />
                                {errors.pwd && <span style={{ color: 'red' }}>{errors.pwd}</span>}
                            </div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                <label htmlFor="role" className="form-label"></label>
                                <select 
                                    name='role' 
                                    value={input.role} 
                                    onChange={(e) => setInput({...input, [e.target.name]: e.target.value})} 
                                    className="form-control rounded-0 form-select"   aria-label="Default select example"
                                    id="role">
                                    <option value='catagory'>Select Role</option>
                                    <option value="faculty">Faculty</option>
                                    <option value="hod">HOD</option>
                                    <option value="student">Student</option>
                                    <option value="parent">Parent</option>
                                    <option value="admin">Admin</option>
                                </select>
                                {errors.role && <span style={{ color: 'red' }}>{errors.role}</span>}
                            </div>
                            <div className="col-12 text-center pt-4">
                                <button className="btn btn-primary btn-text rounded-0 width-25" type="submit">Register</button>
                            </div>
                            {submitted && (
                                <div className="col-12">
                                    <div className="alert alert-success" role="alert">
                                        Registered successfully!
                                    </div>
                                </div>
                            )}
                            <div className='col-12 pt-3 text-center'>
                                <h6> <Link to="/">Login</Link> if you have already Registered!</h6>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
