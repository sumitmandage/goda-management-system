

import React, { useState, useEffect } from 'react';
import img from './../assets/images/lo.jpg';
import api from "./apiConfig";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    userID: '',
    password: '',
    role: 'Sevak',
  });

  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find(
      (user) =>
        user.userid === formData.userID &&
        user.password === formData.password &&
        user.role.toLowerCase() === formData.role.toLowerCase()
    );

    if (user) {
      onLogin(user.role.toLowerCase(), user.userid);
    } else {
      setError('Invalid UserID, Password, or Role. Please try again.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        {/* Logo container - centered */}
        <div className="text-center mb-4">
          <img 
            src={img} 
            alt="ASSET RADAR" 
            className="img-fluid mx-auto d-block" 
            style={{ maxHeight: '100px' }} 
          />
          <h2 className="mt-3">Shree Ramtirth Godavari Seva Samiti</h2>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="userID" className="form-label">UserID:</label>
            <input
              type="text"
              className="form-control"
              id="userID"
              name="userID"
              value={formData.userID}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role:</label>
            <select
              id="role"
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="sevak">Sevak</option>
              <option value="group-sevak">Group Sevak</option>
              <option value="samithi">Samithi</option>
            </select>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;