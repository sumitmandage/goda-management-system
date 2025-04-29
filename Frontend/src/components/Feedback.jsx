import React, { useState } from 'react';

function Feedback() {
  // State to store the input values
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState(''); // To show success or error message after submission

  // Handler for the Name input change
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Handler for the Feedback input change
  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the data to be sent
    const feedbackData = {
      name: name,
      feedback: feedback,
    };

    try {
      // Sending the feedback to the backend using the fetch API
      const response = await fetch('http://localhost:5000/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Feedback submitted successfully!');
        setName('');
        setFeedback('');
      } else {
        setMessage(result.error || 'An error occurred while submitting feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setMessage('Failed to submit feedback');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Feedback Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="feedback" className="form-label">Feedback</label>
          <textarea
            className="form-control"
            id="feedback"
            rows="4"
            value={feedback}
            onChange={handleFeedbackChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit Feedback</button>
      </form>

      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
}

export default Feedback;
