export const getStudentsFromLocalStorage = () => {
  const data = localStorage.getItem('students');
  return data ? JSON.parse(data) : [];
};


export const saveStudentsToLocalStorage = (students) => {
  localStorage.setItem('students', JSON.stringify(students));
};
