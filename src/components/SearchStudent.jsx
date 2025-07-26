import React, { useState } from 'react';
import axios from 'axios';

const SearchStudent = () => {
  const [searchId, setSearchId] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    if (!searchId) return;

    try {
      const res = await axios.get(`https://mongo-backend-mu-silk.vercel.app/marks/${searchId}`);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert('Student not found');
      setResult(null);
    }
  };

  return (
    <div className="mb-4">
      <h4>Search Student</h4>
      <div className="input-group mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Enter student ID"
          value={searchId}
          onChange={e => setSearchId(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {result && (
        <div className="card">
          <div className="card-body">
            <h5>{result.first_name} {result.last_name}</h5>
            <p>Email: {result.email}</p>
            <p>Mobile: {result.mobile}</p>
            <p>Classroom: {result.classroom}</p>

            <h6>Marks:</h6>
            <ul>
              {result.Marks.map(m => (
                <li key={m.id}>{m.subject}: {m.marks} / {m.out_of_marks}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchStudent;
