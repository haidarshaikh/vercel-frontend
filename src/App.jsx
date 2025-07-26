import React from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import SearchStudent from './components/SearchStudent';
import AddStudentModal from './components/AddStudentModal';

function App() {
  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Student Manager</h1>
      <SearchStudent />
      <hr />
      <StudentList />
      <AddStudentModal/>
    </div>
  );
}

export default App;
