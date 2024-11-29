import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StudentForm from '../components/StudentForm';

describe('StudentForm Component', () => {
  const mockAddStudent = jest.fn();
  const mockUpdateStudent = jest.fn();
  const mockStudents = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form inputs correctly', () => {
    render(
      <StudentForm
        addStudent={mockAddStudent}
        updateStudent={mockUpdateStudent}
        currentStudent={null}
        students={mockStudents}
      />
    );

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Student details/i)).toBeInTheDocument();
  });

  test('updates state on input change', () => {
    render(
      <StudentForm
        addStudent={mockAddStudent}
        updateStudent={mockUpdateStudent}
        currentStudent={null}
        students={mockStudents}
      />
    );

    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);

    fireEvent.change(nameInput, { target: { value: 'Alice' } });
    fireEvent.change(emailInput, { target: { value: 'alice@example.com' } });

    expect(nameInput.value).toBe('Alice');
    expect(emailInput.value).toBe('alice@example.com');
  });

  test('calls addStudent on form submission with valid data', () => {
    render(
      <StudentForm
        addStudent={mockAddStudent}
        updateStudent={mockUpdateStudent}
        currentStudent={null}
        students={mockStudents}
      />
    );

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'alice@example.com' } });
    fireEvent.submit(screen.getByRole('button', { name: /Add Student details/i }));

    expect(mockAddStudent).toHaveBeenCalledWith({
      id: expect.any(Number),
      name: 'Alice',
      email: 'alice@example.com',
    });
  });

  test('shows alert if name or email is missing', () => {
    window.alert = jest.fn();

    render(
      <StudentForm
        addStudent={mockAddStudent}
        updateStudent={mockUpdateStudent}
        currentStudent={null}
        students={mockStudents}
      />
    );

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: '' } });
    fireEvent.submit(screen.getByRole('button', { name: /Add Student details/i }));

    expect(window.alert).toHaveBeenCalledWith('Both name and email are required!');
    expect(mockAddStudent).not.toHaveBeenCalled();
  });

  test('shows alert if duplicate name or email is submitted', () => {
    window.alert = jest.fn();

    render(
      <StudentForm
        addStudent={mockAddStudent}
        updateStudent={mockUpdateStudent}
        currentStudent={null}
        students={mockStudents}
      />
    );

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.submit(screen.getByRole('button', { name: /Add Student details/i }));

    expect(window.alert).toHaveBeenCalledWith('Name or Email already exists!');
    expect(mockAddStudent).not.toHaveBeenCalled();
  });

  test('populates fields when editing a student', () => {
    const currentStudent = { id: 1, name: 'John Doe', email: 'john@example.com' };

    render(
      <StudentForm
        addStudent={mockAddStudent}
        updateStudent={mockUpdateStudent}
        currentStudent={currentStudent}
        students={mockStudents}
      />
    );

    expect(screen.getByLabelText(/Name/i).value).toBe('John Doe');
    expect(screen.getByLabelText(/Email/i).value).toBe('john@example.com');
    expect(screen.getByText(/Update Student/i)).toBeInTheDocument();
  });

  test('calls updateStudent on form submission when editing', () => {
    const currentStudent = { id: 1, name: 'John Doe', email: 'john@example.com' };

    render(
      <StudentForm
        addStudent={mockAddStudent}
        updateStudent={mockUpdateStudent}
        currentStudent={currentStudent}
        students={mockStudents}
      />
    );

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Updated' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'johnupdated@example.com' } });
    fireEvent.submit(screen.getByRole('button', { name: /Update Student/i }));

    expect(mockUpdateStudent).toHaveBeenCalledWith({
      id: 1,
      name: 'John Updated',
      email: 'johnupdated@example.com',
    });
  });
});
