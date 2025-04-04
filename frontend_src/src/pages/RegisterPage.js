import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const RegisterPage = () => {
  const location = useLocation();
  const text = location?.state?.text;
  console.log("text==", text)

  const navigate = useNavigate();
  
  // Find the position of "DOB:"
  const dobPosition = text?.indexOf("DOB:");

  let fetcheddobValue = "";
  if (dobPosition !== -1) {
    // Extract the first 6 characters after "DOB:"
    fetcheddobValue = text?.substring(dobPosition + 4, dobPosition + 15);
  }

  let fetchedegender = "";

  // Check if the string contains "MALE" or "FEMALE"
  if (text?.includes("MALE" || "Male")) {
    fetchedegender = "MALE";
  } else if (text?.includes("FEMALE"|| "Female")) {
    fetchedegender = "FEMALE";
  }

  const aadhaarRegex = /\b\d{4} \d{4} \d{4}\b/;

  // Find the Aadhaar number in the text
  const match = text?.match(aadhaarRegex);
  const fetchedaadhaarNumber = match ? match[0] : "Not Found";


  const convertDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`.trim();
  };

  // ==== form functions ====
  const [dobValue, setDobValue] = useState("");
  const [gender, setGender] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form==", convertDate(dobValue), gender, aadhaarNumber, gender.toLowerCase() === fetchedegender.toLocaleLowerCase(),
      aadhaarNumber == fetchedaadhaarNumber.replace(/\s/g, ""),

      fetcheddobValue == convertDate(dobValue).trim());

    if (gender.toLowerCase() === fetchedegender.toLocaleLowerCase() &&
      // fetcheddobValue == convertDate(dobValue).trim() &&
      aadhaarNumber == fetchedaadhaarNumber.replace(/\s/g, "")) {

      let result = fetch('http://localhost:5000/register-user', {
        method: 'post',
        body: JSON.stringify({ aadhaarNumber, gender, dobValue }),
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `bearer ${JSON.parse(localStorage.getItem('token')) }`
        }
      })
      result = await (await result).json();
      console.log("result==",result);
      if(result?.message){
        alert(`${result?.message} 
You have already Given vote. Click on back button to go back!`);
      }else{
        navigate('/give-vote');
      }

    } else {
      alert("Invalid Credentials");
    }


  };

  return (
    <div style={styles.fullBackground}>
     <button onClick={()=> { navigate('/')}}>Back</button>
      <br /> <br />
      <br /> <br />
      <br /> <br />


      {/* <div>
        <p>Extracted DOB Value: {fetcheddobValue}</p>
        <p>Extracted gender Value: {fetchedegender}</p>
        <p>Extracted aadhaarNumber Value: {fetchedaadhaarNumber}</p>

      </div> */}

      <div style={styles.container}>
        <h1 className='registerTitle'>Register Form</h1>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Date of Birth (DOB)</label>
            <input
              type="text"
              placeholder='Enter date in format "dd/mm/yyyy"'
              style={styles.input}
              value={dobValue}
              onChange={(e) => setDobValue(e.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Gender</label>
            <select
              style={styles.input}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Aadhaar Number</label>
            <input
              type="text"
              style={styles.input}
              maxLength="12"
              placeholder="Enter 12-digit Aadhaar Number"
              value={aadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value)}
            />
          </div>
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
       
      </div>


    </div>
  );
};

export default RegisterPage;

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "500px",
    margin: "-40px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    background: "linear-gradient(270deg, rgb(103, 135, 156), rgb(150, 220, 203))"
  },
  fullBackground: {
    margin: '20px 40px',
    padding: '20px',
    background: 'beige',
    minHeight: '600px',
    borderRadius: '8px'
  },
  formGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    display: "block",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
  },
  button: {
    padding: "10px 15px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
    width: "100%"
  },
  extractedValues: {
    marginTop: "20px",
    textAlign: "left",
  },
  extractedValue: {
    fontSize: "16px",
    margin: "5px 0",
  },
};