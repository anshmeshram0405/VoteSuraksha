import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./addparty.css"
import imageCompression from "browser-image-compression";

const AddParty = () => {

  const navigate = useNavigate();
  const [partyName, setpartyName] = useState("");
  const [candidateName, setcandidateName] = useState("");
  const [image, setImage] = useState("");

  // party_name: { type: String, required: true },
  // candidate_name: { type: String, required: true },
  // party_symbol: { type: String},

  // function convertToBase64(e) {
  //     var reader = new FileReader();
  //     reader.readAsDataURL(e.target.files[0]);
  //     reader.onload = () => {
  //         console.log(reader.result);
  //         setImage(reader.result);
  //         console.log("Image = ",image);
  //     };     

  //     reader.onerror = error => {
  //         console.log("error: ", error);
  //     }
  // }

  async function convertToBase64(e) {
    const file = e.target.files[0];
    const options = {
      maxSizeMB: 1, // Compress to 1MB
      maxWidthOrHeight: 1920, // Maintain resolution below 1920px
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onload = () => {
        setImage(reader.result); // Set the Base64 string
        console.log("Compressed Base64 Image: ", reader.result);
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    } catch (error) {
      console.error("Compression Error: ", error);
    }
  }

  console.log("partyName==", {
    party_name: partyName, candidate_name: candidateName,
    //  party_symbol: image
  });
  const handleAddParties = async () => {

    if (!partyName || !candidateName) {
      alert("enter details")
    } else {

      // const userId = JSON.parse(localStorage.getItem('user'))._id ;
      let result = await fetch('http://localhost:5000/addreceipe', {
        method: 'post',
        body: JSON.stringify({ party_name: partyName, candidate_name: candidateName, party_symbol: image }),
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `bearer ${JSON.parse(localStorage.getItem('token')) }`
        }
      })
      result = await result?.json();
      console.log(result);
      navigate('/admin');
    }
  }


  return (
    <div>
      <div className="form-container-addparty">
        <div className="form-card">
          <h1 className="form-title">Add New Party</h1>
          <div className="form-group">
            <label htmlFor="">Enter party name:</label>
            <input
              className="input-box"
              type="text"
              placeholder="Enter name of party"
              value={partyName}
              onChange={(e) => setpartyName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Enter party candidate name</label>
            <input
              className="input-box"
              type="text"
              placeholder="Enter candidate name"
              value={candidateName}
              onChange={(e) => setcandidateName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="upload-image" className="form-label">
              <h5>Choose Party Image:</h5>
            </label>
            <input
              id="upload-image"
              className="file-input"
              type="file"
              accept="image/*"
              onChange={convertToBase64}
            />
          </div>

          {image && (
            <div className="image-preview">
              <img src={image} width="100" height="100" alt="Preview" />
            </div>
          )}

          <button
            className="btn submit-btn"
            type="button"
            onClick={() => handleAddParties()}
          >
            Add Party
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddParty;
