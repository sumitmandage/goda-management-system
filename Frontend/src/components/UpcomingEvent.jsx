import React, { useState, useEffect } from 'react';

function UpcomingEvent() {
  const [events, setEvents] = useState([]); // To store events
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch events from the backend using GET
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        if (response.ok) {
          const data = await response.json();
          setEvents(data); // Set the fetched events to the state
        } else {
          console.error('Failed to fetch events');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false); // Stop loading once the data is fetched
      }
    };

    fetchEvents(); // Fetch the events when the component is mounted
  }, []); // Empty dependency array to run this only once

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center">Upcoming Events</h2>

      <div className="list-group">
        {events.length === 0 ? (
          <p className="no-events">No upcoming events.</p>
        ) : (
          events.map((event, index) => (
            <div key={index} className="list-group-item event-item">
              <strong>{event.date}</strong>: {event.details}
            </div>
          ))
        )}
      </div>

      {/* Styles */}
      <style jsx>{`
        /* Container Styling */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        /* Heading Styles */
        h2 {
          font-family: 'Roboto', sans-serif;
          color: #333;
          margin-bottom: 30px;
        }

        /* Event List Styles */
        .list-group {
          margin-top: 20px;
        }

        .event-item {
          font-size: 1rem;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 5px;
          background-color: #f9f9f9;
          margin-bottom: 10px;
          transition: background-color 0.3s;
        }

        .event-item:hover {
          background-color: #f0f0f0;
        }

        .no-events {
          font-size: 1rem;
          color: #555;
          padding: 10px;
          text-align: center;
        }

        /* Loading Styling */
        .loading {
          text-align: center;
          font-size: 1.2rem;
          color: #007bff;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}

export default UpcomingEvent;
