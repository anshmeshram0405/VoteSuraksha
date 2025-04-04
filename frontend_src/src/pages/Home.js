import React, { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
// import { useFaceDetection } from "react-use-face-detection";
import { CameraOptions, useFaceDetection } from 'react-use-face-detection';
import FaceDetection from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';
import { useNavigate } from 'react-router-dom';

const width = 300;
const height = 300;

const Home = () => {
  const navigation = useNavigate();

  const { webcamRef, boundingBox, isLoading, detected, facesDetected } = useFaceDetection({
    faceDetectionOptions: {
      model: 'short',
    },
    faceDetection: new FaceDetection.FaceDetection({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    }),
    camera: ({ mediaSrc, onFrame }) =>
      new Camera(mediaSrc, {
        onFrame,
        width,
        height,
      }),
  });

  // useEffect(()=>{
  //   if(  detected === true &&  facesDetected === 1 && (isLoading === false)){

  //       navigation('/login')
  //   }
  // },[detected,isLoading,facesDetected])

  return (
    <div style={{ textAlign: "center", background: 'beige', borderRadius: '8px', border: '1px solid #d3d3d3' }} >
      <h1 className='webcam_title'>Welcome to the Voting System</h1>
      <p className='webcam_title'>Register, login, and cast your vote securely!</p>
      {
        detected === true && facesDetected === 1 && (
          <h1 className='webcam_title'>Face detected Successfully</h1>
        )
      }
      {/* <p>{`Loading: ${isLoading}`}</p> */}
      {/* <p>{`Face Detected: ${detected}`}</p> */}
      <div >
        <p className='webcam_title'>{`Number of faces detected: ${facesDetected}`}</p>
        <div className="webcam_vote_camo">

          <div style={{ width, height, position: 'relative', margin: "auto" }}>
            {boundingBox.map((box, index) => (
              <div
                key={`${index + 1}`}
              />
            ))}

            <Webcam
              ref={webcamRef}
              forceScreenshotSourceSize
              style={{
                height,
                width,


              }}
            />
          </div>
        </div>
      </div>

      <div>
        {
          detected === true && facesDetected === 1 && (isLoading === false) &&
          <button className='cab_imgsubmit_btn' onClick={() => navigation('/login')} >Image is scanned successfully! Go forward  </button>
        }
      </div>
    </div>
  );
};

export default Home;
