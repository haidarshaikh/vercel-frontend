import React, { useState } from 'react';
import axios from 'axios';

const UpdateStudentForm = ({ student, onClose }) => {
  const [formData, setFormData] = useState({ ...student });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`https://mongo-backend-04jh.onrender.com/api/students/${formData.id}`, formData);
      onClose();
    } catch (err) {
      console.error('Error updating student:', err);
      alert('Update failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label>First Name</label>
        <input name="first_name" className="form-control" value={formData.first_name} onChange={handleChange} />
      </div>
      <div className="mb-2">
        <label>Last Name</label>
        <input name="last_name" className="form-control" value={formData.last_name} onChange={handleChange} />
      </div>
      <div className="mb-2">
        <label>Email</label>
        <input name="email" className="form-control" value={formData.email} onChange={handleChange} />
      </div>
      <div className="mb-2">
        <label>Mobile</label>
        <input name="mobile" className="form-control" value={formData.mobile} onChange={handleChange} />
      </div>
      <div className="mb-2">
        <label>Classroom</label>
        <input name="classroom" className="form-control" value={formData.classroom} onChange={handleChange} />
      </div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary me-2" onClick={onClose} type="button">Cancel</button>
        <button className="btn btn-primary" type="submit">Save</button>
      </div>
    </form>
  );
};

export default UpdateStudentForm;
