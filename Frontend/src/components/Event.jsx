
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // For styling the calendar

function Event() {
  const [date, setDate] = useState(new Date()); // Current selected date
  const [eventDetails, setEventDetails] = useState(''); // For event input

  // Helper function to format date as YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero for single digit months
    const day = ('0' + date.getDate()).slice(-2); // Add leading zero for single digit days
    return `${year}-${month}-${day}`;
  };

  // Function to handle date change
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // Function to handle event details change
  const handleEventChange = (event) => {
    setEventDetails(event.target.value);
  };

  // Function to save event to the list of events (POST request to backend)
  const handleSaveEvent = async () => {
    const selectedDate = formatDate(date); // Format date to YYYY-MM-DD

    const newEvent = {
      date: selectedDate,
      details: eventDetails,
    };

    try {
      // Make the POST request to the backend to save the event
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        setEventDetails(''); // Clear the event details input after saving
      } else {
        console.error('Failed to save event');
      }
    } catch (error) {
      console.error('Error while saving event:', error);
    }
  };

  return (
    <div className="event-container">
      <h2 className="event-header">Event Management</h2>

      <div className="event-row">
        {/* Calendar Component */}
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={date}
            tileClassName={({ date, view }) => {
              return '';
            }}
          />
        </div>

        {/* Event Details Section */}
        <div className="event-details-container">
          <h4>Event Details</h4>
          <textarea
            className="event-details-input"
            rows="4"
            value={eventDetails}
            onChange={handleEventChange}
            placeholder="Enter event details..."
          />
          <button className="save-event-button" onClick={handleSaveEvent}>
            Save Event
          </button>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .event-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Roboto', sans-serif;
        }

        .event-header {
          text-align: center;
          font-size: 2rem;
          color: #333;
          margin-bottom: 30px;
        }

        .event-row {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }

        .calendar-container {
          flex: 1;
          max-width: 600px;
        }

        .event-details-container {
          flex: 1;
          max-width: 600px;
          background-color: #f9f9f9;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h4 {
          font-size: 1.5rem;
          margin-bottom: 15px;
        }

        .event-details-input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          resize: none;
        }

        .event-details-input:focus {
          border-color: #007bff;
          outline: none;
        }

        .save-event-button {
          background-color: #007bff;
          color: white;
          font-size: 1rem;
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          cursor: pointer;
          margin-top: 10px;
          transition: background-color 0.3s ease;
        }

        .save-event-button:hover {
          background-color: #0056b3;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .event-row {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

export default Event;
