

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiUser } from "react-icons/ci";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    adminuser_name: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);

    let result = await fetch('http://localhost:5000/login-admin', {
      method: 'post',
      body: JSON.stringify({ formData }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    result = await result.json();
    console.log("result====", result);
    if (result.success === true) {
      navigate('/admin');
    } else {
      alert(result.message);
    }

  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Admin Login</h2>
        <div style={styles.inputGroup}>
          <label htmlFor="adminuser_name" style={styles.label}>
            Username:
          </label>
          <input
            type="text"
            id="adminuser_name"
            name="adminuser_name"
            value={formData.adminuser_name}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '610px',
    margin: '40px',
    borderRadius: '8px',
    // background: 'beige',
    background: "url('/images/Homebg.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
    // border: '1px solid #d3d3d3'
  },
  form: {
    background: 'white',
    // background: 'linear-gradient(270deg, rgb(103, 135, 156), rgb(150, 220, 203))',
    // background: "url('/images/Homebg.jpg')",
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '450px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#555',
  },
  input: {
    width: '95%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    padding: '10px',
    background: "#007BFF",
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default AdminLogin;

