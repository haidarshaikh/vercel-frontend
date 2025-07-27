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
    obtained_marks: '',
    total_marks: ''
  });

  const handleChange = e => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // ✅ Validation (prevents empty or invalid marks)
    if (
      student.subject.trim() === '' ||
      student.obtained_marks === '' ||
      student.total_marks === ''
    ) {
      Swal.fire('Validation Error', 'Please fill in all marks fields!', 'warning');
      return;
    }

    try {
      // 1. Create student
      const res = await axios.post('https://mongo-backend-04jh.onrender.com/api/students', {
        first_name: student.first_name,
        last_name: student.last_name,
        mobile: student.mobile,
        email: student.email,
        classroom: student.classroom
      });

      const studentId = res.data.student_id;

      // 2. Create marks entry (✅ Convert marks to numbers)
      await axios.post('https://mongo-backend-04jh.onrender.com/api/marks', {
        student_id: studentId,
        subject: student.subject,
        obtained_marks: Number(student.obtained_marks),
        total_marks: Number(student.total_marks)
      });

      Swal.fire('Success!', 'Student & marks added!', 'success');

      if (onSuccess) onSuccess(); // Refresh table or close modal

      // Optional: clear form
      setStudent({
        first_name: '',
        last_name: '',
        mobile: '',
        email: '',
        classroom: '',
        subject: '',
        obtained_marks: '',
        total_marks: ''
      });

    } catch (err) {
      Swal.fire('Error', err.response?.data?.error || 'Something went wrong!', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-3">
        <div className="col-md-6">
          <input
            name="first_name"
            className="form-control"
            placeholder="First Name"
            value={student.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            name="last_name"
            className="form-control"
            placeholder="Last Name"
            value={student.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            name="mobile"
            className="form-control"
            placeholder="Mobile"
            value={student.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Email"
            value={student.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            name="classroom"
            className="form-control"
            placeholder="Classroom"
            value={student.classroom}
            onChange={handleChange}
            required
          />
        </div>

        <hr className="mt-4" />

        <div className="col-md-4">
          <input
            name="subject"
            className="form-control"
            placeholder="Subject"
            value={student.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            name="obtained_marks"
            className="form-control"
            placeholder="Obtained Marks"
            type="number"
            value={student.obtained_marks}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            name="total_marks"
            className="form-control"
            placeholder="Total Marks"
            type="number"
            value={student.total_marks}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <button className="btn btn-primary mt-3">Add Student & Marks</button>
    </form>
  );
};

export default StudentForm;
