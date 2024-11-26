import React, { useState, useEffect } from 'react';

function StudentForm({ addStudent, updateStudent, currentStudent, students }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (currentStudent) {
      setName(currentStudent.name);
      setEmail(currentStudent.email);
      setIsEditing(true);
    } else {
      setName('');
      setEmail('');
      setIsEditing(false);
    }
  }, [currentStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert('Both name and email are required!');
      return;
    }

    //dublicate record checker
    const isDuplicate = students.some(
      (student) =>
        student.id !== (currentStudent?.id || null) &&
        (student.name === name || student.email === email)
    );

    if (isDuplicate) {
      alert('Name or Email already exists!');
      return;
    }

    const studentData = { id: currentStudent?.id || Date.now(), name, email };

    if (isEditing) {
      updateStudent(studentData);
    } else {
      addStudent(studentData);
    }

    setName('');
    setEmail('');
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          id="name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {isEditing ? 'Update Student' : 'Add Student details'}
      </button>
    </form>
  );
}

export default StudentForm;
