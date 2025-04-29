import React, { useState } from 'react';

const TodaysYajman = () => {
  // State to store selected date and fetched data
  const [selectedDate, setSelectedDate] = useState('');
  const [yajmans, setYajmans] = useState([]);
  const [message, setMessage] = useState(''); // To show success or error message

  // Handle date change from the calendar
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // Fetch yajman data based on the selected date
  const fetchYajmanData = async () => {
    if (!selectedDate) {
      setMessage('Please select a date.');
      return;
    }

    try {
      // Sending a GET request to the Flask API with the selected date
      const response = await fetch(`http://localhost:5000/api/yajman/${selectedDate}`);

      if (response.ok) {
        const data = await response.json();
        
        // Update state with fetched data
        setYajmans(data);
        setMessage(`${data.length} Yajman(s) found for this date.`);
      } else {
        setMessage('No Yajman data found for this date.');
      }
    } catch (error) {
      console.error('Error fetching Yajman data:', error);
      setMessage('Failed to fetch Yajman data');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Today's Yajman</h2>

      {/* Date Picker */}
      <div className="mb-3">
        <label htmlFor="date" className="form-label">Select Date of Aarti</label>
        <input
          type="date"
          className="form-control"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          required
        />
      </div>

      {/* Fetch Button */}
      <button onClick={fetchYajmanData} className="btn btn-primary mb-4">
        Get Yajman Data
      </button>

      {/* Message Display */}
      {message && <div className="alert alert-info">{message}</div>}

      {/* Yajman List Display */}
      {yajmans.length > 0 && (
        <div className="list-group">
          {yajmans.map((yajman) => (
            <div key={yajman.id} className="list-group-item">
              <h5>{yajman.name}</h5>
              <p><strong>Number of Members:</strong> {yajman.num_members}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodaysYajman;
