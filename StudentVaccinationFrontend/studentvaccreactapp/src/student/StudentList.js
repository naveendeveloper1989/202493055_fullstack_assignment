// src/components/StudentList.js
import React, { useEffect, useState } from 'react';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [showId, setShowId] = useState(false);
  const [selStudId,setSelectedStudId] = useState('');
  const [selVaccId,setSelectedVaccId] = useState('');
  const [filterObject, setFilterObject] = useState({
    id: '',
    name: '',
    class: '',
    vaccinated: false
  });
  const [studObject, setStudObject] = useState({
    id: '',
    name: '',
    class: ''
  });
  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    modal: {
      background: '#fff',
      padding: '2rem',
      borderRadius: '8px',
      width: '400px',
      maxWidth: '90%'
    }
  };
  
  const [showModal, setShowModal] = useState(false);
  const [showVaccModal, setVaccModal] = useState(false);
  const handleAdd = () => {
    setShowModal(true);
    setShowId(false);
    setStudObject({});
  };
  const handleEdit = (student) => {
    setShowModal(true);
    setShowId(true);
    setStudObject(student);
  };
  const handleVaccination = (studid) => {
    setVaccModal(true);
    setSelectedStudId(studid);
  };
  const handleAssignStudVacc = ()=>{
    const url = `http://localhost:5285/api/Vaccination/student/${selStudId}/vaccination/${selVaccId}`
    fetch(url,{
        method: 'POST'
      }) // adjust port if needed
      .then(response => {
        if(response.ok){
            alert(`Student Vaccinated`);
        }
      })
      .catch(error => console.error('Error fetching students:', error));
  }
  const handleDelete = (id)=>{
    const url = `http://localhost:5285/api/Student/${id}`;
    fetch(url,{
        method: 'DELETE'
      }) // adjust port if needed
      .then(response => {
        if(response.ok){
            alert(`Student ${id} Deleted`);
            loadStudent();
        }
      })
      .catch(error => console.error('Error fetching students:', error));
  };
  const closeModal = () => {
    setShowModal(false);
    setVaccModal(false);
  };
  const loadStudent = ()=>{
    fetch('http://localhost:5285/api/Student/list',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(filterObject)
      }) // adjust port if needed
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching students:', error));
  };
  const loadVaccinations = ()=>{
    fetch('http://localhost:5285/api/Vaccination',{
        method: 'GET',
      }) // adjust port if needed
      .then(response => response.json())
      .then(data => setVaccinations(data))
      .catch(error => console.error('Error fetching students:', error));
  };
  const handleSubmit = () => {
    if(!showId){
        fetch('http://localhost:5285/api/Student', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(studObject)
          })
            .then(response => {
              console.log(response);
              if (!response.ok) throw new Error('Failed to add student');
              console.log('Student added:');
              closeModal();
              loadStudent(); // optional: refresh table
            })
            .catch(error => {
              console.error('Add failed:', error);
              alert('Failed to add student');
            });
    }
    else{
        fetch('http://localhost:5285/api/Student', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(studObject)
          })
            .then(response => {
              console.log(response);
              if (!response.ok) throw new Error('Failed to update student');
              console.log('Student updated:');
              closeModal();
              loadStudent(); // optional: refresh table
            })
            .catch(error => {
              console.error('Add failed:', error);
              alert('Failed to add student');
            });
    }
    
  };
  useEffect(() => {
    loadStudent();
  }, []);
  useEffect(() => {
    loadVaccinations();
  }, []);

  // Handler to update any field
  const handleFilterChange = (key, value) => {
    setFilterObject(prev => ({
      ...prev,
      [key]: value
    }));
  };
  const handleStudInputChange = (key, value) => {
    setStudObject(prev => ({
      ...prev,
      [key]: value
    }));
  };
  const handlerFilterStudent = ()=>{
    loadStudent();
  };


  return (
    <div>
        <div className='form-row'>

                <label htmlFor='id'>ID: </label>
                <input
                name='id'
                type="text"
                value={filterObject.id}
                onChange={e => handleFilterChange('id', e.target.value)}
                style={{ marginRight: '1rem' }}
                />


        

        <label>Name: </label>
        <input
          type="text"
          value={filterObject.name}
          onChange={e => handleFilterChange('name', e.target.value)}
          style={{ marginRight: '1rem' }}
        />

        <label>Class: </label>
        <input
          type="text"
          value={filterObject.class}
          onChange={e => handleFilterChange('class', e.target.value)}
        />
       <label>
        <input
        style={{width:'50px'}}
          type="checkbox"
          checked={filterObject.vaccinated}  // Binds the checkbox state
          onChange={e => handleFilterChange('vaccinated', e.target.checked)}  // Handles changes to checkbox state
        />
        Vaccinated?
      </label>
        <button onClick={handlerFilterStudent} style={{ marginLeft: '1rem', width:'150px' }}>
          Filter
        </button>
      </div>

      <button onClick={handleAdd} style={{ width:'100px',marginLeft: '0.5rem' }}>Add Student</button>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table border="1" cellPadding="1" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Class</th>
              <th>Vaccination</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.vaccinations.map(v =>(<span>{v.name} |</span>))}</td>
                <td colSpan="2">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                        <button  onClick={()=>handleEdit(student)} >Edit</button>
                        <button onClick={()=>handleDelete(student.id)} style={{ marginLeft: '0.5rem' }}>Delete</button>
                        <button onClick={()=>handleVaccination(student.id)} style={{ marginLeft: '0.5rem' }}>Vaccinate</button>

                    </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}

     {/* Add/Edit Modal */}
      {showModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
        {showId && (
            <div>
                <label>ID: </label>
                <input
                type="text"
                value={studObject.id}
                disabled="disabled"
                onChange={e => handleStudInputChange('id', e.target.value)}
                style={{ width: '100%', marginBottom: '1rem' }}
                />
            </div>
        )}
          

        <label>Name: </label>
        <input
          type="text"
          value={studObject.name}
          onChange={e => handleStudInputChange('name', e.target.value)}
          style={{ width: '100%', marginBottom: '1rem' }}
        />

        <label>Class: </label>
        <input
          type="text"
          value={studObject.class}
          onChange={e => handleStudInputChange('class', e.target.value)}
          style={{ width: '100%', marginBottom: '1rem' }}
        />

      
            <div style={{ textAlign: 'right' }}>
              <button onClick={closeModal} style={{ marginRight: '1rem' }}>Cancel</button>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Vaccination Modal */}
      {showVaccModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
        
            <div>
                <label>Vaccination </label>
                <select value={selVaccId} onChange={(e) => setSelectedVaccId(e.target.value)}>
                {vaccinations.map(vacc => (
                    <option value={vacc.id}>{vacc.name}</option>
                ))}
                    
                </select>
            </div>            

            <div style={{ textAlign: 'right' }}>
              <button onClick={closeModal} style={{ marginRight: '1rem' }}>Cancel</button>
              <button onClick={()=>handleAssignStudVacc()}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
    
      
  );
};

export default StudentList;
