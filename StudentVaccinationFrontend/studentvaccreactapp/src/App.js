import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';
import Student from './student/Student';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AppBanner from './AppBanner';
import Vaccination from './vaccination/vaccination';
import Report from './report/Report';

function App() {
  return (
    <div>


    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/student" element={<Student />} />
      <Route path="/vaccination" element={<Vaccination />} />
      <Route path="/generatereport" element={<Report />} />
    </Routes>
    </Router>
    </div>
    
  );
}

export default App;
