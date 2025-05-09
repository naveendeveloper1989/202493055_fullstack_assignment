import React from 'react';
import SiteHeader from '../SiteHeader';
import VaccinationList from './VaccinationList';
const Vaccination = () => {
    return (
        
        <div>
            <SiteHeader></SiteHeader>
            <h2>Vaccination Management</h2>
            <div>
                <VaccinationList/>
            </div>
        </div>
        
    )
};
export default Vaccination;