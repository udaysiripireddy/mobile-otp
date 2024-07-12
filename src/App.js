// src/components/PhoneVerification.js
import React, { useState } from 'react';
import { auth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider } from './firebase.config.js';
import { signInWithCredential } from 'firebase/auth';
//import './App.css'
const App = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState(null);

  const requestOtp = () => {
    const recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        console.log("response",response);
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
      }

   
    });
const mobileNumber = `+91 ${ phoneNumber}`
    signInWithPhoneNumber(auth, mobileNumber,recaptchaVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        console.log(phoneNumber);
        console.log("confirmationresult",confirmationResult);
      })
      .catch((error) => {
        console.error("Error during signInWithPhoneNumber:", error);
      });
  };

  const verifyOtp = () => {
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    console.log(credential);
    signInWithCredential(auth,credential)
      .then((result) => {
        console.log("User signed in successfully:", result);
        alert("sign in successful")
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
      });
  };

  return (
    <div className="container mt-5">
    <h2>Phone Number Verification</h2>
    <div className="form-group">
      <input
        type="text"
        className="form-control"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Phone number"
      />
    </div>
    <button className="btn btn-primary mt-2" onClick={requestOtp}>
      Send OTP
    </button>
    <div id="recaptcha-container" className="mt-3"></div>
    {verificationId && (
      <>
        <div className="form-group mt-3">
          <input
            type="text"
            className="form-control"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="OTP"
          />
        </div>
        <button className="clickbtn" onClick={verifyOtp}>
          Verify OTP
        </button>
      </>
    )}
  </div>
  
  );
};

export default App;
