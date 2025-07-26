import React, { useState } from 'react';
import StudentForm from './StudentForm'; // Make sure the path is correct
import 'bootstrap/dist/css/bootstrap.min.css';

const AddStudentModal = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      {/* Fixed Add Student button at top right */}
      <button
        onClick={openModal}
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1050,
        }}
        className="btn btn-primary"
      >
        Add Student
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={closeModal} // close when clicking outside modal content
        >
          <div
            className="modal-dialog"
            onClick={e => e.stopPropagation()} // prevent modal close on content click
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Student</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <StudentForm onSuccess={closeModal} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddStudentModal;
