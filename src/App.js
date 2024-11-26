import React, { useState, useEffect } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import { getStudentsFromLocalStorage, saveStudentsToLocalStorage } from './utils/storage';

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Load students from local storage on initial render
    const savedStudents = getStudentsFromLocalStorage();
    setStudents(savedStudents);
  }, []);

  useEffect(() => {
    // Save students to local storage whenever they change
    saveStudentsToLocalStorage(students);
  }, [students]);

  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  const updateStudent = (updatedStudent) => {
    const updatedList = students.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student
    );
    setStudents(updatedList);
  };

  const deleteStudent = (id) => {
    const filteredStudents = students.filter((student) => student.id !== id);
    setStudents(filteredStudents);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Student Management</h1>
      <StudentForm addStudent={addStudent} />
      <StudentList
        students={students}
        updateStudent={updateStudent}
        deleteStudent={deleteStudent}
      />
    </div>
  );
}

export default App;
