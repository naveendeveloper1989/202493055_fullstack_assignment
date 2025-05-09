import React from 'react';
import SiteHeader from '../SiteHeader';
import StudentList from './StudentList'
const Student = () => {
    return (
        
        <div>
            <SiteHeader></SiteHeader>
            <h2>Reports</h2>
            <div>
                <StudentList/>
            </div>
        </div>
        
    )
};
export default Student;