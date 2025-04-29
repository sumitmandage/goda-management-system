

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';  // Import react-select for multi-select dropdown
import { FaCheck } from 'react-icons/fa';

function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]); // Array to store selected students
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('present');
  const [team, setTeam] = useState('team-monday'); // Default to 'Team Monday'

  // Fetch students list (for teacher to mark attendance)
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/users'); // Assuming this endpoint returns student data
        const result = await response.json();

        // Assuming the result contains a list of students with 'id' and 'name' properties
        setStudents(result.map((student) => ({
          value: student.id,  // ID of the student
          label: student.name,  // Name of the student
        })));
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  // Fetch attendance for selected student(s) (if student is logged in)
  useEffect(() => {
    if (selectedStudents.length > 0) {
      fetch(`http://localhost:5000/get-attendance/${selectedStudents[0].value}`)
        .then((res) => res.json())
        .then((data) => setAttendanceData(data))
        .catch((err) => console.error(err));
    }
  }, [selectedStudents]);

  const handleMarkAttendance = () => {
    const data = {
      name: selectedStudents.map((student) => student.label), // Send array of selected student names
      date,
      status,
      team,
    };

    fetch('http://localhost:5000/mark-attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message);
        // Reset form fields after submission
        setSelectedStudents([]);
        setDate('');
        setStatus('present');
        setTeam('team-monday'); // Reset team selection
      })
      .catch((error) => {
        console.error('Error marking attendance:', error);
        alert('Error marking attendance!');
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Attendance Management System</h2>

      {/* Multi-Select Dropdown for Selecting Students */}
      <div className="mb-3">
        <label className="form-label">Select Name</label>
        <Select
          isMulti
          options={students} // Use the dynamically fetched students list
          onChange={setSelectedStudents}  // Store selected students
          value={selectedStudents}
          getOptionLabel={(e) => (
            <div className="d-flex align-items-center">
              <FaCheck className="me-2" /> {e.label}
            </div>
          )}
        />
      </div>

      {/* Date Input */}
      <div className="mb-3">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      {/* Status Dropdown */}
      <div className="mb-3">
        <label className="form-label">Status</label>
        <select
          className="form-select"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
        >
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>
      </div>

      {/* Team Dropdown */}
      <div className="mb-3">
        <label className="form-label">Team</label>
        <select
          className="form-select"
          onChange={(e) => setTeam(e.target.value)}
          value={team}
        >
          <option value="team-monday">Team Monday</option>
          <option value="team-tuesday">Team Tuesday</option>
          <option value="team-wednesday">Team Wednesday</option>
          <option value="team-thursday">Team Thursday</option>
          <option value="team-friday">Team Friday</option>
        </select>
      </div>

      <button className="btn btn-success" onClick={handleMarkAttendance}>
        Mark Attendance
      </button>
    </div>
  );
}

export default Attendance;