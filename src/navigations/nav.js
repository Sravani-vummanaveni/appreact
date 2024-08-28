import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from '../pages/login';
import Signup from '../pages/signup';
import Admin from '../components/admin';
import Student from '../components/student';
import Faculty from '../components/faculty';
import Hod from '../components/hod';
import Parent from '../components/parent';
import PrivateRoute from '../components/PrivateRoute';
import SingleStudent from '../components/SingleStudent';
import CoCurricularList from '../components/CocurricularList';
import DocumentUploadForm from '../components/DocumentUploadForm';
import FilterDocument from '../components/FilterDocuments';
import FilterStudentMarks from '../components/FilterStudentMarks';
import DisplayStudentList from '../components/DisplayStudentList';
import EactivitiesList from '../components/EactivitiesList';
const Nav = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
       
        <Route
          path="/admin"
          element={<PrivateRoute element={Admin} roles={['admin']} />}
        />
        <Route
          path="/student"
          element={<PrivateRoute element={Student} roles={['student']} />}
        />
        <Route
          path="/faculty"
          element={<PrivateRoute element={Faculty} roles={['faculty']} />}
        />
        <Route
          path="/hod"
          element={<PrivateRoute element={Hod} roles={['hod']} />}
        />
        <Route
          path="/parent"
          element={<PrivateRoute element={Parent} roles={['parent']} />}
        />
         <Route path="/upload-documents" element={<DocumentUploadForm />} />
          <Route path="/view-documents" element={<FilterDocument />} />
          <Route path='/student-profile' element={<DisplayStudentList />} />
          <Route path='/single-student-profile' element={<SingleStudent />} />
          <Route path='/cocurricular-activities-list' element={<CoCurricularList />} />
          <Route path='/view-marks' element={<FilterStudentMarks />} />
          <Route path="/admin-form" element={<Admin />} />
          <Route path="/student-details" element={<Student />} />
          <Route path='/list' element={<EactivitiesList />} />
      </Routes>
    </AuthProvider>
  );
};

export default Nav;




// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from '../context/AuthContext';
// import Login from '../pages/login';
// import Signup from '../pages/signup';
// import Student from '../components/student';
// import Admin from '../components/admin';
// import Hod from '../components/hod';
// import Parent from '../components/parent';
// import Faculty from '../components/faculty';
// import StudentProfile from '../components/StudentProfile';
// import SingleStudent from '../components/SingleStudent';
// import CoCurricularList from '../components/CocurricularList';
// import DocumentUploadForm from '../components/DocumentUploadForm';
// import FilterDocument from '../components/FilterDocuments';
// import FilterStudentMarks from '../components/FilterStudentMarks';
// import DisplayStudentList from '../components/DisplayStudentList';
// import EactivitiesList from '../components/EactivitiesList';
// import PrivateRoute from '../components/PrivateRoute';

// const Nav = () => {
//   return (
//     <AuthProvider>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <PrivateRoute path="/admin" element={<Admin />} roles={['admin']} />
//           <PrivateRoute path="/student" element={<Student />} roles={['student']} />
//           <PrivateRoute path="/faculty" element={<Faculty />} roles={['faculty']} />
//           <PrivateRoute path="/hod" element={<Hod />} roles={['hod']} />
//           <PrivateRoute path="/parent" element={<Parent />} roles={['parent']} />
//           <Route path="/" element={<Login />} />
//           <Route path="/upload-documents" element={<DocumentUploadForm />} />
//           <Route path="/view-documents" element={<FilterDocument />} />
//           <Route path='/student-profile' element={<DisplayStudentList />} />
//           <Route path='/single-student-profile' element={<SingleStudent />} />
//           <Route path='/cocurricular-activities-list' element={<CoCurricularList />} />
//           <Route path='/view-marks' element={<FilterStudentMarks />} />
//           <Route path="/admin-form" element={<Admin />} />
//           <Route path="/student-details" element={<Student />} />
//           <Route path='/list' element={<EactivitiesList />} />
//         </Routes>
//     </AuthProvider>
//   );
// }

// export default Nav;
