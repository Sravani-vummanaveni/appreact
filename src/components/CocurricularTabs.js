import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ActivityFilter from './ActivityFilter';

const CocurricularTabs = () => {

    const [showForm1, setShowForm1] = useState(false);
    const [showForm2, setShowForm2] = useState(false);
    const [activeButton, setActiveButton] = useState(null);
    const toggleForm = (formNumber) => {
        if (formNumber === 1) {
            setShowForm1(true);
            setShowForm2(false);
            setActiveButton(1);
        }
        else if (formNumber === 2) {
            setShowForm1(false);
            setShowForm2(true);
            setActiveButton(2);
        }
    };
    return (
        <div>
            {/* <div className="col-lg-4 text-center"></div> */}
            <div className='container text-center'>
                <div className='d-flex gap-5 align-items-center justify-content-center pt-3'>
                    <div ><Link to='/cocurricular-activities-list'><button type="button" className={activeButton === 1 ? 'active' : ''} onClick={() => toggleForm(1)} >All Student Activity</button></Link></div>
                    <div ><button type="button" className={activeButton === 2 ? 'active' : ''} onClick={() => toggleForm(2)}>Single Student Activity</button></div>
                </div>
             
                        {showForm2 && (
                            <div className='row'>
                                <div className='col-md-12'>
                                <ActivityFilter />
                                </div>
                            </div>

                        )}
                   
            </div>
            {/* <div className="col-lg-4 text-center"></div> */}

        </div>
    );
}

export default CocurricularTabs;