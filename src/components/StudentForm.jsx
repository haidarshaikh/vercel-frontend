import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const StudentForm = ({ onSuccess }) => {
  const [student, setStudent] = useState({
    first_name: '',
    last_name: '',
    mobile: '',
    email: '',
    classroom: '',
    subject: '',
    marks: '',
    out_of_marks: ''
  });

  const handleChange = e => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // 1. Create student
      const res = await axios.post('http://localhost:4000/students', {
        first_name: student.first_name,
        last_name: student.last_name,
        mobile: student.mobile,
        email: student.email,
        classroom: student.classroom
      });

      const studentId = res.data.id;

      // 2. Add marks for student
      await axios.post('http://localhost:4000/marks', {
        student_id: studentId,
        subject: student.subject,
        marks: student.marks,
        out_of_marks: student.out_of_marks
      });

      Swal.fire('Success!', 'Student & marks added!', 'success');

      if (onSuccess) onSuccess();  // close modal after successful submission
    } catch (err) {
      Swal.fire('Error', err.response?.data?.error || 'Something went wrong!', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-3">
        <div className="col-md-6">
          <input name="first_name" className="form-control" placeholder="First Name" onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <input name="last_name" className="form-control" placeholder="Last Name" onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <input name="mobile" className="form-control" placeholder="Mobile" onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <input name="email" type="email" className="form-control" placeholder="Email" onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <input name="classroom" className="form-control" placeholder="Classroom" onChange={handleChange} required />
        </div>
        <hr />
        <div className="col-md-4">
          <input name="subject" className="form-control" placeholder="Subject" onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <input name="marks" className="form-control" placeholder="Marks" type="number" onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <input name="out_of_marks" className="form-control" placeholder="Out of Marks" type="number" onChange={handleChange} required />
        </div>
      </div>
      <button className="btn btn-primary mt-3">Add Student & Marks</button>
    </form>
  );
};

export default StudentForm;
