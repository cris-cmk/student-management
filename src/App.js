import React, { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import { getStudentsFromLocalStorage, saveStudentsToLocalStorage } from './utils/storage';

function App() {
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);

  // Load students from local storage on initial render
  useEffect(() => {
    const savedStudents = getStudentsFromLocalStorage();
    if (savedStudents.length > 0) {
      setStudents(savedStudents);
    }
  }, []);

  // Save students to local storage whenever the state changes
  useEffect(() => {
    if (students.length > 0) {
      saveStudentsToLocalStorage(students);
    }
  }, [students]);

  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  const updateStudent = (updatedStudent) => {
    const updatedList = students.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student
    );
    setStudents(updatedList);
    setCurrentStudent(null); // Clear edit mode
  };

  const deleteStudent = (id) => {
    const filteredStudents = students.filter((student) => student.id !== id);
    setStudents(filteredStudents); // Update the state
    saveStudentsToLocalStorage(filteredStudents); // Save the updated list to local storage
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Student Management (WEEK 1)</h1>
      <StudentForm
        addStudent={addStudent}
        updateStudent={updateStudent}
        currentStudent={currentStudent}
        students={students}
      />
      <StudentList
        students={students}
        deleteStudent={deleteStudent}
        setCurrentStudent={setCurrentStudent}
      />
    </div>
  );
}

export default App;
