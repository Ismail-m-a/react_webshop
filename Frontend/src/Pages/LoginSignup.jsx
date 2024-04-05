import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { useNavigate } from 'react-router-dom'; 

const LoginSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/register', { // Ensure port matches your server's
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('User registered successfully!');
        navigate('/login');
      } else {
        console.error('An error occurred while registering the user.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign up</h1>
        <form className="loginsignup-fields" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder='Your Name' value={formData.name} onChange={handleChange} />
          <input type="email" name="email" placeholder='Email Address' value={formData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} />
          <button type="submit">Continue</button>
        </form>
        <p className="loginsignup-login">Already have an account? <span>Login here</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
