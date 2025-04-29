


import React, { useEffect, useState } from 'react';

function FeedbackData() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [message, setMessage] = useState(''); // To show success or error messages

  // Fetch feedback data from the backend
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-feedback');
        const data = await response.json();

        if (response.ok) {
          setFeedbackList(data);
        } else {
          setMessage(data.message || 'An error occurred while fetching feedback');
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
        setMessage('Failed to fetch feedback');
      }
    };

    fetchFeedback();
  }, []);

  // Delete feedback
  const handleDelete = async (feedbackId) => {
    try {
      const response = await fetch(`http://localhost:5000/delete-feedback/${feedbackId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Feedback deleted successfully');
        // Remove the deleted feedback from the list
        setFeedbackList(feedbackList.filter(feedback => feedback.id !== feedbackId));
      } else {
        setMessage(data.error || 'Failed to delete feedback');
      }
    } catch (error) {
      console.error('Error deleting feedback:', error);
      setMessage('Failed to delete feedback');
    }
  };

  return (
    <div className="container mt-5" style={{ fontFamily: 'Arial, sans-serif' }}>
      <h2 className="text-center mb-4" style={{ color: '#007BFF' }}>Feedback List</h2>

      {/* Show message if any */}
      {message && <div className="alert alert-info">{message}</div>}

      {/* Display feedback data */}
      {feedbackList.length > 0 ? (
        <div className="card" style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <div className="card-body">
            <ul className="list-group list-group-flush" style={{ padding: '0' }}>
              {feedbackList.map((feedback, index) => (
                <li
                  key={feedback.id} // Use feedback.id as the unique key
                  className="list-group-item d-flex justify-content-between align-items-start"
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    marginBottom: '10px',
                    padding: '15px',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  {/* Displaying Sr. No and Feedback */}
                  <div style={{ maxWidth: '350px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                    <h5 className="mb-1" style={{ fontSize: '18px', color: '#333' }}>Sr. No: {index + 1}</h5>
                    <h5 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>{feedback.name}</h5>
                    <p
                      className="text-wrap"
                      style={{
                        whiteSpace: 'pre-wrap',
                        fontSize: '16px',
                        color: '#555',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        wordBreak: 'break-word', // Ensures that long words break correctly
                        margin: '0', // Ensure no extra margin on the paragraph
                      }}
                    >
                      {feedback.feedback}
                    </p>
                  </div>
                  {/* Delete button */}
                  <button
                    className="btn btn-danger btn-sm"
                    style={{ borderRadius: '5px' }}
                    onClick={() => handleDelete(feedback.id)} // Call delete handler with feedback ID
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning mt-3" style={{ fontSize: '16px' }}>No feedback available.</div>
      )}
    </div>
  );
}

export default FeedbackData;
