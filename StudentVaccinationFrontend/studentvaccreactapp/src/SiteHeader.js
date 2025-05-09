import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AppBanner from './AppBanner';
const SiteHeader = () => {
    return (
        
        <div>
               <AppBanner></AppBanner>
             

                <header>
                <nav className="navbar">
                    <ul className="nav-links">
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/student">Add/Manage Student</a></li>
                    <li><a href="/vaccination">Add/Manage Vaccination</a></li>
                    <li><a href="/generatereport">Generate Report</a></li>
                    </ul>
                </nav>
                </header>

               
        </div>
        
    )
};
export default SiteHeader;