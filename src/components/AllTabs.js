import React, { useState } from 'react';
import StudentForm from './StudentForm';
import AcadamicsProfile from './AcadamicsProfile';
import CocurricularActivities from './CocurricularActivities';
import EnterMarks from './EnterMarks';
import FilterStudentMarks from './FilterStudentMarks';
import WholeStudentProfile from './WholeStudentProfile';
import UploadStudentDetails from './UploadStudentDetails';
import ExtraCuricullarActivities from './ExtraCuricullarActivities';
import StudentDetails from './studentDetails';

const AllTabs = ({ role }) => {
    const [activeForm, setActiveForm] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleForm = (formNumber) => {
        setActiveForm(formNumber);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <nav className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <button
                    type="button"
                    className="btn toggle-btn"
                    onClick={toggleSidebar}
                >
                    {sidebarOpen ? '←' : '→'}
                </button>
                <ul className="nav flex-column">
                    {role === 'admin' && (
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeForm === 3 ? 'active' : ''}`}
                                onClick={() => toggleForm(3)}
                            >
                                Add Student Details
                            </button>
                        </li>
                    )}
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeForm === 4 ? 'active' : ''}`}
                            onClick={() => toggleForm(4)}
                        >
                            Add Student Marks
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeForm === 5 ? 'active' : ''}`}
                            onClick={() => toggleForm(5)}
                        >
                            View Academics Profile
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeForm === 1 ? 'active' : ''}`}
                            onClick={() => toggleForm(1)}
                        >
                            View Student Details
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeForm === 2 ? 'active' : ''}`}
                            onClick={() => toggleForm(2)}
                        >
                            Co-curricular Activities
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeForm === 6 ? 'active' : ''}`}
                            onClick={() => toggleForm(6)}
                        >
                            Extra-curricular Activities
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeForm === 7 ? 'active' : ''}`}
                            onClick={() => toggleForm(7)}
                        >
                            Student Profile
                        </button>
                    </li>
                </ul>
            </nav>

            {/* Main Content Area */}
            <main className={`main-content ${sidebarOpen ? 'with-sidebar' : 'full-width'}`}>
                <div className="content-wrapper pt-3">
                    {activeForm === 1 && (
                        <div className="student-details-container">
                            <AcadamicsProfile role={role} />
                        </div>
                    )}
                    {activeForm === 4 && <EnterMarks />}
                    {activeForm === 5 && <FilterStudentMarks />}
                    {activeForm === 2 && <CocurricularActivities />}
                    {activeForm === 3 && (
                        <div>
                            <StudentForm />
                            <UploadStudentDetails />
                        </div>
                    )}
                    {activeForm === 6 && <ExtraCuricullarActivities />}
                    {activeForm === 7 && <WholeStudentProfile />}
                </div>
            </main>
        </div>
    );
};

export default AllTabs;
