import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import UpdateStudentForm from './UpdateStudentForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalFetched, setTotalFetched] = useState(0);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`https://mongo-backend-mu-silk.vercel.app/students?page=${page}&limit=5`);
      setStudents(res.data);
      setTotalFetched(res.data.length);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page]);

  const handleDelete = async id => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the student.',
      icon: 'warning',
      showCancelButton: true
    });
    if (confirm.isConfirmed) {
      await axios.delete(`https://mongo-backend-mu-silk.vercel.app/students/${id}`);
      Swal.fire('Deleted!', 'Student has been deleted.', 'success');
      fetchStudents();
    }
  };

  return (
    <div>
      <h3>Students</h3>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Classroom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.first_name} {s.last_name}</td>
              <td>{s.mobile}</td>
              <td>{s.email}</td>
              <td>{s.classroom}</td>
              <td>
                <button className="btn btn-sm btn-info me-2" onClick={() => setEditingStudent(s)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-secondary"
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          className="btn btn-secondary"
          onClick={() => setPage(p => (totalFetched === 5 ? p + 1 : p))}
          disabled={totalFetched < 5}
        >
          Next
        </button>
      </div>

      {/* Modal for Update Form */}
      {editingStudent && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Student</h5>
                <button type="button" className="btn-close" onClick={() => setEditingStudent(null)}></button>
              </div>
              <div className="modal-body">
                <UpdateStudentForm
                  student={editingStudent}
                  onClose={() => {
                    setEditingStudent(null);
                    fetchStudents();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
