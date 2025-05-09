import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const VaccinationList = () => {
    const [vaccinations, setVaccinations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showId, setShowId] = useState(false);
    const [vaccObject, setVaccinationObject] = useState({
        id: '',
        name: '',
        date: new Date(),
        noOfDose:0,
        classApplicable:''
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
      
      const handleSubmit = () => {
        if(!showId){
            fetch('http://localhost:5285/api/Vaccination', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(vaccObject)
              })
                .then(response => {
                  console.log(response);
                  if (!response.ok) throw new Error('Failed to add Vaccination');
                  console.log('Vaccination added:');
                  closeModal();
                  loadVaccinations(); // optional: refresh table
                })
                .catch(error => {
                  console.error('Add failed:', error);
                  alert('Failed to add student');
                });
        }
        else{
            fetch('http://localhost:5285/api/Vaccination', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(vaccObject)
              })
                .then(response => {
                  console.log(response);
                  if (!response.ok) throw new Error('Failed to update Vaccination');
                  console.log('Vaccination updated:');
                  closeModal();
                  loadVaccinations(); // optional: refresh table
                })
                .catch(error => {
                  console.error('Add failed:', error);
                  alert('Failed to add student');
                });
        }
        
      };
      const handleInputChange = (key, value) => {
        setVaccinationObject(prev => ({
          ...prev,
          [key]: value
        }));
      };
      const handleAdd = () => {
        setShowModal(true);
        setShowId(false);
        setVaccinationObject({});
      };

      const handleEdit = (vacc) => {
        setShowModal(true);
        setShowId(true);
        setVaccinationObject(vacc);
      };
      const closeModal = () => {
        setShowModal(false);
      };
      const handleDelete = (id)=>{
        const url = `http://localhost:5285/api/Vaccination/${id}`;
        fetch(url,{
            method: 'DELETE'
          }) // adjust port if needed
          .then(response => {
            if(response.ok){
                alert(`Vaccination ${id} Deleted`);
                loadVaccinations();
            }
          })
          .catch(error => console.error('Error fetching students:', error));
      };

      const loadVaccinations = ()=>{
        fetch('http://localhost:5285/api/Vaccination',{
            method: 'GET'            
          }) // adjust port if needed
          .then(response => response.json())
          .then(data => setVaccinations(data))
          .catch(error => console.error('Error fetching vaccinations:', error));
      };

      useEffect(() => {
          loadVaccinations();
        }, []);
    
        return(
          <div>
            <button onClick={handleAdd} style={{ width:'100px',marginLeft: '0.5rem' }}>Add Schedule</button>
            {vaccinations.length === 0 ? (
                <p>No Vaccinations found.</p>
              ) : (
                <table border="1" cellPadding="1" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Date</th>
                      <th>No.of.Dose</th>
                      <th>Date</th>
                      <th>Class Applicable</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vaccinations.map(vaccinations => (
                      <tr key={vaccinations.id}>
                        <td>{vaccinations.id}</td>
                        <td>{vaccinations.name}</td>
                        <td>{vaccinations.date}</td>
                        <td>{vaccinations.noOfDose}</td>
                        <td>{vaccinations.classApplicable}</td>
                        <td colSpan="2">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
                                <button  onClick={()=>handleEdit(vaccinations)} >Edit</button>
                                <button onClick={()=>handleDelete(vaccinations.id)} style={{ marginLeft: '0.5rem' }}>Delete</button>
        
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
                value={vaccObject.id}
                disabled="disabled"
                onChange={e => handleInputChange('id', e.target.value)}
                style={{ width: '100%', marginBottom: '1rem' }}
                />
            </div>
        )}
          

        <label>Name: </label>
        <input
          type="text"
          value={vaccObject.name}
          onChange={e => handleInputChange('name', e.target.value)}
          style={{ width: '100%', marginBottom: '1rem' }}
        />

        <label>Date: </label>
        <div className='datepicker'>
          <DatePicker
          selected={vaccObject.date}
          onChange={(date) => handleInputChange('date', date)}
          showTimeSelect
          dateFormat="Pp"
          style={{ width: '100%', marginBottom: '1rem' }}
        />
        </div>
        
         <label>No.Of.Dose: </label>
        <input
          type="text"
          value={vaccObject.noOfDose}
          onChange={e => handleInputChange('noOfDose', e.target.value)}
          style={{ width: '100%', marginBottom: '1rem' }}
        />
         <label>Class Applicable: </label>
        <input
          type="text"
          value={vaccObject.classApplicable}
          onChange={e => handleInputChange('classApplicable', e.target.value)}
          style={{ width: '100%', marginBottom: '1rem' }}
        />

      
            <div style={{ textAlign: 'right' }}>
              <button onClick={closeModal} style={{ marginRight: '1rem' }}>Cancel</button>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
          </div>
            
        );
}
export default VaccinationList;