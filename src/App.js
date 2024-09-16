import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [headers, setHeaders] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
    
      const response = await axios.post('http://localhost:5000/api/proxy', {
        phoneNumber: phoneNumber
      });
  
      
      console.log({response});
      
      setHeaders(response.data.headers);
      setLoading(false);
  
    } catch (error) {
      console.error('Error:', error);
      setHeaders({ error: 'An error occurred.' });
      setLoading(false);
    }
  };
  
  return (
    <div className="app-container">
      <h1>API Response Headers</h1>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="phone">Enter Phone Number:</label>
        <input
          type="text"
          id="phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="input-field"
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="response">
          <h3>Response Headers:</h3>
          {Object.keys(headers).length > 0 ? (
            <ul>
              {Object.entries(headers).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}</strong>: {value}
                </li>
              ))}
            </ul>
          ) : (
            <p>Please enter valid number</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
