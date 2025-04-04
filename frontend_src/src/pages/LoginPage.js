import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Tesseract from 'tesseract.js';

const LoginPage = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const extractTextFromImage = () => {
    if (!image) return;

    setIsProcessing(true);
    Tesseract.recognize(
      image,
      'eng', // Language to recognize (can be changed or extended)
      {
        logger: (m) => console.log(m), // Optional: logs progress info
      }
    ).then(({ data: { text } }) => {
      setText(text); // Set the extracted text
      setIsProcessing(false);
    }).catch((error) => {
      console.error(error);
      setIsProcessing(false);
    });
  };

  // ============================================
  // const image = fs.readFileSync("YOUR_IMAGE.jpg", {
  //   encoding: "base64"
  // });


  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '40px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      background: '#67879C',
      background: 'linear-gradient(270deg, #67879C, #96DCCB)',
    },
    background: {
      backgroundColor: 'beige',
      height: '80vh',
      margin: '50px 40px',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      border: '2px solid #d3d3d3'
    },
    heading: {
      color: '#333',
    },
    fileInput: {
      margin: '10px 0',
    },
    button: {
      padding: '10px 15px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#007BFF',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      margin: '10px 0',
    },
    buttonDisabled: {
      backgroundColor: '#aaa',
      cursor: 'not-allowed',
    },
    textContainer: {
      marginTop: '20px',
      textAlign: 'center',
      margin:"40px 0px"
    },
    textHeading: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
    extractedText: {
      fontSize: '16px',
      color: '#555',
    },
  };


  return (
    <div style={styles.background}>
      <h1 style={{ textAlign: "center", paddingTop: '40px', fontSize: '35px' }}>Login</h1>
      <div style={styles.container}>
        <h1 style={styles.heading}>OCR Text Extraction</h1>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={styles.fileInput}
        />
        <button
          onClick={extractTextFromImage}
          disabled={isProcessing}
          style={{
            ...styles.button,
            ...(isProcessing ? styles.buttonDisabled : {}),
          }}
        >
          {isProcessing ? 'Processing...' : 'Upload Adhar Card front photo'}
        </button>
        {text && (
          <div style={styles.textContainer}>
            <Link to={'/register'} state={{ text: text }} style={{background: 'green', textDecoration:'none',
            color: 'white', padding: '10px 15px', fontSize: '16px', borderRadius: '4px'
            }} >Click here to proceed</Link>
            {/* <h3 style={styles.textHeading}>Extracted Text:</h3> */}
            {/* <p style={styles.extractedText}>{text}</p> */}
          </div>
        )}
      </div>

      {/* <div>
      <h1>OCR Text Extraction</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={extractTextFromImage} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Extract Text'}
      </button>
      {text && <div><h3>Extracted Text:</h3><p>{text}</p></div>}
    </div> */}
    </div>
  );
};

export default LoginPage;
