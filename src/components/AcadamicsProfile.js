import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import StudentData from './StudentData';

const AcadamicsProfile = () => {

    const [showForm1, setShowForm1] = useState(false);
    const [showForm2, setShowForm2] = useState(false);
    const [activeButton, setActiveButton] = useState(null);
    const toggleForm = (formNumber) => {
        if(formNumber === 1){
            setShowForm1(true);
            setShowForm2(false);
            setActiveButton(1);
        }
        else if(formNumber === 2){
            setShowForm1(false);
            setShowForm2(true);
            setActiveButton(2);
        }
       
      
    };
    return (
        <div className='acd-pro'>
            <form className='row'>
                {/* <div className="col-lg-4 text-center"></div> */}
                    <div className='container text-center'>
                        <div className='d-flex gap-5 align-items-center justify-content-center py-1'>
                            <div ><Link to="/student-profile" ><button type="button" className={activeButton === 1 ? 'active' : ''} onClick={() => toggleForm(1)}>All Students Profile</button></Link></div>
                            <div ><button type="button" className={activeButton === 2 ? 'active' : ''} onClick={() => toggleForm(2)}>Single Student Profile</button></div>
                        </div>
                        <div className='row pt-5'>
                            <div className='col-lg-12 col-md-12'>
                            {showForm2 && (
                                <div>
                                   <StudentData/>
                                </div>
                                
                            )}
                            </div>
                        </div>
                </div>
                {/* <div className="col-lg-4 text-center"></div> */}
            </form>
        </div>
    );
}

export default AcadamicsProfile;