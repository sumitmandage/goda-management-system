import React, { useState } from 'react';

function Yajmanregister() {
  // State to store the input values
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfRegistration, setDateOfRegistration] = useState('');
  const [dateOfAarti, setDateOfAarti] = useState('');
  const [email, setEmail] = useState('');
  const [numMembers, setNumMembers] = useState('');
  const [dob, setDob] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [message, setMessage] = useState(''); // To show success or error message after submission

  // Handler functions for input changes
  const handleInputChange = (setter) => (event) => setter(event.target.value);

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the data to be sent
    const formData = {
      name,
      phoneNumber,
      dateOfRegistration,
      dateOfAarti,
      email,
      numMembers,
      dob,
      amount,
      paymentMethod,
    };

    try {
      // Sending the form data to the backend using the fetch API
      const response = await fetch('http://localhost:5000/api/yajman', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Registration successful!');
        setName('');
        setPhoneNumber('');
        setDateOfRegistration('');
        setDateOfAarti('');
        setEmail('');
        setNumMembers('');
        setDob('');
        setAmount('');
        setPaymentMethod('');
      } else {
        setMessage(result.error || 'An error occurred during registration');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('Failed to register');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Yajman Registration</h2>

      <form onSubmit={handleSubmit}>
        {/* Row 1: Name, Phone Number, and Date of Registration */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={handleInputChange(setName)}
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handleInputChange(setPhoneNumber)}
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="dateOfRegistration" className="form-label">Date of Registration</label>
            <input
              type="date"
              className="form-control"
              id="dateOfRegistration"
              value={dateOfRegistration}
              onChange={handleInputChange(setDateOfRegistration)}
              required
            />
          </div>
        </div>

        {/* Row 2: Date of Aarti, Email, and Number of Members */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="dateOfAarti" className="form-label">Date of Aarti</label>
            <input
              type="date"
              className="form-control"
              id="dateOfAarti"
              value={dateOfAarti}
              onChange={handleInputChange(setDateOfAarti)}
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={handleInputChange(setEmail)}
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="numMembers" className="form-label">Number of Members</label>
            <input
              type="number"
              className="form-control"
              id="numMembers"
              value={numMembers}
              onChange={handleInputChange(setNumMembers)}
              required
            />
          </div>
        </div>

        {/* Row 3: Date of Birth, Amount, and Payment Method */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="dob" className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              id="dob"
              value={dob}
              onChange={handleInputChange(setDob)}
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              value={amount}
              onChange={handleInputChange(setAmount)}
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
            <select
              id="paymentMethod"
              className="form-control"
              value={paymentMethod}
              onChange={handleInputChange(setPaymentMethod)}
              required
            >
              <option value="">Select Payment Method</option>
              <option value="cash">Cash</option>
              <option value="online">Online</option>
              <option value="cheque">Cheque</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Submit Registration</button>
      </form>

      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
}

export default Yajmanregister;
